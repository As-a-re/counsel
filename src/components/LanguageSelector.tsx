import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguageCode, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-sm border border-ink-700 px-3 py-1.5 text-xs text-ink-200 hover:border-ink-600 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe size={13} className="text-brass-300" />
        {language.nativeLabel}
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-56 rounded-sm border border-ink-700 bg-ink-900 shadow-xl py-1"
        >
          {languages.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={l.code === language.code}
              onClick={() => {
                setLanguageCode(l.code);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-ink-200 hover:bg-ink-800 hover:text-bone transition-colors"
            >
              <span>
                {l.nativeLabel} <span className="text-ink-400">· {l.label}</span>
              </span>
              {l.code === language.code && <Check size={14} className="text-brass-300" />}
            </button>
          ))}
          <div className="border-t border-ink-700 mt-1 pt-2 px-3 pb-1">
            <p className="text-[11px] text-ink-400 leading-snug">
              Speech in and out works in every language listed. Full conversation text is
              translated for English and Spanish in this demo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
