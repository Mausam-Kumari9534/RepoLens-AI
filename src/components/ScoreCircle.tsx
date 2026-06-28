import { getScoreColor, getScoreLevel } from "@/types/audit";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  label: string;
  size?: "sm" | "md" | "lg";
}

export const ScoreCircle = ({ score, label, size = "md" }: ScoreCircleProps) => {
  const level = getScoreLevel(score);
  const color = getScoreColor(score);
  
  const sizes = {
    sm: { circle: 80, stroke: 6, text: "text-xl" },
    md: { circle: 120, stroke: 8, text: "text-3xl" },
    lg: { circle: 160, stroke: 10, text: "text-5xl" },
  };
  
  const { circle, stroke, text } = sizes[size];
  const radius = (circle - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: circle, height: circle }}>
        <svg
          className="transform -rotate-90"
          width={circle}
          height={circle}
        >
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="transparent"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
          />
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn("font-bold font-mono", text)}
            style={{ color }}
          >
            {score}
          </span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground font-medium">{label}</span>
    </div>
  );
};
