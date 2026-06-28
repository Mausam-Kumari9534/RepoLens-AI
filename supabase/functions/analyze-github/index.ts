const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RepoData {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  has_wiki: boolean;
  has_pages: boolean;
  license: { name: string } | null;
  topics: string[];
}

interface CommitData {
  sha: string;
  commit: {
    author: { name: string; date: string };
    message: string;
  };
}

interface ContributorData {
  login: string;
  contributions: number;
}

interface LanguageData {
  [key: string]: number;
}

interface ContentItem {
  name: string;
  type: 'file' | 'dir';
  path: string;
  size?: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { repoUrl } = await req.json();

    if (!repoUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'Repository URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse GitHub URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/);
    if (!match) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid GitHub URL format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace('.git', '');
    const apiBase = `https://api.github.com/repos/${owner}/${cleanRepo}`;

    console.log(`Analyzing repository: ${owner}/${cleanRepo}`);

    // Fetch all data in parallel
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'CodeAudit-App',
    };

    const [repoRes, commitsRes, contributorsRes, languagesRes, contentsRes, readmeRes] = await Promise.all([
      fetch(apiBase, { headers }),
      fetch(`${apiBase}/commits?per_page=100`, { headers }),
      fetch(`${apiBase}/contributors?per_page=10`, { headers }),
      fetch(`${apiBase}/languages`, { headers }),
      fetch(`${apiBase}/contents`, { headers }),
      fetch(`${apiBase}/readme`, { headers }),
    ]);

    if (!repoRes.ok) {
      const errorData = await repoRes.json();
      console.error('GitHub API error:', errorData);
      return new Response(
        JSON.stringify({ success: false, error: errorData.message || 'Failed to fetch repository' }),
        { status: repoRes.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const repoData: RepoData = await repoRes.json();
    const commits: CommitData[] = commitsRes.ok ? await commitsRes.json() : [];
    const contributors: ContributorData[] = contributorsRes.ok ? await contributorsRes.json() : [];
    const languages: LanguageData = languagesRes.ok ? await languagesRes.json() : {};
    const contents: ContentItem[] = contentsRes.ok ? await contentsRes.json() : [];
    const hasReadme = readmeRes.ok;

    // Calculate scores based on real data
    const scores = calculateScores(repoData, commits, contributors, languages, contents, hasReadme);
    const analysis = generateAnalysis(repoData, commits, contributors, languages, contents, hasReadme, scores);

    console.log('Analysis complete:', { owner, repo: cleanRepo, overallScore: scores.overall });

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: analysis,
        source: 'GitHub API'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error analyzing repository:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Analysis failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function calculateScores(
  repo: RepoData,
  commits: CommitData[],
  contributors: ContributorData[],
  languages: LanguageData,
  contents: ContentItem[],
  hasReadme: boolean
) {
  // Code Quality Score (based on repo metrics, language diversity)
  let codeQuality = 50;
  const totalLanguageBytes = Object.values(languages).reduce((a, b) => a + b, 0);
  const languageCount = Object.keys(languages).length;
  
  // Bonus for using TypeScript
  if (languages['TypeScript']) {
    codeQuality += 15;
  }
  // Bonus for language diversity (but not too many)
  if (languageCount >= 2 && languageCount <= 5) {
    codeQuality += 10;
  }
  // Bonus for consistent updates
  const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceUpdate < 30) codeQuality += 15;
  else if (daysSinceUpdate < 90) codeQuality += 10;
  else if (daysSinceUpdate < 180) codeQuality += 5;
  
  codeQuality = Math.min(100, codeQuality);

  // Project Structure Score
  let projectStructure = 40;
  const folders = contents.filter(c => c.type === 'dir');
  const files = contents.filter(c => c.type === 'file');
  
  // Check for common good practices
  const hasPackageJson = files.some(f => f.name === 'package.json');
  const hasSrc = folders.some(f => f.name === 'src');
  const hasTests = folders.some(f => ['test', 'tests', '__tests__', 'spec'].includes(f.name.toLowerCase()));
  const hasConfig = files.some(f => f.name.includes('config') || f.name.includes('.eslint') || f.name.includes('tsconfig'));
  const hasGitignore = files.some(f => f.name === '.gitignore');
  
  if (hasPackageJson) projectStructure += 15;
  if (hasSrc) projectStructure += 15;
  if (hasTests) projectStructure += 10;
  if (hasConfig) projectStructure += 10;
  if (hasGitignore) projectStructure += 10;
  
  projectStructure = Math.min(100, projectStructure);

  // HTML/SEO Basics Score
  let htmlSeoBasics = 50;
  if (languages['HTML']) {
    htmlSeoBasics += 20;
  }
  if (languages['CSS'] || languages['SCSS'] || languages['Sass']) {
    htmlSeoBasics += 15;
  }
  // Presence of index.html or similar
  const hasIndexHtml = files.some(f => f.name === 'index.html' || f.name === 'index.htm');
  if (hasIndexHtml) htmlSeoBasics += 15;
  
  htmlSeoBasics = Math.min(100, Math.max(30, htmlSeoBasics));

  // CSS Architecture Score
  let cssArchitecture = 45;
  if (languages['CSS']) cssArchitecture += 15;
  if (languages['SCSS'] || languages['Sass'] || languages['Less']) cssArchitecture += 20;
  // Check for Tailwind or styled-components indicators
  const hasTailwind = files.some(f => f.name.includes('tailwind'));
  if (hasTailwind) cssArchitecture += 20;
  
  cssArchitecture = Math.min(100, cssArchitecture);

  // JavaScript Logic Score
  let javascriptLogic = 50;
  const jsBytes = (languages['JavaScript'] || 0) + (languages['TypeScript'] || 0);
  if (jsBytes > 0) {
    javascriptLogic += 20;
    // TypeScript bonus
    if (languages['TypeScript'] && languages['TypeScript'] > (languages['JavaScript'] || 0)) {
      javascriptLogic += 15;
    }
  }
  // React/Vue/Angular detection
  if (repo.topics?.some(t => ['react', 'vue', 'angular', 'nextjs', 'nuxt'].includes(t.toLowerCase()))) {
    javascriptLogic += 10;
  }
  
  javascriptLogic = Math.min(100, javascriptLogic);

  // Commit History Score
  let commitHistory = 30;
  const commitCount = commits.length;
  if (commitCount >= 50) commitHistory += 30;
  else if (commitCount >= 20) commitHistory += 20;
  else if (commitCount >= 10) commitHistory += 10;
  
  // Check commit message quality (basic heuristic)
  const goodCommits = commits.filter(c => c.commit.message.length > 10 && !c.commit.message.toLowerCase().startsWith('update'));
  const commitQualityRatio = commits.length > 0 ? goodCommits.length / commits.length : 0;
  commitHistory += Math.round(commitQualityRatio * 30);
  
  // Contributor diversity
  if (contributors.length > 1) commitHistory += 10;
  
  commitHistory = Math.min(100, commitHistory);

  // Documentation Score
  let documentation = 20;
  if (hasReadme) documentation += 40;
  if (repo.description && repo.description.length > 20) documentation += 15;
  if (repo.has_wiki) documentation += 10;
  if (repo.license) documentation += 15;
  
  const hasContributing = files.some(f => f.name.toLowerCase().includes('contributing'));
  const hasChangelog = files.some(f => f.name.toLowerCase().includes('changelog'));
  if (hasContributing) documentation += 5;
  if (hasChangelog) documentation += 5;
  
  documentation = Math.min(100, documentation);

  const overall = Math.round(
    (codeQuality + projectStructure + htmlSeoBasics + cssArchitecture + javascriptLogic + commitHistory + documentation) / 7
  );

  return {
    codeQuality: Math.round(codeQuality),
    projectStructure: Math.round(projectStructure),
    htmlSeoBasics: Math.round(htmlSeoBasics),
    cssArchitecture: Math.round(cssArchitecture),
    javascriptLogic: Math.round(javascriptLogic),
    commitHistory: Math.round(commitHistory),
    documentation: Math.round(documentation),
    overall,
  };
}

function generateAnalysis(
  repo: RepoData,
  commits: CommitData[],
  contributors: ContributorData[],
  languages: LanguageData,
  contents: ContentItem[],
  hasReadme: boolean,
  scores: ReturnType<typeof calculateScores>
) {
  const strengths: string[] = [];
  const weaknesses: string[] = [];

  // Generate strengths
  if (languages['TypeScript']) {
    strengths.push('Uses TypeScript for type safety');
  }
  if (scores.projectStructure >= 70) {
    strengths.push('Well-organized project structure');
  }
  if (commits.length >= 20) {
    strengths.push(`Active development with ${commits.length}+ commits`);
  }
  if (hasReadme && repo.description) {
    strengths.push('Good documentation with README');
  }
  if (repo.license) {
    strengths.push(`Properly licensed (${repo.license.name})`);
  }
  if (contributors.length > 1) {
    strengths.push(`Collaborative project with ${contributors.length} contributors`);
  }
  if (repo.stargazers_count > 0) {
    strengths.push(`Community interest (${repo.stargazers_count} stars)`);
  }

  // Generate weaknesses
  if (!hasReadme) {
    weaknesses.push('Missing or incomplete README documentation');
  }
  if (scores.commitHistory < 50) {
    weaknesses.push('Inconsistent commit history or poor commit messages');
  }
  if (!languages['TypeScript'] && languages['JavaScript']) {
    weaknesses.push('Consider migrating to TypeScript for better maintainability');
  }
  const folders = contents.filter(c => c.type === 'dir');
  if (!folders.some(f => ['test', 'tests', '__tests__'].includes(f.name.toLowerCase()))) {
    weaknesses.push('No visible test directory');
  }
  if (!repo.license) {
    weaknesses.push('Missing license file');
  }
  const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceUpdate > 90) {
    weaknesses.push(`Repository not updated in ${daysSinceUpdate} days`);
  }

  // Ensure we have at least some items
  if (strengths.length === 0) {
    strengths.push('Project is publicly accessible');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Consider adding more comprehensive documentation');
  }

  return {
    repoInfo: {
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      issues: repo.open_issues_count,
      lastUpdated: repo.pushed_at,
    },
    languages: Object.entries(languages).map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / Object.values(languages).reduce((a, b) => a + b, 0)) * 100),
    })),
    commitCount: commits.length,
    contributorCount: contributors.length,
    scores,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 3),
  };
}
