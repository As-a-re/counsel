import { useMemo, useState } from "react";
import { sources, type SourceType } from "../data/mockData";
import { useSourceDrawer } from "../components/SourceDrawerContext";
import { Search, Scale, Landmark, BookOpen, FileText } from "lucide-react";

const typeMeta: Record<SourceType, { label: string; icon: typeof Scale }> = {
  statute: { label: "Statute", icon: Scale },
  case: { label: "Case law", icon: Landmark },
  regulation: { label: "Regulation", icon: FileText },
  secondary: { label: "Secondary", icon: BookOpen },
};

export function SourceLibrary() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<SourceType | "all">("all");
  const { openSource } = useSourceDrawer();

  const filtered = useMemo(() => {
    return sources.filter((s) => {
      const matchesType = typeFilter === "all" || s.type === typeFilter;
      const matchesQuery =
        query.trim() === "" ||
        [s.title, s.citation, s.jurisdiction].some((f) => f.toLowerCase().includes(query.toLowerCase()));
      return matchesType && matchesQuery;
    });
  }, [query, typeFilter]);

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <h1 className="font-serif text-3xl text-bone mb-2">Source library</h1>
      <p className="text-ink-200 text-sm mb-8 max-w-xl">
        Every statute, case, and regulation Counsel AI has cited across your matters — searchable
        and verifiable on its own.
      </p>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 flex-1 rounded-sm border border-ink-700 bg-ink-900 px-3 py-2.5">
          <Search size={15} className="text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by citation, title, or jurisdiction…"
            className="flex-1 bg-transparent text-sm text-bone placeholder:text-ink-400 outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setTypeFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
            typeFilter === "all" ? "border-brass-500 text-bone bg-brass-500/10" : "border-ink-700 text-ink-200"
          }`}
        >
          All types
        </button>
        {(Object.keys(typeMeta) as SourceType[]).map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              typeFilter === t ? "border-brass-500 text-bone bg-brass-500/10" : "border-ink-700 text-ink-200"
            }`}
          >
            {typeMeta[t].label}
          </button>
        ))}
      </div>

      <div className="divide-y divide-ink-700 border-y border-ink-700">
        {filtered.map((s) => {
          const Icon = typeMeta[s.type].icon;
          return (
            <button
              key={s.id}
              onClick={() => openSource(s.id)}
              className="w-full text-left flex items-start gap-4 py-5 hover:bg-ink-900/60 transition-colors px-2"
            >
              <Icon size={16} className="text-brass-300 mt-1 shrink-0" />
              <div className="flex-1">
                <p className="citation-mark text-xs text-brass-300 mb-1">{s.citation}</p>
                <p className="font-serif text-base text-bone mb-1">{s.title}</p>
                <p className="text-xs text-ink-400">{s.jurisdiction} · {typeMeta[s.type].label} · {s.year}</p>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && <p className="text-ink-400 text-sm py-8">No sources match that search.</p>}
      </div>
    </div>
  );
}
