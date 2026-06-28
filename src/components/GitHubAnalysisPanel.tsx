import { Card } from "@/components/ui/card";
import { ScoreCircle } from "@/components/ScoreCircle";
import { GitHubAnalysis, getScoreColor } from "@/types/audit";
import { Github, CheckCircle2, XCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface GitHubAnalysisPanelProps {
  data: GitHubAnalysis;
}

export const GitHubAnalysisPanel = ({ data }: GitHubAnalysisPanelProps) => {
  const barData = [
    { name: "Code Quality", score: data.codeQuality },
    { name: "Structure", score: data.projectStructure },
    { name: "HTML/SEO", score: data.htmlSeoBasics },
    { name: "CSS", score: data.cssArchitecture },
    { name: "JavaScript", score: data.javascriptLogic },
    { name: "Commits", score: data.commitHistory },
    { name: "Docs", score: data.documentation },
  ];

  const radarData = barData.map((item) => ({
    subject: item.name,
    score: item.score,
    fullMark: 100,
  }));

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Github className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            GitHub Repository Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Code quality and structure evaluation
          </p>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <ScoreCircle score={data.overallScore} label="Overall Score" size="lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Bar Chart */}
        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            Category Scores
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="name"
                width={80}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar Chart */}
        <div className="bg-muted/50 rounded-xl p-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-4">
            Skill Radar
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-success/10 rounded-xl p-4">
          <h4 className="text-sm font-medium text-success flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4" />
            Strengths
          </h4>
          <ul className="space-y-2">
            {data.strengths.map((item, i) => (
              <li key={i} className="text-sm text-foreground/80">
                • {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-destructive/10 rounded-xl p-4">
          <h4 className="text-sm font-medium text-destructive flex items-center gap-2 mb-3">
            <XCircle className="w-4 h-4" />
            Areas to Improve
          </h4>
          <ul className="space-y-2">
            {data.weaknesses.map((item, i) => (
              <li key={i} className="text-sm text-foreground/80">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
