import { useState } from "react";
import { InputForm } from "@/components/InputForm";
import { GitHubAnalysisPanel } from "@/components/GitHubAnalysisPanel";
import { WebsiteAnalysisPanel } from "@/components/WebsiteAnalysisPanel";
import { FinalVerdict } from "@/components/FinalVerdict";
import { AuditResult, GitHubAnalysis, WebsiteAnalysis } from "@/types/audit";
import { auditApi } from "@/lib/api/audit";
import { Code2, Sparkles, Database, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async (githubUrl: string, websiteUrl: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let githubAnalysis: GitHubAnalysis | null = null;
      let websiteAnalysis: WebsiteAnalysis | null = null;
      const dataSource: { github?: string; website?: string } = {};

      // Run analyses in parallel if both URLs provided
      const promises: Promise<void>[] = [];

      if (githubUrl.trim()) {
        promises.push(
          auditApi.analyzeGitHub(githubUrl).then((res) => {
            if (res.success && res.data) {
              githubAnalysis = {
                codeQuality: res.data.scores.codeQuality,
                projectStructure: res.data.scores.projectStructure,
                htmlSeoBasics: res.data.scores.htmlSeoBasics,
                cssArchitecture: res.data.scores.cssArchitecture,
                javascriptLogic: res.data.scores.javascriptLogic,
                commitHistory: res.data.scores.commitHistory,
                documentation: res.data.scores.documentation,
                overallScore: res.data.scores.overall,
                strengths: res.data.strengths,
                weaknesses: res.data.weaknesses,
                repoInfo: res.data.repoInfo,
                languages: res.data.languages,
                commitCount: res.data.commitCount,
                contributorCount: res.data.contributorCount,
              };
              dataSource.github = res.source || 'GitHub API';
            } else {
              throw new Error(res.error || 'Failed to analyze GitHub repository');
            }
          })
        );
      }

      if (websiteUrl.trim()) {
        promises.push(
          auditApi.analyzeWebsiteBothStrategies(websiteUrl).then((res) => {
            const mobileData = res.mobile.data;
            const desktopData = res.desktop.data;
            
            if (res.mobile.success && mobileData) {
              websiteAnalysis = {
                performance: mobileData.scores.performance,
                seo: mobileData.scores.seo,
                accessibility: mobileData.scores.accessibility,
                bestPractices: mobileData.scores.bestPractices,
                lcp: mobileData.coreWebVitals.lcp,
                cls: mobileData.coreWebVitals.cls,
                inp: mobileData.coreWebVitals.inp,
                mobileScore: mobileData.scores.performance,
                desktopScore: desktopData?.scores.performance ?? mobileData.scores.performance,
                securityScore: mobileData.security.score,
                consoleErrors: mobileData.consoleErrors,
                overallScore: mobileData.scores.overall,
                strengths: mobileData.strengths,
                weaknesses: mobileData.weaknesses,
                url: mobileData.url,
                analyzedAt: mobileData.analyzedAt,
                fcp: mobileData.coreWebVitals.fcp,
                speedIndex: mobileData.coreWebVitals.speedIndex,
                tti: mobileData.coreWebVitals.tti,
                https: mobileData.security.https,
              };
              dataSource.website = res.mobile.source || 'PageSpeed Insights API';
            } else {
              throw new Error(res.mobile.error || 'Failed to analyze website');
            }
          })
        );
      }

      await Promise.all(promises);

      // Calculate combined score
      let projectReadinessScore = 0;
      let validScores = 0;
      
      if (githubAnalysis) {
        projectReadinessScore += githubAnalysis.overallScore;
        validScores++;
      }
      if (websiteAnalysis) {
        projectReadinessScore += websiteAnalysis.overallScore;
        validScores++;
      }
      
      projectReadinessScore = validScores > 0 
        ? Math.round(projectReadinessScore / validScores) 
        : 0;

      const getHiringReadiness = (score: number): 'Not Ready' | 'Intern' | 'Junior' | 'Job-ready' => {
        if (score >= 85) return 'Job-ready';
        if (score >= 70) return 'Junior';
        if (score >= 50) return 'Intern';
        return 'Not Ready';
      };

      const improvements = generateImprovements(githubAnalysis, websiteAnalysis);
      const resumeSummary = generateResumeSummary(githubAnalysis, websiteAnalysis);

      setResult({
        github: githubAnalysis,
        website: websiteAnalysis,
        projectReadinessScore,
        hiringReadiness: getHiringReadiness(projectReadinessScore),
        improvements,
        resumeSummary,
        dataSource,
      });

      toast({
        title: "Analysis Complete",
        description: `Real data fetched from ${Object.values(dataSource).join(' & ')}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RepoLens AI</h1>
              <p className="text-xs text-muted-foreground">
                Real API Analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="w-4 h-4 text-primary" />
            <span>GitHub API + PageSpeed Insights</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!result ? (
          <div className="max-w-lg mx-auto mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Audit Your <span className="text-primary">Repository & Site</span>
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Get instant AI insights using GitHub API and PageSpeed Insights.
                Real analysis, zero delay.
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">Analysis Error</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
            )}
            
            <InputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in-0 duration-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Audit Results
                </h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Data from: {Object.values(result.dataSource).join(' & ')}
                </p>
              </div>
              <button
                onClick={() => {
                  setResult(null);
                  setError(null);
                }}
                className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                New Audit
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {result.github && <GitHubAnalysisPanel data={result.github} />}
              {result.website && <WebsiteAnalysisPanel data={result.website} />}
            </div>

            <FinalVerdict result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Powered by GitHub API & PageSpeed Insights – Real data, no simulations</p>
        </div>
      </footer>
    </div>
  );
};

function generateImprovements(github: GitHubAnalysis | null, website: WebsiteAnalysis | null): string[] {
  const improvements: string[] = [];

  if (github) {
    if (github.documentation < 70) {
      improvements.push("Improve README documentation with setup instructions and feature overview");
    }
    if (github.commitHistory < 60) {
      improvements.push("Write more descriptive commit messages following conventional commits");
    }
    if (github.projectStructure < 70) {
      improvements.push("Add test directory and improve folder organization");
    }
  }

  if (website) {
    if (website.performance < 80) {
      improvements.push("Optimize images and implement lazy loading for better performance");
    }
    if (website.lcp > 2.5) {
      improvements.push(`Reduce LCP from ${website.lcp}s to under 2.5s by optimizing main content`);
    }
    if (website.cls > 0.1) {
      improvements.push("Fix layout shifts by setting explicit dimensions on images and embeds");
    }
    if (website.accessibility < 90) {
      improvements.push("Add ARIA labels and improve color contrast for accessibility");
    }
    if (!website.https) {
      improvements.push("Enable HTTPS for security and SEO benefits");
    }
  }

  // Ensure we always have at least some improvements
  if (improvements.length === 0) {
    improvements.push("Consider adding automated CI/CD pipeline for consistent deployments");
  }

  return improvements.slice(0, 5);
}

function generateResumeSummary(github: GitHubAnalysis | null, website: WebsiteAnalysis | null): string {
  const parts: string[] = [];

  if (github) {
    parts.push(`GitHub repository with ${github.overallScore}% code quality score`);
    if (github.commitCount) {
      parts.push(`${github.commitCount}+ commits`);
    }
  }

  if (website) {
    parts.push(`${website.performance}% Lighthouse performance`);
    if (website.lcp <= 2.5) {
      parts.push("excellent Core Web Vitals");
    }
  }

  if (parts.length === 0) {
    return "Web development project demonstrating modern frontend practices.";
  }

  return `Built and deployed a web application featuring ${parts.join(', ')}. Demonstrates proficiency in modern frontend development and performance optimization.`;
}

export default Index;
