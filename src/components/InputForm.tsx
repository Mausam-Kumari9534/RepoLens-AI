import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Github, Globe, Loader2, Zap, AlertCircle } from "lucide-react";

interface InputFormProps {
  onAnalyze: (githubUrl: string, websiteUrl: string) => void;
  isLoading: boolean;
}

export const InputForm = ({ onAnalyze, isLoading }: InputFormProps) => {
  const [githubUrl, setGithubUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl || websiteUrl) {
      onAnalyze(githubUrl, websiteUrl);
    }
  };

  const hasAtLeastOneUrl = githubUrl.trim() !== "" || websiteUrl.trim() !== "";
  const analysisType = githubUrl && websiteUrl 
    ? "Combined Analysis" 
    : githubUrl 
      ? "GitHub-Only Analysis" 
      : websiteUrl 
        ? "Website-Only Analysis" 
        : "No Input";

  return (
    <Card className="p-8 bg-card border-border glow-primary">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Real API Analysis
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Analyze Your Project
          </h2>
          <p className="text-muted-foreground mt-2">
            Get real insights from GitHub API & PageSpeed Insights
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="pl-11 h-12 bg-muted border-border focus:border-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              Optional
            </span>
          </div>

          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="pl-11 h-12 bg-muted border-border focus:border-primary"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              Optional
            </span>
          </div>
        </div>

        {hasAtLeastOneUrl && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span>Mode: <strong className="text-foreground">{analysisType}</strong></span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading || !hasAtLeastOneUrl}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing with Real APIs...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              Run Full Audit
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Provide at least one URL. Both for combined analysis.
        </p>
      </form>
    </Card>
  );
};
