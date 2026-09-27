import { Link } from "react-router-dom";
import { matters } from "../data/mockData";
import { RiskBadge } from "../components/Badges";
import { ArrowUpRight, Calendar } from "lucide-react";

export function Dashboard() {
  const avgRisk = Math.round(matters.reduce((a, m) => a + m.riskScore, 0) / matters.length);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl text-bone mb-2">Your matters</h1>
          <p className="text-ink-200 text-sm">
            {matters.length} open matters across {new Set(matters.map((m) => m.category)).size} areas of law.
          </p>
        </div>
        <Link
          to="/app/ask"
          className="inline-flex items-center gap-2 rounded-sm bg-brass-500 px-4 py-2.5 text-sm text-ink-950 font-medium hover:bg-brass-300 transition-colors"
        >
          Ask a new question
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-px bg-ink-700 border border-ink-700 mb-10">
        <div className="bg-ink-900 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-400 mb-2">Open matters</p>
          <p className="font-serif text-3xl text-bone">{matters.length}</p>
        </div>
        <div className="bg-ink-900 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-400 mb-2">Upcoming deadlines</p>
          <p className="font-serif text-3xl text-bone">{matters.filter((m) => m.nextDeadline).length}</p>
        </div>
        <div className="bg-ink-900 p-5">
          <p className="text-xs uppercase tracking-wide text-ink-400 mb-2">Average exposure score</p>
          <p className="font-serif text-3xl text-brass-300">{avgRisk}<span className="text-base text-ink-400">/100</span></p>
        </div>
      </div>

      <div className="space-y-4">
        {matters.map((m) => (
          <Link
            key={m.id}
            to={`/app/dashboard/${m.id}`}
            className="block rounded-sm border border-ink-700 bg-ink-900 p-6 hover:border-ink-600 transition-colors group"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs uppercase tracking-wide text-brass-300">{m.category}</span>
                  <span className="text-xs text-ink-400">{m.jurisdiction}</span>
                </div>
                <h2 className="font-serif text-xl text-bone mb-2 group-hover:underline decoration-ink-600 underline-offset-4">
                  {m.title}
                </h2>
                <p className="text-sm text-ink-200 leading-relaxed max-w-2xl mb-4">{m.summary}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-xs text-ink-400 citation-mark">{m.status}</span>
                  {m.nextDeadline && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink-200">
                      <Calendar size={12} className="text-brass-300" />
                      {m.nextDeadline.label} — {m.nextDeadline.date}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <RiskBadge level={m.riskScore > 50 ? "high" : m.riskScore > 25 ? "medium" : "low"} />
                <ArrowUpRight size={18} className="text-ink-400 group-hover:text-brass-300 transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
