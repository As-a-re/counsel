import type { RiskLevel } from "../data/mockData";
import { MapPin } from "lucide-react";

const riskStyles: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-oxblood-500/15", text: "text-oxblood-500", label: "Needs attention" },
  medium: { bg: "bg-brass-500/15", text: "text-brass-300", label: "Worth reviewing" },
  low: { bg: "bg-sage-500/15", text: "text-sage-500", label: "Standard" },
  info: { bg: "bg-ink-600/40", text: "text-ink-200", label: "For context" },
};

export function RiskBadge({ level, className = "" }: { level: RiskLevel; className?: string }) {
  const s = riskStyles[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium ${s.bg} ${s.text} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

export function JurisdictionBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 px-2.5 py-1 text-xs text-ink-200">
      <MapPin size={12} className="text-brass-300" />
      {name}
    </span>
  );
}
