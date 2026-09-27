import { useParams, Link } from "react-router-dom";
import { matters, sources, actionPlan } from "../data/mockData";
import { RiskBadge } from "../components/Badges";
import { CitationChip } from "../components/CitationChip";
import { ArrowLeft, CheckCircle2, Circle, Download, MessageSquareText } from "lucide-react";

const matterSources: Record<string, string[]> = {
  "matter-1": ["src-1", "src-2", "src-3", "src-4", "src-5"],
  "matter-2": ["src-8", "src-9", "src-10"],
  "matter-3": ["src-7"],
};

const rightsCopy: Record<string, { title: string; body: string; citationIds: string[] }[]> = {
  "matter-1": [
    {
      title: "You're entitled to an itemized statement",
      body: "Your landlord had 21 days after move-out to send a written breakdown of any deductions. That window has closed.",
      citationIds: ["src-1"],
    },
    {
      title: "The burden is now on him, not you",
      body: "Because you disputed the charges in writing, he has to justify any deduction with documentation — silence doesn't work in his favor.",
      citationIds: ["src-3"],
    },
    {
      title: "You may recover more than the deposit itself",
      body: "If the retention is found to be in bad faith, statutory damages of up to twice the deposit are available on top of the $3,200.",
      citationIds: ["src-2"],
    },
  ],
  "matter-2": [
    {
      title: "State law likely covers you even if federal law doesn't",
      body: "Your employer's 38 employees fall short of the federal FMLA's 50-employee threshold, but California's CFRA applies at just 5 employees.",
      citationIds: ["src-9"],
    },
  ],
  "matter-3": [
    {
      title: "A signed estimate is the reference point",
      body: "Movers generally can't add material charges beyond a binding estimate without your agreement — the added fee needs to be justified in writing.",
      citationIds: [],
    },
  ],
};

export function MatterDetail() {
  const { matterId } = useParams();
  const matter = matters.find((m) => m.id === matterId);

  if (!matter) {
    return (
      <div className="max-w-3xl mx-auto px-8 py-16 text-center">
        <p className="text-ink-200">Matter not found.</p>
        <Link to="/app/dashboard" className="text-brass-300 text-sm">Back to dashboard</Link>
      </div>
    );
  }

  const relatedSourceIds = matterSources[matter.id] ?? [];
  const rights = rightsCopy[matter.id] ?? [];

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <Link to="/app/dashboard" className="inline-flex items-center gap-2 text-sm text-ink-400 hover:text-bone mb-6 transition-colors">
        <ArrowLeft size={14} /> All matters
      </Link>

      <div className="flex items-start justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs uppercase tracking-wide text-brass-300">{matter.category}</span>
            <span className="text-xs text-ink-400">{matter.jurisdiction}</span>
          </div>
          <h1 className="font-serif text-3xl text-bone mb-3">{matter.title}</h1>
          <p className="text-ink-200 max-w-2xl leading-relaxed">{matter.summary}</p>
        </div>
        <RiskBadge level={matter.riskScore > 50 ? "high" : matter.riskScore > 25 ? "medium" : "low"} className="shrink-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
        <div>
          <section className="mb-10">
            <h2 className="font-serif text-xl text-bone mb-4">Your rights, in plain language</h2>
            <div className="space-y-4">
              {rights.map((r) => (
                <div key={r.title} className="border-l-2 border-brass-500/40 pl-5">
                  <h3 className="text-bone font-medium mb-1">{r.title}</h3>
                  <p className="text-sm text-ink-200 leading-relaxed">
                    {r.body}{" "}
                    {r.citationIds.map((sid, i) => (
                      <CitationChip key={sid} markerId={i + 1} sourceId={sid} />
                    ))}
                  </p>
                </div>
              ))}
              {rights.length === 0 && (
                <p className="text-sm text-ink-400">Still gathering enough facts to summarize rights here.</p>
              )}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl text-bone">Action plan</h2>
              <button className="inline-flex items-center gap-1.5 text-xs text-ink-200 hover:text-bone transition-colors">
                <Download size={13} /> Export packet
              </button>
            </div>
            <div className="space-y-0">
              {actionPlan.map((step, i) => (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {step.status === "done" ? (
                      <CheckCircle2 size={18} className="text-sage-500" />
                    ) : step.status === "current" ? (
                      <Circle size={18} className="text-brass-300 fill-brass-500/20" />
                    ) : (
                      <Circle size={18} className="text-ink-600" />
                    )}
                    {i < actionPlan.length - 1 && <div className="w-px flex-1 bg-ink-700 my-1" />}
                  </div>
                  <div className="pb-8">
                    <p className={`font-medium mb-1 ${step.status === "upcoming" ? "text-ink-400" : "text-bone"}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-ink-200 leading-relaxed max-w-lg">{step.description}</p>
                    {step.deadline && (
                      <p className="text-xs text-brass-300 mt-1.5 citation-mark">{step.deadline}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside>
          <div className="rounded-sm border border-ink-700 bg-ink-900 p-5 mb-6">
            <p className="text-xs uppercase tracking-wide text-ink-400 mb-3">Sources relied on</p>
            <div className="space-y-3">
              {relatedSourceIds.map((sid) => {
                const s = sources.find((s) => s.id === sid);
                if (!s) return null;
                return (
                  <div key={sid} className="pb-3 border-b border-ink-700 last:border-0 last:pb-0">
                    <p className="citation-mark text-xs text-brass-300 mb-1">{s.citation}</p>
                    <p className="text-sm text-bone leading-snug">{s.title}</p>
                  </div>
                );
              })}
              {relatedSourceIds.length === 0 && <p className="text-sm text-ink-400">No sources linked yet.</p>}
            </div>
          </div>

          <Link
            to="/app/ask"
            className="flex items-center gap-3 rounded-sm border border-ink-700 bg-ink-900 p-5 hover:border-ink-600 transition-colors"
          >
            <MessageSquareText size={18} className="text-brass-300 shrink-0" />
            <span className="text-sm text-ink-200">Ask a follow-up question about this matter</span>
          </Link>
        </aside>
      </div>
    </div>
  );
}
