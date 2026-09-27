import { useMemo, useState } from "react";
import { legalAidOrgs, type Matter } from "../data/mockData";
import { Phone, Languages, MapPin } from "lucide-react";

const categories: Matter["category"][] = ["Housing", "Employment", "Consumer", "Family"];

export function LegalAidDirectory() {
  const [filter, setFilter] = useState<Matter["category"] | "all">("all");

  const filtered = useMemo(
    () => legalAidOrgs.filter((o) => filter === "all" || o.focus.includes(filter)),
    [filter]
  );

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      <h1 className="font-serif text-3xl text-bone mb-2">Legal aid directory</h1>
      <p className="text-ink-200 text-sm mb-8 max-w-xl">
        Counsel AI explains your options — these organizations can represent you. Every listing
        here is free or income-qualified, and reachable by phone.
      </p>

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
            filter === "all" ? "border-brass-500 text-bone bg-brass-500/10" : "border-ink-700 text-ink-200"
          }`}
        >
          All areas
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              filter === c ? "border-brass-500 text-bone bg-brass-500/10" : "border-ink-700 text-ink-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((org) => (
          <div key={org.id} className="rounded-sm border border-ink-700 bg-ink-900 p-6">
            <div className="flex items-start justify-between gap-6 mb-3">
              <div>
                <h2 className="font-serif text-xl text-bone mb-1">{org.name}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  {org.focus.map((f) => (
                    <span key={f} className="text-xs uppercase tracking-wide text-brass-300">
                      {f}
                    </span>
                  ))}
                  <span className="text-xs text-ink-400">· {org.cost}</span>
                </div>
              </div>
              <a
                href={`tel:${org.phone}`}
                className="inline-flex items-center gap-1.5 rounded-sm bg-brass-500 px-3 py-1.5 text-xs text-ink-950 font-medium hover:bg-brass-300 transition-colors shrink-0"
              >
                <Phone size={12} /> Call
              </a>
            </div>
            <p className="text-sm text-ink-200 leading-relaxed mb-3 max-w-xl">{org.description}</p>
            <div className="flex items-center gap-5 text-xs text-ink-400 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} className="text-brass-300" /> {org.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Languages size={12} className="text-brass-300" /> {org.languages.join(", ")}
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-sm text-ink-400">No listings for that filter yet.</p>}
      </div>
    </div>
  );
}
