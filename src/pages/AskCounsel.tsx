import { useEffect, useRef, useState } from "react";
import { demoChat, sources, type ChatMessage } from "../data/mockData";
import { demoChatEs, followUpsEs, fallbackReplyEs } from "../data/i18n";
import { TextWithCitations } from "../components/CitationChip";
import { useLanguage } from "../context/LanguageContext";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { VoiceMode } from "../components/VoiceMode";
import { Send, Sparkles, ToggleLeft, ToggleRight, Mic, Volume2, VolumeX, PhoneCall } from "lucide-react";

const followUpsEn = [
  "What if he ignores the demand letter?",
  "How much does small claims cost to file?",
  "Should I get this in writing before I move forward?",
];

const fallbackReplyEn =
  "That's a fair next question to ask. In general, once you've sent a written demand and the deadline passes without a response, small claims is the standard next step for an amount like this — no attorney required, and filing fees for this range are typically under $75. I'd keep every message and the original lease handy for the hearing.";

export function AskCounsel() {
  const { language } = useLanguage();
  const initialMessages = language.code.startsWith("es") ? demoChatEs : demoChat;
  const followUps = language.code.startsWith("es") ? followUpsEs : followUpsEn;
  const fallbackReply = language.code.startsWith("es") ? fallbackReplyEs : fallbackReplyEn;

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [plainLanguage, setPlainLanguage] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [voiceModeOpen, setVoiceModeOpen] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastSpokenId = useRef<string | null>(null);

  const recognition = useSpeechRecognition(language.code);
  const synth = useSpeechSynthesis(language.code);

  // Reset the demo conversation when the language changes.
  useEffect(() => {
    setMessages(language.code.startsWith("es") ? demoChatEs : demoChat);
    lastSpokenId.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language.code]);

  // Live-fill the composer from speech while listening (not in voice mode).
  useEffect(() => {
    if (!voiceModeOpen && recognition.isListening) {
      setInput((recognition.finalTranscript + " " + recognition.interimTranscript).trim());
    }
  }, [recognition.finalTranscript, recognition.interimTranscript, voiceModeOpen, recognition.isListening]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  // Auto-speak new assistant replies while voice mode or auto-speak is on.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    if (last.id === lastSpokenId.current) return;
    if (voiceModeOpen || autoSpeak) {
      lastSpokenId.current = last.id;
      synth.speak(last.id, last.text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, voiceModeOpen, autoSpeak]);

  const usedSourceIds = Array.from(
    new Set(messages.flatMap((m) => m.citations?.map((c) => c.sourceId) ?? []))
  );

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    recognition.reset();
    setThinking(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: fallbackReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      ]);
      setThinking(false);
    }, 1100);
  }

  function handleVoiceModeToggleListen() {
    if (recognition.isListening) {
      recognition.stop();
      const text = (recognition.finalTranscript + " " + recognition.interimTranscript).trim();
      if (text) send(text);
    } else {
      recognition.start();
    }
  }

  const lastMessage = messages[messages.length - 1] ?? null;

  return (
    <div className="flex h-[calc(100vh-73px)]">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-ink-700 px-8 py-4">
          <div>
            <h1 className="font-serif text-lg text-bone">Deposit dispute — 214 Bryant St</h1>
            <p className="text-xs text-ink-400">Housing · San Francisco, CA</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setVoiceModeOpen(true)}
              className="flex items-center gap-2 rounded-sm border border-ink-700 px-3 py-1.5 text-xs text-ink-200 hover:border-brass-500 hover:text-bone transition-colors"
            >
              <PhoneCall size={14} className="text-brass-300" /> Talk to Counsel
            </button>
            <button
              onClick={() => setAutoSpeak((v) => !v)}
              className="flex items-center gap-2 text-xs text-ink-200 hover:text-bone transition-colors"
              title="Read new replies aloud automatically"
            >
              {autoSpeak ? <Volume2 size={16} className="text-brass-300" /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => setPlainLanguage((v) => !v)}
              className="flex items-center gap-2 text-xs text-ink-200 hover:text-bone transition-colors"
            >
              {plainLanguage ? <ToggleRight size={22} className="text-brass-300" /> : <ToggleLeft size={22} />}
              Plain language
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {messages.map((m) => (
            <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={m.role === "user" ? "max-w-[70%]" : "max-w-[75%]"}>
                <div
                  className={
                    m.role === "user"
                      ? "rounded-sm bg-ink-800 px-4 py-3 text-bone text-sm"
                      : "rounded-sm border border-ink-700 px-5 py-4 text-sm text-ink-200 leading-relaxed"
                  }
                >
                  {m.role === "assistant" && (
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 text-brass-300 text-xs">
                        <Sparkles size={12} /> Counsel AI
                      </div>
                      {synth.supported && (
                        <button
                          onClick={() => (synth.speakingId === m.id ? synth.stop() : synth.speak(m.id, m.text))}
                          className="text-ink-400 hover:text-brass-300 transition-colors"
                          aria-label={synth.speakingId === m.id ? "Stop reading aloud" : "Read aloud"}
                        >
                          {synth.speakingId === m.id ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </button>
                      )}
                    </div>
                  )}
                  <TextWithCitations text={m.text} citations={m.citations} />
                </div>
                <p className="text-[11px] text-ink-400 mt-1 px-1">{m.timestamp}</p>
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-sm border border-ink-700 px-5 py-4 text-sm text-ink-400">
                <div className="flex items-center gap-1.5 text-brass-300 text-xs mb-2">
                  <Sparkles size={12} /> Counsel AI
                </div>
                Researching applicable statutes…
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-ink-700 px-8 py-4">
          <div className="flex gap-2 mb-3 flex-wrap">
            {followUps.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-ink-700 px-3 py-1.5 text-xs text-ink-200 hover:border-brass-500 hover:text-bone transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-3"
          >
            {recognition.supported && (
              <button
                type="button"
                onClick={() => (recognition.isListening ? recognition.stop() : recognition.start())}
                className={`rounded-sm p-3 transition-colors ${
                  recognition.isListening ? "bg-oxblood-500 text-bone" : "border border-ink-700 text-ink-200 hover:border-brass-500"
                }`}
                aria-pressed={recognition.isListening}
                aria-label={recognition.isListening ? "Stop dictation" : "Start dictation"}
              >
                <Mic size={16} />
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={recognition.isListening ? "Listening…" : "Ask a follow-up question…"}
              className="flex-1 rounded-sm border border-ink-700 bg-ink-900 px-4 py-3 text-bone placeholder:text-ink-400 focus:border-brass-500 outline-none text-sm"
            />
            <button
              type="submit"
              className="rounded-sm bg-brass-500 p-3 text-ink-950 hover:bg-brass-300 transition-colors"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <aside className="w-[300px] shrink-0 border-l border-ink-700 px-6 py-6 overflow-y-auto">
        <p className="text-xs uppercase tracking-wide text-ink-400 mb-4">Sources in this conversation</p>
        <div className="space-y-4">
          {usedSourceIds.map((sid) => {
            const s = sources.find((s) => s.id === sid);
            if (!s) return null;
            return (
              <div key={sid} className="pb-4 border-b border-ink-700 last:border-0">
                <p className="citation-mark text-xs text-brass-300 mb-1">{s.citation}</p>
                <p className="text-sm text-bone leading-snug mb-1">{s.title}</p>
                <p className="text-xs text-ink-400">{s.jurisdiction}</p>
              </div>
            );
          })}
        </div>
      </aside>

      {voiceModeOpen && (
        <VoiceMode
          onClose={() => {
            setVoiceModeOpen(false);
            recognition.stop();
          }}
          isListening={recognition.isListening}
          interim={(recognition.finalTranscript + " " + recognition.interimTranscript).trim()}
          onToggleListen={handleVoiceModeToggleListen}
          lastMessage={lastMessage}
          thinking={thinking}
          isSpeaking={synth.speakingId === lastMessage?.id}
          supported={recognition.supported}
        />
      )}
    </div>
  );
}
