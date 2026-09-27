import { useState } from "react";
import { jurisdictions } from "../data/mockData";
import { ShieldCheck } from "lucide-react";

export function SettingsPage() {
  const [home, setHome] = useState("California, United States");
  const [dataSharing, setDataSharing] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <h1 className="font-serif text-3xl text-bone mb-8">Settings</h1>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-wide text-ink-400 mb-4">Jurisdiction</h2>
        <div className="rounded-sm border border-ink-700 bg-ink-900 p-5">
          <label className="text-sm text-ink-200 mb-2 block">Home jurisdiction</label>
          <select
            value={home}
            onChange={(e) => setHome(e.target.value)}
            className="w-full rounded-sm border border-ink-700 bg-ink-950 px-3 py-2.5 text-bone outline-none focus:border-brass-500"
          >
            <option>California, United States</option>
            {jurisdictions.map((j) => (
              <option key={j}>{j}</option>
            ))}
          </select>
          <p className="text-xs text-ink-400 mt-3">
            Individual matters can still be set to a different jurisdiction — this is only your default.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-sm uppercase tracking-wide text-ink-400 mb-4">Privacy</h2>
        <div className="rounded-sm border border-ink-700 bg-ink-900 p-5 flex items-start justify-between gap-6">
          <div>
            <p className="text-bone mb-1">Share anonymized matters to improve research quality</p>
            <p className="text-xs text-ink-400 max-w-md">
              Off by default. Documents and conversations you upload are never used to identify you.
            </p>
          </div>
          <button
            onClick={() => setDataSharing((v) => !v)}
            className={`shrink-0 h-6 w-11 rounded-full transition-colors relative ${
              dataSharing ? "bg-brass-500" : "bg-ink-700"
            }`}
            aria-pressed={dataSharing}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink-950 transition-transform ${
                dataSharing ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-ink-400 mb-4">About this workspace</h2>
        <div className="rounded-sm border border-ink-700 bg-ink-900 p-5 flex gap-3">
          <ShieldCheck size={18} className="text-brass-300 shrink-0 mt-0.5" />
          <p className="text-sm text-ink-200 leading-relaxed">
            Counsel AI provides legal information tailored to your jurisdiction, not legal
            representation. For active litigation, court deadlines, or matters involving
            immediate risk, pair this workspace with a licensed attorney.
          </p>
        </div>
      </section>
    </div>
  );
}
