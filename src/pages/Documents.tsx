import { useState } from "react";
import { leaseDocument } from "../data/mockData";
import { RiskBadge } from "../components/Badges";
import { CitationChip } from "../components/CitationChip";
import { useLanguage } from "../context/LanguageContext";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { FileText, Upload, Volume2, VolumeX } from "lucide-react";

export function Documents() {
  const [selectedClause, setSelectedClause] = useState(leaseDocument.clauses[0].id);
  const clause = leaseDocument.clauses.find((c) => c.id === selectedClause)!;
  const { language } = useLanguage();
  const synth = useSpeechSynthesis(language.code);

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-bone mb-2">Document analysis</h1>
          <p className="text-ink-200 text-sm max-w-xl">
            Upload a lease, contract, or notice and Counsel AI flags clauses worth a second look —
            each with the reasoning and source behind the flag.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-sm border border-ink-700 px-4 py-2.5 text-sm text-ink-200 hover:border-ink-600 transition-colors">
          <Upload size={14} /> Upload a document
        </button>
      </div>

      <div className="flex items-center gap-3 rounded-sm border border-ink-700 bg-ink-900 px-5 py-3 mb-8">
        <FileText size={16} className="text-brass-300" />
        <span className="text-sm text-bone">{leaseDocument.fileName}</span>
        <span className="text-xs text-ink-400">
          {leaseDocument.pages} pages · Uploaded {leaseDocument.uploaded} · {leaseDocument.jurisdiction}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8">
        <div className="paper-surface rounded-sm p-8 space-y-6">
          {leaseDocument.clauses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClause(c.id)}
              className={`block w-full text-left rounded-sm px-4 py-4 border-2 transition-colors ${
                selectedClause === c.id
                  ? "border-oxblood-500/60 bg-oxblood-100/40"
                  : "border-transparent hover:bg-paper-200/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-serif text-base text-ink-950">{c.heading}</p>
                <RiskBadge level={c.risk} />
              </div>
              <p className="text-sm text-ink-700 leading-relaxed font-serif">{c.excerpt}</p>
            </button>
          ))}
        </div>

        <div className="rounded-sm border border-ink-700 bg-ink-900 p-6 h-fit sticky top-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs uppercase tracking-wide text-ink-400">{clause.heading}</p>
            <RiskBadge level={clause.risk} />
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl text-bone">What this means for you</h2>
            {synth.supported && (
              <button
                onClick={() =>
                  synth.speakingId === clause.id ? synth.stop() : synth.speak(clause.id, clause.plainLanguage)
                }
                className="inline-flex items-center gap-1.5 text-xs text-ink-200 hover:text-brass-300 transition-colors"
              >
                {synth.speakingId === clause.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {synth.speakingId === clause.id ? "Stop" : "Listen"}
              </button>
            )}
          </div>
          <p className="text-sm text-ink-200 leading-relaxed mb-6">
            {clause.plainLanguage}{" "}
            {clause.citationIds.map((sid, i) => (
              <CitationChip key={sid} markerId={i + 1} sourceId={sid} />
            ))}
          </p>
          {clause.citationIds.length === 0 && (
            <p className="text-xs text-ink-400">No statutory conflict identified for this clause.</p>
          )}
        </div>
      </div>
    </div>
  );
}
