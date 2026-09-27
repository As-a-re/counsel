import { conversationThread } from "../data/mockData";
import { RiskBadge } from "../components/Badges";
import { CitationChip } from "../components/CitationChip";
import { Upload, AlertTriangle, ShieldAlert, Phone } from "lucide-react";

export function ConversationAnalyzer() {
  const flaggedCount = conversationThread.filter((m) => m.flag).length;
  const hasSafetyFlag = conversationThread.some((m) => m.flag?.safety);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-bone mb-2">Conversation review</h1>
          <p className="text-ink-200 text-sm max-w-xl">
            Paste a text message or email thread. Counsel AI flags statements that carry legal
            weight — admissions, threats, retaliation — and explains why.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-sm border border-ink-700 px-4 py-2.5 text-sm text-ink-200 hover:border-ink-600 transition-colors">
          <Upload size={14} /> Import a thread
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-sm border border-brass-500/30 bg-brass-500/5 px-4 py-3 mb-4 text-sm text-brass-300">
        <AlertTriangle size={15} />
        {flaggedCount} messages flagged out of {conversationThread.length} in this thread.
      </div>

      {hasSafetyFlag && (
        <div className="flex items-start gap-3 rounded-sm border border-oxblood-500/50 bg-oxblood-100/5 px-4 py-4 mb-8">
          <ShieldAlert size={18} className="text-oxblood-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-bone font-medium mb-1">This thread contains language that reads as a possible threat</p>
            <p className="text-sm text-ink-200 leading-relaxed mb-3">
              Counsel AI separates legal analysis from safety. If you feel unsafe, that comes
              first — the legal strategy can wait.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:911"
                className="inline-flex items-center gap-1.5 rounded-sm bg-oxblood-500 px-3 py-1.5 text-xs text-bone hover:bg-oxblood-600 transition-colors"
              >
                <Phone size={12} /> Call 911 (immediate danger)
              </a>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-1.5 rounded-sm border border-ink-600 px-3 py-1.5 text-xs text-ink-200 hover:border-ink-500 transition-colors"
              >
                <Phone size={12} /> Non-emergency tenant harassment line
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {conversationThread.map((m) => (
          <div key={m.id} className={m.sender === "You" ? "flex justify-end" : "flex justify-start"}>
            <div className="max-w-[80%]">
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <span className="text-xs text-ink-400">{m.sender}</span>
                <span className="text-xs text-ink-600">·</span>
                <span className="text-xs text-ink-400">{m.time}</span>
              </div>
              <div
                className={`rounded-sm px-4 py-3 text-sm ${
                  m.sender === "You" ? "bg-ink-800 text-bone" : "border border-ink-700 text-ink-200"
                } ${m.flag ? "ring-1 ring-oxblood-500/50" : ""}`}
              >
                {m.text}
              </div>
              {m.flag && (
                <div className="mt-2 rounded-sm border-l-2 border-oxblood-500 bg-oxblood-100/5 px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <RiskBadge level={m.flag.severity} />
                    <span className="text-sm text-bone font-medium">{m.flag.label}</span>
                    {m.flag.safety && <ShieldAlert size={14} className="text-oxblood-500" />}
                  </div>
                  <p className="text-sm text-ink-200 leading-relaxed">
                    {m.flag.explanation}{" "}
                    {m.flag.citationIds.map((sid, i) => (
                      <CitationChip key={sid} markerId={i + 1} sourceId={sid} />
                    ))}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
