import { useSourceDrawer } from "./SourceDrawerContext";

export function CitationChip({ markerId, sourceId }: { markerId: number; sourceId: string }) {
  const { openSource } = useSourceDrawer();
  return (
    <button
      onClick={() => openSource(sourceId)}
      className="citation-mark inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brass-500/20 px-1.5 text-[11px] font-medium text-brass-300 align-super hover:bg-brass-500/35 hover:text-brass-300 transition-colors"
      aria-label={`View source ${markerId}`}
    >
      {markerId}
    </button>
  );
}

/** Parses text containing【1】-style markers and renders CitationChip inline. */
export function TextWithCitations({
  text,
  citations,
}: {
  text: string;
  citations?: { markerId: number; sourceId: string }[];
}) {
  if (!citations || citations.length === 0) {
    return (
      <>
        {text.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-3" : ""}>
            {line}
          </p>
        ))}
      </>
    );
  }

  return (
    <>
      {text.split("\n\n").map((paragraph, pIdx) => {
        const segments = paragraph.split(/【(\d+)】/g);
        return (
          <p key={pIdx} className={pIdx > 0 ? "mt-3" : ""}>
            {segments.map((seg, i) => {
              if (i % 2 === 1) {
                const markerId = Number(seg);
                const c = citations.find((c) => c.markerId === markerId);
                if (c) return <CitationChip key={i} markerId={c.markerId} sourceId={c.sourceId} />;
              }
              return <span key={i}>{seg}</span>;
            })}
          </p>
        );
      })}
    </>
  );
}
