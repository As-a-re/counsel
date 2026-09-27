import { createContext, useContext, useState, type ReactNode } from "react";
import { sources, type Source } from "../data/mockData";
import { X, Scale, Landmark, BookOpen, FileText } from "lucide-react";

interface DrawerState {
  open: boolean;
  sourceId: string | null;
}

interface DrawerContextValue {
  openSource: (sourceId: string) => void;
  close: () => void;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useSourceDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useSourceDrawer must be used within SourceDrawerProvider");
  return ctx;
}

const typeIcon: Record<Source["type"], ReactNode> = {
  statute: <Scale size={15} />,
  case: <Landmark size={15} />,
  regulation: <FileText size={15} />,
  secondary: <BookOpen size={15} />,
};

const typeLabel: Record<Source["type"], string> = {
  statute: "Statute",
  case: "Case law",
  regulation: "Regulation",
  secondary: "Secondary source",
};

export function SourceDrawerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DrawerState>({ open: false, sourceId: null });
  const source = sources.find((s) => s.id === state.sourceId) ?? null;

  return (
    <DrawerContext.Provider
      value={{
        openSource: (sourceId) => setState({ open: true, sourceId }),
        close: () => setState((s) => ({ ...s, open: false })),
      }}
    >
      {children}
      <div
        aria-hidden={!state.open}
        className={`fixed inset-0 z-40 transition-opacity ${state.open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div
          onClick={() => setState((s) => ({ ...s, open: false }))}
          className="absolute inset-0 bg-ink-950/60"
        />
        <aside
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-ink-900 border-l border-ink-700 shadow-2xl transition-transform duration-300 ${
            state.open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-label="Source detail"
        >
          {source && (
            <div className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-3 border-b border-ink-700 px-6 py-5">
                <div className="flex items-center gap-2 text-brass-300">
                  {typeIcon[source.type]}
                  <span className="text-xs uppercase tracking-wide font-medium">{typeLabel[source.type]}</span>
                </div>
                <button
                  onClick={() => setState((s) => ({ ...s, open: false }))}
                  className="text-ink-400 hover:text-bone transition-colors"
                  aria-label="Close source detail"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="citation-mark text-sm text-brass-300 mb-2">{source.citation}</p>
                <h3 className="font-serif text-xl leading-snug text-bone mb-3">{source.title}</h3>
                <div className="flex items-center gap-2 text-xs text-ink-400 mb-6">
                  <span>{source.jurisdiction}</span>
                  <span aria-hidden="true">•</span>
                  <span>{source.year}</span>
                </div>
                <div className="rounded-sm border border-ink-700 bg-ink-800 p-4 mb-5">
                  <p className="text-[11px] uppercase tracking-wide text-ink-400 mb-2">Text</p>
                  <p className="text-sm leading-relaxed text-ink-200">{source.snippet}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-400 mb-2">Why this applies here</p>
                  <p className="text-sm leading-relaxed text-bone">{source.relevance}</p>
                </div>
              </div>
              <div className="border-t border-ink-700 px-6 py-4">
                <p className="text-xs text-ink-400">
                  Demo citation — in production this links to the primary source and a verification timestamp.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </DrawerContext.Provider>
  );
}
