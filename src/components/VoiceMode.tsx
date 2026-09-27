import { useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, X } from "lucide-react";
import type { ChatMessage } from "../data/mockData";

interface VoiceModeProps {
  onClose: () => void;
  isListening: boolean;
  interim: string;
  onToggleListen: () => void;
  lastMessage: ChatMessage | null;
  thinking: boolean;
  isSpeaking: boolean;
  supported: boolean;
}

export function VoiceMode({
  onClose,
  isListening,
  interim,
  onToggleListen,
  lastMessage,
  thinking,
  isSpeaking,
  supported,
}: VoiceModeProps) {
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    captionRef.current?.scrollTo({ top: captionRef.current.scrollHeight });
  }, [lastMessage]);

  return (
    <div className="fixed inset-0 z-50 bg-ink-950 flex flex-col">
      <div className="flex items-center justify-between px-8 py-6">
        <span className="text-xs uppercase tracking-wide text-ink-400">Voice mode</span>
        <button onClick={onClose} className="text-ink-400 hover:text-bone transition-colors" aria-label="Exit voice mode">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {!supported ? (
          <p className="text-ink-200 text-center max-w-sm">
            Voice input isn't available in this browser. Try Chrome or Edge on desktop or Android.
          </p>
        ) : (
          <>
            <button
              onClick={onToggleListen}
              className={`relative flex h-32 w-32 items-center justify-center rounded-full transition-colors ${
                isListening ? "bg-oxblood-500" : "bg-brass-500"
              }`}
              aria-pressed={isListening}
              aria-label={isListening ? "Stop listening" : "Start speaking"}
            >
              {isListening && (
                <>
                  <span className="absolute inset-0 rounded-full bg-oxblood-500/40 animate-ping" />
                  <span className="absolute -inset-3 rounded-full border border-oxblood-500/30" />
                </>
              )}
              {isListening ? <MicOff size={36} className="text-bone relative" /> : <Mic size={36} className="text-ink-950 relative" />}
            </button>
            <p className="mt-6 text-sm text-ink-400">
              {isListening ? "Listening — tap to send" : thinking ? "Researching…" : isSpeaking ? "Speaking…" : "Tap to speak"}
            </p>
          </>
        )}

        <div ref={captionRef} className="mt-10 max-w-lg w-full max-h-40 overflow-y-auto text-center">
          {interim && <p className="text-ink-200 text-lg leading-relaxed">{interim}</p>}
          {!interim && lastMessage && (
            <div>
              <div className="flex items-center justify-center gap-1.5 text-brass-300 text-xs mb-2">
                {isSpeaking && <Volume2 size={13} />}
                Counsel AI
              </div>
              <p className="text-bone text-lg leading-relaxed">
                {lastMessage.text.replace(/【\d+】/g, "")}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-ink-400 pb-8">
        Voice mode reads responses aloud and shows captions — built for hands-free and low-vision use.
      </p>
    </div>
  );
}
