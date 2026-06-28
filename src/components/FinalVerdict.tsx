import { Card } from "@/components/ui/card";
import { AuditResult, getScoreColor } from "@/types/audit";
import { Trophy, Target, Lightbulb, FileText, Database } from "lucide-react";

interface FinalVerdictProps {
  result: AuditResult;
}

export const FinalVerdict = ({ result }: FinalVerdictProps) => {
  const getHiringBadgeColor = (level: string) => {
    switch (level) {
      case "Job-ready":
        return "bg-success/20 text-success border-success/30";
      case "Junior":
        return "bg-warning/20 text-warning border-warning/30";
      case "Intern":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-destructive/20 text-destructive border-destructive/30";
    }
  };

  const hasGitHub = result.github !== null;
  const hasWebsite = result.website !== null;
  const hasBoth = hasGitHub && hasWebsite;

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Trophy className="w-5 h-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Final Verdict
            </h3>
            <p className="text-sm text-muted-foreground">
              Summary and recommendations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
          <Database className="w-3 h-3" />
          <span>{Object.values(result.dataSource).join(' + ')}</span>
        </div>
      </div>

      {/* Comparison Table - Only show if we have both */}
      {hasBoth && (
        <div className="bg-muted/50 rounded-xl p-5 mb-6 overflow-x-auto">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            GitHub vs Live Website Comparison
          </h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-medium">
                  Metric
                </th>
                <th className="text-center py-2 text-muted-foreground font-medium">
                  GitHub
                </th>
                <th className="text-center py-2 text-muted-foreground font-medium">
                  Website
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3">Overall Score</td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.github!.overallScore) }}
                  >
                    {result.github!.overallScore}
                  </span>
                </td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.website!.overallScore) }}
                  >
                    {result.website!.overallScore}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3">Code Quality / Performance</td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.github!.codeQuality) }}
                  >
                    {result.github!.codeQuality}
                  </span>
                </td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.website!.performance) }}
                  >
                    {result.website!.performance}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3">SEO</td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.github!.htmlSeoBasics) }}
                  >
                    {result.github!.htmlSeoBasics}
                  </span>
                </td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.website!.seo) }}
                  >
                    {result.website!.seo}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3">Best Practices</td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.github!.javascriptLogic) }}
                  >
                    {result.github!.javascriptLogic}
                  </span>
                </td>
                <td className="text-center">
                  <span
                    className="font-mono font-bold"
                    style={{ color: getScoreColor(result.website!.bestPractices) }}
                  >
                    {result.website!.bestPractices}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Single source summary - Only show if we have just one */}
      {!hasBoth && (
        <div className="bg-muted/50 rounded-xl p-5 mb-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            {hasGitHub ? 'GitHub Repository Scores' : 'Website Performance Scores'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hasGitHub && result.github && (
              <>
                <ScoreItem label="Code Quality" score={result.github.codeQuality} />
                <ScoreItem label="Structure" score={result.github.projectStructure} />
                <ScoreItem label="Documentation" score={result.github.documentation} />
                <ScoreItem label="Commits" score={result.github.commitHistory} />
              </>
            )}
            {hasWebsite && result.website && (
              <>
                <ScoreItem label="Performance" score={result.website.performance} />
                <ScoreItem label="SEO" score={result.website.seo} />
                <ScoreItem label="Accessibility" score={result.website.accessibility} />
                <ScoreItem label="Best Practices" score={result.website.bestPractices} />
              </>
            )}
          </div>
        </div>
      )}

      {/* Project Readiness & Hiring Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Project Readiness</span>
          </div>
          <div
            className="text-5xl font-mono font-bold"
            style={{ color: getScoreColor(result.projectReadinessScore) }}
          >
            {result.projectReadinessScore}
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl p-5 text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Hiring Readiness</span>
          </div>
          <div
            className={`inline-block px-4 py-2 rounded-lg border text-xl font-bold ${getHiringBadgeColor(
              result.hiringReadiness
            )}`}
          >
            {result.hiringReadiness}
          </div>
        </div>
      </div>

      {/* Top 5 Improvements */}
      <div className="bg-accent/10 rounded-xl p-5 mb-6">
        <h4 className="text-sm font-medium text-accent flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4" />
          Top Actionable Improvements
        </h4>
        <ul className="space-y-3">
          {result.improvements.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Resume Summary */}
      <div className="bg-primary/10 rounded-xl p-5">
        <h4 className="text-sm font-medium text-primary flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4" />
          Resume-Ready Summary
        </h4>
        <p className="text-foreground italic leading-relaxed">
          "{result.resumeSummary}"
        </p>
      </div>
    </Card>
  );
};

const ScoreItem = ({ label, score }: { label: string; score: number }) => (
  <div className="text-center">
    <div className="text-xs text-muted-foreground mb-1">{label}</div>
    <div
      className="text-2xl font-mono font-bold"
      style={{ color: getScoreColor(score) }}
    >
      {score}
    </div>
  </div>
);
