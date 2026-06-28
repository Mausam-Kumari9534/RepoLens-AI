export interface GitHubAnalysis {
  codeQuality: number;
  projectStructure: number;
  htmlSeoBasics: number;
  cssArchitecture: number;
  javascriptLogic: number;
  commitHistory: number;
  documentation: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  // Additional fields from real API
  repoInfo?: {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    issues: number;
    lastUpdated: string;
  };
  languages?: Array<{ name: string; bytes: number; percentage: number }>;
  commitCount?: number;
  contributorCount?: number;
}

export interface WebsiteAnalysis {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  lcp: number;
  cls: number;
  inp: number;
  mobileScore: number;
  desktopScore: number;
  securityScore: number;
  consoleErrors: number;
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  // Additional fields from real API
  url?: string;
  analyzedAt?: string;
  fcp?: number | null;
  speedIndex?: number | null;
  tti?: number | null;
  https?: boolean;
}

export interface AuditResult {
  github: GitHubAnalysis | null;
  website: WebsiteAnalysis | null;
  hiringReadiness: 'Not Ready' | 'Intern' | 'Junior' | 'Job-ready';
  projectReadinessScore: number;
  improvements: string[];
  resumeSummary: string;
  dataSource: {
    github?: string;
    website?: string;
  };
}

export type ScoreLevel = 'good' | 'medium' | 'poor';

export const getScoreLevel = (score: number): ScoreLevel => {
  if (score >= 80) return 'good';
  if (score >= 50) return 'medium';
  return 'poor';
};

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'hsl(142, 71%, 45%)';
  if (score >= 50) return 'hsl(38, 92%, 50%)';
  return 'hsl(0, 72%, 51%)';
};
