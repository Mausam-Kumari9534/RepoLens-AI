import { Card } from "@/components/ui/card";
import { ScoreCircle } from "@/components/ScoreCircle";
import { WebsiteAnalysis, getScoreColor } from "@/types/audit";
import { Globe, CheckCircle2, XCircle, Gauge, Eye, Shield, Smartphone } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface WebsiteAnalysisPanelProps {
  data: WebsiteAnalysis;
}

export const WebsiteAnalysisPanel = ({ data }: WebsiteAnalysisPanelProps) => {
  const lighthouseData = [
    { name: "Performance", score: data.performance, icon: Gauge },
    { name: "SEO", score: data.seo, icon: Globe },
    { name: "Accessibility", score: data.accessibility, icon: Eye },
    { name: "Best Practices", score: data.bestPractices, icon: Shield },
  ];

  const vitalsData = [
    {
      name: "LCP",
      value: data.lcp,
      unit: "s",
      good: 2.5,
      poor: 4.0,
      label: "Largest Contentful Paint",
    },
    {
      name: "CLS",
      value: data.cls,
      unit: "",
      good: 0.1,
      poor: 0.25,
      label: "Cumulative Layout Shift",
    },
    {
      name: "INP",
      value: data.inp,
      unit: "ms",
      good: 200,
      poor: 500,
      label: "Interaction to Next Paint",
    },
  ];

  const getVitalColor = (value: number, good: number, poor: number) => {
    if (value <= good) return "hsl(142, 71%, 45%)";
    if (value <= poor) return "hsl(38, 92%, 50%)";
    return "hsl(0, 72%, 51%)";
  };

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-accent/10">
          <Globe className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Live Website Analysis
          </h3>
          <p className="text-sm text-muted-foreground">
            Performance and Core Web Vitals
          </p>
        </div>
      </div>

      {/* Lighthouse Scores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {lighthouseData.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center p-4 bg-muted/50 rounded-xl"
          >
            <ScoreCircle score={item.score} label={item.name} size="sm" />
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className="bg-muted/50 rounded-xl p-5 mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          Core Web Vitals
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vitalsData.map((vital) => (
            <div key={vital.name} className="relative">
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  {vital.name}
                </span>
                <span
                  className="text-2xl font-mono font-bold"
                  style={{ color: getVitalColor(vital.value, vital.good, vital.poor) }}
                >
                  {vital.value}
                  <span className="text-sm text-muted-foreground ml-0.5">
                    {vital.unit}
                  </span>
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((vital.value / vital.poor) * 100, 100)}%`,
                    backgroundColor: getVitalColor(vital.value, vital.good, vital.poor),
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{vital.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vs Desktop */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Mobile</span>
          </div>
          <div
            className="text-3xl font-mono font-bold"
            style={{ color: getScoreColor(data.mobileScore) }}
          >
            {data.mobileScore}
          </div>
        </div>
        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Desktop</span>
          </div>
          <div
            className="text-3xl font-mono font-bold"
            style={{ color: getScoreColor(data.desktopScore) }}
          >
            {data.desktopScore}
          </div>
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
