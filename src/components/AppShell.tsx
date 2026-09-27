import { NavLink, Outlet } from "react-router-dom";
import { Scale, Gauge, MessageSquareText, FileSearch, MessagesSquare, Library, Settings2, Landmark } from "lucide-react";
import { JurisdictionBadge } from "./Badges";
import { LanguageSelector } from "./LanguageSelector";

const navItems = [
  { to: "/app/dashboard", label: "Case dashboard", icon: Gauge },
  { to: "/app/ask", label: "Ask Counsel", icon: MessageSquareText },
  { to: "/app/documents", label: "Documents", icon: FileSearch },
  { to: "/app/conversations", label: "Conversations", icon: MessagesSquare },
  { to: "/app/sources", label: "Source library", icon: Library },
  { to: "/app/legal-aid", label: "Legal aid directory", icon: Landmark },
  { to: "/app/settings", label: "Settings", icon: Settings2 },
];

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-ink-950">
      <nav className="flex w-[240px] shrink-0 flex-col border-r border-ink-700 bg-ink-900">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-ink-700">
          <Scale size={20} className="text-brass-300" />
          <span className="font-serif text-lg text-bone">Counsel AI</span>
        </div>
        <div className="flex flex-col gap-1 px-3 py-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-ink-800 text-bone border-l-2 border-brass-500 -ml-px pl-[11px]"
                    : "text-ink-200 hover:bg-ink-800/60 hover:text-bone"
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </div>
        <div className="mt-auto px-5 py-5 border-t border-ink-700">
          <p className="text-xs text-ink-400 leading-relaxed">
            Demo workspace — responses use illustrative data, not a live legal database.
          </p>
        </div>
      </nav>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-ink-700 bg-ink-950/80 px-8 py-4">
          <div className="flex items-center gap-3">
            <JurisdictionBadge name="California, United States" />
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-ink-700 border border-ink-600 flex items-center justify-center font-serif text-sm text-brass-300">
              K
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
