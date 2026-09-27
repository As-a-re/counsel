import { Link } from "react-router-dom";
import { Scale, ArrowUpRight, ShieldCheck, FileSearch, MessagesSquare, ScrollText, Gavel } from "lucide-react";
import { stats } from "../data/mockData";
import { CitationChip } from "../components/CitationChip";

export function Landing() {
  return (
    <div className="min-h-screen bg-ink-950 text-bone">
      <header className="flex items-center justify-between px-8 py-6 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2">
          <Scale size={20} className="text-brass-300" />
          <span className="font-serif text-lg">Counsel AI</span>
        </div>
        <div className="flex items-center gap-8 text-sm text-ink-200">
          <a href="#how-it-works" className="hover:text-bone transition-colors">How it works</a>
          <a href="#coverage" className="hover:text-bone transition-colors">Coverage</a>
          <Link
            to="/onboarding"
            className="rounded-sm bg-brass-500 px-4 py-2 text-ink-950 font-medium hover:bg-brass-300 transition-colors"
          >
            Start your case
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 px-8 py-16 max-w-[1400px] mx-auto items-center">
        <div>
          <p className="text-xs uppercase tracking-wide text-brass-300 mb-5">Jurisdiction-aware legal reasoning</p>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.08] mb-6">
            Ask your legal question.
            <br />
            Get an answer you can
            <br />
            trace to its source.
          </h1>
          <p className="text-ink-200 text-lg leading-relaxed max-w-md mb-8">
            Counsel AI reads your situation, your documents, and the law that actually governs
            where you live — then shows its work, one citation at a time.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 rounded-sm bg-brass-500 px-5 py-3 text-ink-950 font-medium hover:bg-brass-300 transition-colors"
            >
              Start your case
              <ArrowUpRight size={16} />
            </Link>
            <a href="#how-it-works" className="text-sm text-ink-200 hover:text-bone transition-colors">
              See how it works
            </a>
          </div>
          <p className="text-xs text-ink-400 mt-6 max-w-md">
            Counsel AI provides legal information, not representation. For court deadlines or
            active litigation, pair it with a licensed attorney in your jurisdiction.
          </p>
        </div>

        <div className="rounded-sm border border-ink-700 bg-ink-900 p-5">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-ink-700">
            <span className="text-xs uppercase tracking-wide text-ink-400">Ask Counsel — live demo</span>
            <span className="text-xs text-brass-300">San Francisco, CA</span>
          </div>
          <div className="space-y-4 text-sm">
            <div className="rounded-sm bg-ink-800 px-4 py-3 max-w-[85%] ml-auto text-bone">
              My landlord kept my whole deposit and it's been 34 days. What can I do?
            </div>
            <div className="rounded-sm border border-ink-700 px-4 py-3 text-ink-200 leading-relaxed">
              He's already past deadline. California gives landlords 21 days to itemize
              deductions <CitationChip markerId={1} sourceId="src-1" />. Once you dispute it in
              writing, the burden shifts to him to justify any deduction{" "}
              <CitationChip markerId={2} sourceId="src-3" />.
            </div>
          </div>
          <p className="text-xs text-ink-400 mt-4">Try the full conversation in the workspace →</p>
        </div>
      </section>

      <section id="coverage" className="border-y border-ink-700 bg-ink-900/50">
        <div className="max-w-[1400px] mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-4xl text-brass-300">{stats.jurisdictionsCovered}</p>
            <p className="text-sm text-ink-200 mt-1">U.S. jurisdictions modeled, federal and state</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-brass-300">{stats.sourcesIndexed}</p>
            <p className="text-sm text-ink-200 mt-1">Statutes, cases, and regulations indexed</p>
          </div>
          <div>
            <p className="font-serif text-4xl text-brass-300">~{stats.avgResponseSeconds}s</p>
            <p className="text-sm text-ink-200 mt-1">Average time to a sourced first answer</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-[1400px] mx-auto px-8 py-20">
        <h2 className="font-serif text-3xl mb-10 max-w-lg">From a question to a next step, in four moves.</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              n: "01",
              title: "Describe your situation",
              body: "Plain language, your jurisdiction. No legal vocabulary required.",
            },
            {
              n: "02",
              title: "Counsel AI researches",
              body: "It pulls the statutes, regulations, and case law that actually apply — not generic advice.",
            },
            {
              n: "03",
              title: "Review the reasoning",
              body: "Every claim links back to its source. Click any citation to read the underlying text.",
            },
            {
              n: "04",
              title: "Take the next step",
              body: "A concrete action plan — a letter to send, a form to file, a deadline to track.",
            },
          ].map((step) => (
            <div key={step.n} className="border-t border-ink-600 pt-4">
              <span className="citation-mark text-xs text-ink-400">{step.n}</span>
              <h3 className="font-serif text-lg mt-2 mb-2">{step.title}</h3>
              <p className="text-sm text-ink-200 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-700 border border-ink-700">
          {[
            {
              icon: FileSearch,
              title: "Document analysis",
              body: "Upload a lease, contract, or notice. Counsel AI flags risky clauses and explains each one in plain language.",
            },
            {
              icon: MessagesSquare,
              title: "Conversation review",
              body: "Paste a text or email thread. It flags statements with legal weight — admissions, threats, retaliation.",
            },
            {
              icon: ScrollText,
              title: "Rights, explained plainly",
              body: "No jargon by default. Toggle 'show me the legal language' any time you want the underlying text.",
            },
            {
              icon: ShieldCheck,
              title: "Source-traceable by design",
              body: "Every substantive claim is a clickable citation — a statute, a case, or a regulation, never invented.",
            },
            {
              icon: Scale,
              title: "Jurisdiction-aware",
              body: "State, county, and city law are layered correctly, not treated as one national default.",
            },
            {
              icon: Gavel,
              title: "Knows its limits",
              body: "Flags when a matter needs a licensed attorney or a court filing Counsel AI can't complete for you.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-ink-950 p-7">
              <Icon size={20} className="text-brass-300 mb-4" />
              <h3 className="font-serif text-lg mb-2">{title}</h3>
              <p className="text-sm text-ink-200 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink-700 px-8 py-8 max-w-[1400px] mx-auto flex items-center justify-between text-xs text-ink-400">
        <span>Counsel AI — built for LexHack 2026</span>
        <span>Not a law firm. Not legal representation.</span>
      </footer>
    </div>
  );
}
