# Counsel AI

A jurisdiction-aware AI legal assistant — frontend prototype, built for LexHack 2026.

This is the **complete frontend**, wired to realistic demo data so every screen is fully
interactive without a backend. It's built to feel like an AI lawyer while behaving like a
legal reasoning + research + evidence system: every substantive claim is a clickable citation
back to a (mock) primary source.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Start at `/` (landing) -> `/onboarding` -> `/app/dashboard`.

## What's in it

- **Landing** (`/`) - product story, live chat preview, how-it-works.
- **Onboarding** (`/onboarding`) - jurisdiction + area-of-law + situation intake, 3-step flow.
- **Case dashboard** (`/app/dashboard`) - all open matters, risk/exposure scoring, deadlines.
- **Matter detail** (`/app/dashboard/:matterId`) - plain-language rights breakdown, a concrete
  step-by-step action plan, and the sources relied on for that specific matter.
- **Ask Counsel** (`/app/ask`) - the core chat experience. Inline citation markers open a
  right-hand source drawer with the full statute/case text and why it applies. A
  plain-language toggle and suggested follow-ups are included.
- **Documents** (`/app/documents`) - upload-and-annotate flow for a lease agreement: each
  clause is flagged (high/medium/low/info risk) with a plain-language explanation and, where
  relevant, the statute it conflicts with.
- **Conversations** (`/app/conversations`) - paste a text/email thread and see which messages
  carry legal weight (unsupported claims, retaliatory threats), each with an explanation and
  citation.
- **Source library** (`/app/sources`) - every statute, case, and regulation cited anywhere in
  the app, searchable and filterable by type, independent of any one conversation.
- **Settings** (`/app/settings`) - home jurisdiction, privacy controls, and the standing
  disclaimer that this is legal information, not representation.

## Voice and language

- **Ask Counsel** has a mic button for dictation, a speaker icon on every AI reply to read
  it aloud, an auto-speak toggle, and a full-screen **"Talk to Counsel"** voice mode — a
  hands-free, phone-call-style interface with live captions, built for low-literacy, low-vision,
  or hands-busy use. All of this runs on the real browser Web Speech API (works in Chrome/Edge;
  gracefully explains itself where unsupported, e.g. Firefox/Safari).
- The language selector (globe icon, top right) switches speech recognition and playback across
  six languages. Full conversation text is translated for English and Spanish in this demo;
  other languages are honestly labeled as voice-only for now.
- **Documents** has a "Listen" button on the plain-language explanation of each clause.

## Safety and access to justice

- **Conversations** separates legal analysis from immediate safety: a message that reads as a
  threat surfaces a distinct safety banner with a 911 link and a non-emergency resource line,
  ahead of any legal strategy.
- **Legal aid directory** (`/app/legal-aid`) lists free and income-qualified organizations by
  practice area, language spoken, and a one-tap phone number — the concrete next step for
  someone who can't afford a lawyer.

## Design system

- **Ink** (deep navy) surfaces for AI reasoning and chat - dark, deliberate, "chambers" feel.
- **Paper** surfaces (document analysis) for source material - a visual split between "what
  the document says" and "what Counsel AI concludes."
- **Brass** accent for citations and primary actions; **oxblood** for risk flags; **sage** for
  low-risk/positive states.
- Display type: Source Serif 4. UI type: Public Sans. Citation codes and IDs: IBM Plex Mono -
  reserved for structured data only, never decorative labels.

## Stack

Vite + React + TypeScript + Tailwind CSS v4 + React Router + lucide-react icons. No backend -
all data lives in `src/data/mockData.ts`, structured so a real API (LLM reasoning + a legal
research index) could be dropped in behind the same interfaces.

## Not included (by design, for this phase)

This is frontend-only, as requested. Wiring `AskCounsel.tsx`'s `send()` function to a real
model + retrieval pipeline, real document OCR/parsing, and persistence are the natural next
phase.
