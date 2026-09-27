import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale, ArrowRight, Home, Briefcase, ShoppingBag, Users } from "lucide-react";
import { jurisdictions } from "../data/mockData";

const categories = [
  { id: "Housing", label: "Housing", icon: Home, hint: "Deposits, evictions, repairs, leases" },
  { id: "Employment", label: "Employment", icon: Briefcase, hint: "Leave, wages, termination, retaliation" },
  { id: "Consumer", label: "Consumer", icon: ShoppingBag, hint: "Disputed charges, contracts, warranties" },
  { id: "Family", label: "Family", icon: Users, hint: "Custody, support, separations" },
];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [jurisdiction, setJurisdiction] = useState("");
  const [category, setCategory] = useState("");
  const [situation, setSituation] = useState("");
  const navigate = useNavigate();

  const steps = ["Jurisdiction", "Area of law", "Your situation"];

  return (
    <div className="min-h-screen bg-ink-950 text-bone flex flex-col">
      <header className="flex items-center gap-2 px-8 py-6">
        <Scale size={20} className="text-brass-300" />
        <span className="font-serif text-lg">Counsel AI</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-3 mb-10">
            {steps.map((label, i) => (
              <div key={label} className="flex items-center gap-3 flex-1">
                <div
                  className={`h-1 flex-1 rounded-full ${i <= step ? "bg-brass-500" : "bg-ink-700"}`}
                />
              </div>
            ))}
          </div>
          <p className="citation-mark text-xs text-ink-400 mb-2">Step {step + 1} of 3</p>

          {step === 0 && (
            <div>
              <h1 className="font-serif text-3xl mb-3">Where does this apply?</h1>
              <p className="text-ink-200 mb-8">
                Law varies by state, county, and city. Getting this right is what makes the
                citations that follow actually apply to you.
              </p>
              <div className="space-y-2 mb-8">
                {jurisdictions.map((j) => (
                  <button
                    key={j}
                    onClick={() => setJurisdiction(j)}
                    className={`w-full text-left rounded-sm border px-4 py-3 transition-colors ${
                      jurisdiction === j
                        ? "border-brass-500 bg-brass-500/10 text-bone"
                        : "border-ink-700 hover:border-ink-600 text-ink-200"
                    }`}
                  >
                    {j}
                  </button>
                ))}
              </div>
              <button
                disabled={!jurisdiction}
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-sm bg-brass-500 px-5 py-3 text-ink-950 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brass-300 transition-colors"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="font-serif text-3xl mb-3">What area does this fall under?</h1>
              <p className="text-ink-200 mb-8">This shapes which sources Counsel AI prioritizes first.</p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {categories.map(({ id, label, icon: Icon, hint }) => (
                  <button
                    key={id}
                    onClick={() => setCategory(id)}
                    className={`text-left rounded-sm border px-4 py-4 transition-colors ${
                      category === id
                        ? "border-brass-500 bg-brass-500/10"
                        : "border-ink-700 hover:border-ink-600"
                    }`}
                  >
                    <Icon size={18} className="text-brass-300 mb-2" />
                    <p className="text-bone font-medium mb-1">{label}</p>
                    <p className="text-xs text-ink-400">{hint}</p>
                  </button>
                ))}
              </div>
              <button
                disabled={!category}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-sm bg-brass-500 px-5 py-3 text-ink-950 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brass-300 transition-colors"
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="font-serif text-3xl mb-3">Tell it what happened</h1>
              <p className="text-ink-200 mb-6">
                Write it the way you'd explain it to a friend. Dates and specifics help, but
                don't worry about legal terms.
              </p>
              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={6}
                placeholder="My landlord kept my whole deposit and it's been over a month with nothing in writing..."
                className="w-full rounded-sm border border-ink-700 bg-ink-900 px-4 py-3 text-bone placeholder:text-ink-400 focus:border-brass-500 outline-none mb-8 resize-none"
              />
              <button
                onClick={() => navigate("/app/ask")}
                className="inline-flex items-center gap-2 rounded-sm bg-brass-500 px-5 py-3 text-ink-950 font-medium hover:bg-brass-300 transition-colors"
              >
                Start with Counsel AI <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
