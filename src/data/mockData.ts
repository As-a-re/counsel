export type SourceType = "statute" | "case" | "regulation" | "secondary";

export interface Source {
  id: string;
  citation: string;
  title: string;
  jurisdiction: string;
  type: SourceType;
  year: number;
  snippet: string;
  relevance: string;
}

export const sources: Source[] = [
  {
    id: "src-1",
    citation: "Cal. Civ. Code § 1950.5(g)(1)",
    title: "Security deposits — itemized statement of deductions",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "Within 21 days after the tenant vacates, the landlord shall furnish an itemized statement of deductions and, subject to §1950.5(b), return any remaining portion of the deposit.",
    relevance: "Sets the 21-day deadline your landlord has already missed.",
  },
  {
    id: "src-2",
    citation: "Cal. Civ. Code § 1950.5(l)",
    title: "Bad-faith retention — statutory damages",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "The bad faith retention by a landlord of a tenant's security deposit may subject the landlord to statutory damages of up to twice the amount of the security, in addition to actual damages.",
    relevance: "Explains the up-to-2x penalty available if bad faith is shown.",
  },
  {
    id: "src-3",
    citation: "Granberry v. Islay Invs., 9 Cal. 4th 738 (1995)",
    title: "Landlord's burden on deposit disputes",
    jurisdiction: "California",
    type: "case",
    year: 1995,
    snippet:
      "The California Supreme Court held landlords bear the burden of justifying any deduction from a security deposit once the tenant disputes it.",
    relevance: "Shifts the burden of proof to your landlord once you dispute the charges in writing.",
  },
  {
    id: "src-4",
    citation: "Cal. Civ. Code § 1942.5",
    title: "Retaliatory eviction — presumption",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "A lessor may not retaliate against a lessee within 180 days of the lessee's exercise of specified rights, including a written complaint about tenantability.",
    relevance: "Covers your 180-day protection window after filing the repair complaint.",
  },
  {
    id: "src-5",
    citation: "S.F. Rent Ordinance § 37.9",
    title: "Just-cause eviction protections",
    jurisdiction: "San Francisco, CA",
    type: "regulation",
    year: 2023,
    snippet:
      "A landlord shall not endeavor to recover possession of a rental unit unless the landlord can establish one of the just causes enumerated in this section.",
    relevance: "Local ordinance layered on top of state law — your building qualifies.",
  },
  {
    id: "src-6",
    citation: "Civ. Code § 1962",
    title: "Disclosure of ownership and agents",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "The landlord or their agent shall disclose the name, address, and telephone number of the persons authorized to manage the premises.",
    relevance: "Relevant to whether the notice you received came from an authorized party.",
  },
  {
    id: "src-7",
    citation: "Nolo, Security Deposit Limits and Deadlines (2026 ed.)",
    title: "50-state survey of deposit deadlines",
    jurisdiction: "Multistate",
    type: "secondary",
    year: 2026,
    snippet:
      "Secondary-source summary cross-referencing statutory deadlines and damages multipliers across all 50 states, cited for context rather than authority.",
    relevance: "Background reading — not binding, included for comparison across states.",
  },
  {
    id: "src-8",
    citation: "29 U.S.C. § 2601 et seq. (FMLA)",
    title: "Family and Medical Leave Act",
    jurisdiction: "Federal",
    type: "statute",
    year: 2024,
    snippet:
      "Entitles eligible employees to up to 12 workweeks of unpaid, job-protected leave for specified family and medical reasons.",
    relevance: "Applies if your employer has 50+ employees within 75 miles.",
  },
  {
    id: "src-9",
    citation: "Cal. Gov. Code § 12945.2 (CFRA)",
    title: "California Family Rights Act",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "Extends comparable job-protected leave rights to employers with 5 or more employees, closing the FMLA eligibility gap for smaller employers.",
    relevance: "Covers you even though your employer is below the federal 50-employee threshold.",
  },
  {
    id: "src-10",
    citation: "Cal. Lab. Code § 1102.5",
    title: "Whistleblower retaliation protections",
    jurisdiction: "California",
    type: "statute",
    year: 2024,
    snippet:
      "An employer may not retaliate against an employee for disclosing information the employee reasonably believes evidences a violation of law.",
    relevance: "Potentially relevant to the timing of your write-up after the safety complaint.",
  },
];

export type RiskLevel = "high" | "medium" | "low" | "info";

export interface Matter {
  id: string;
  title: string;
  category: "Housing" | "Employment" | "Consumer" | "Family";
  jurisdiction: string;
  status: "Gathering facts" | "Researching" | "Drafting" | "Awaiting response" | "Resolved";
  riskScore: number;
  opened: string;
  nextDeadline: { label: string; date: string } | null;
  summary: string;
}

export const matters: Matter[] = [
  {
    id: "matter-1",
    title: "Security deposit withheld — 214 Bryant St",
    category: "Housing",
    jurisdiction: "San Francisco, CA",
    status: "Drafting",
    riskScore: 28,
    opened: "Aug 14, 2026",
    nextDeadline: { label: "Send demand letter before small-claims filing window narrows", date: "Oct 3, 2026" },
    summary:
      "Landlord kept the full $3,200 deposit 34 days after move-out with no itemized statement. Demand letter drafted, citations verified.",
  },
  {
    id: "matter-2",
    title: "Leave request denied after surgery",
    category: "Employment",
    jurisdiction: "California",
    status: "Researching",
    riskScore: 61,
    opened: "Sep 2, 2026",
    nextDeadline: { label: "Respond to HR's written warning", date: "Sep 30, 2026" },
    summary:
      "Employer (38 employees) denied FMLA leave citing headcount, but CFRA likely still applies. Comparing eligibility thresholds.",
  },
  {
    id: "matter-3",
    title: "Disputed charge — moving company damages",
    category: "Consumer",
    jurisdiction: "California",
    status: "Gathering facts",
    riskScore: 14,
    opened: "Sep 20, 2026",
    nextDeadline: null,
    summary:
      "Mover added a $640 're-delivery fee' not in the signed estimate. Collecting the original quote and photos before drafting a dispute.",
  },
];

export interface ChatCitationRef {
  markerId: number;
  sourceId: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations?: ChatCitationRef[];
  timestamp: string;
}

export const demoChat: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    text: "My landlord in San Francisco kept my whole $3,200 deposit and it's been 34 days since I moved out. He hasn't sent anything in writing. What can I actually do?",
    timestamp: "9:41 AM",
  },
  {
    id: "m2",
    role: "assistant",
    text:
      "Short version: your landlord is already past deadline, and the law puts the burden on him, not you.\n\nUnder California law, a landlord has 21 days after you move out to send an itemized statement of any deductions and return the rest of the deposit【1】. You're at day 34 with nothing in writing, so he's missed that window.\n\nOnce you dispute the charges in writing, California courts have held that the landlord — not you — has to justify any deduction【2】. If it turns out he's withholding in bad faith, not just late, you may be able to recover up to twice the deposit amount on top of the $3,200 itself【3】.\n\nBecause your unit is in San Francisco, there may also be a local ordinance layer worth checking once we know your building type【4】.\n\nHere's what I'd do next: send a written demand letter citing the 21-day deadline, give him 10 days to respond, and if he doesn't, file in small claims — no lawyer required for a claim this size.",
    citations: [
      { markerId: 1, sourceId: "src-1" },
      { markerId: 2, sourceId: "src-3" },
      { markerId: 3, sourceId: "src-2" },
      { markerId: 4, sourceId: "src-5" },
    ],
    timestamp: "9:41 AM",
  },
  {
    id: "m3",
    role: "user",
    text: "Can he just say the carpet needed replacing and keep it for that?",
    timestamp: "9:44 AM",
  },
  {
    id: "m4",
    role: "assistant",
    text:
      "He can claim it, but a claim isn't proof. Ordinary wear and tear — carpet wear after a normal tenancy — generally can't be deducted; only damage beyond normal use qualifies, and he still owes you the itemized statement and, typically, invoices or estimates backing up the cost【1】.\n\nSince he's already missed the 21-day deadline, the itemization requirement doesn't go away — it just makes his position weaker the longer he waits. I'd ask him directly, in writing, for the itemized statement and any invoices before assuming the carpet claim will hold up.",
    citations: [{ markerId: 1, sourceId: "src-1" }],
    timestamp: "9:44 AM",
  },
];

export interface Clause {
  id: string;
  heading: string;
  excerpt: string;
  risk: RiskLevel;
  plainLanguage: string;
  citationIds: string[];
}

export const leaseDocument = {
  fileName: "214-bryant-st-lease-signed.pdf",
  uploaded: "Sep 24, 2026",
  jurisdiction: "San Francisco, CA",
  pages: 6,
  clauses: [
    {
      id: "cl-1",
      heading: "§4 — Security Deposit",
      excerpt:
        "Tenant shall deposit $3,200 with Landlord as security for performance of Tenant's obligations. Deposit is non-refundable if Tenant vacates before the lease term ends.",
      risk: "high" as RiskLevel,
      plainLanguage:
        "The 'non-refundable' language conflicts with state law — California doesn't let landlords make deposits non-refundable regardless of what the lease says. This clause is likely unenforceable as written.",
      citationIds: ["src-1"],
    },
    {
      id: "cl-2",
      heading: "§9 — Repairs and Maintenance",
      excerpt:
        "Landlord shall have no obligation to make repairs unless notified in writing, and reserves the right to enter with 24 hours notice for any purpose.",
      risk: "medium" as RiskLevel,
      plainLanguage:
        "The entry clause is broader than what's typically allowed — 'any purpose' with only 24 hours notice may exceed the reasonable-notice standard for non-emergency entry. Worth flagging if entries feel excessive.",
      citationIds: ["src-6"],
    },
    {
      id: "cl-3",
      heading: "§12 — Early Termination",
      excerpt:
        "Tenant may terminate early only with Landlord's written consent, which may be withheld for any reason.",
      risk: "low" as RiskLevel,
      plainLanguage:
        "Fairly standard for a fixed-term lease. Not favorable to you, but not obviously unenforceable — just a real constraint to plan around.",
      citationIds: [],
    },
    {
      id: "cl-4",
      heading: "§18 — Retaliation Waiver",
      excerpt:
        "Tenant waives any claim of retaliatory eviction arising from complaints made to Landlord or any government agency.",
      risk: "high" as RiskLevel,
      plainLanguage:
        "This waiver is very likely unenforceable. California's anti-retaliation protections generally can't be waived in advance by a lease clause — this looks like boilerplate copied from a form that predates current law.",
      citationIds: ["src-4"],
    },
  ] as Clause[],
};

export interface FlaggedMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  flag?: {
    severity: RiskLevel;
    label: string;
    explanation: string;
    citationIds: string[];
    safety?: boolean;
  };
}

export const conversationThread: FlaggedMessage[] = [
  { id: "t1", sender: "You", text: "Hi, following up on the deposit — it's been over a month.", time: "Sep 18, 8:02 AM" },
  {
    id: "t2",
    sender: "Landlord",
    text: "Not returning it. You damaged the carpet and left it dirty.",
    time: "Sep 18, 11:47 AM",
    flag: {
      severity: "medium",
      label: "Unsupported deduction claim",
      explanation:
        "An assertion of damage isn't an itemized statement. No amount, no invoice, and no timeline is given — this alone doesn't satisfy the statutory itemization requirement.",
      citationIds: ["src-1"],
    },
  },
  { id: "t3", sender: "You", text: "Can you send me an itemized breakdown and receipts, like the law requires?", time: "Sep 18, 12:10 PM" },
  {
    id: "t4",
    sender: "Landlord",
    text: "If you push this I'll make sure the next place calls me and I won't say great things.",
    time: "Sep 18, 12:22 PM",
    flag: {
      severity: "high",
      label: "Possible retaliatory intimidation",
      explanation:
        "Threatening a bad reference specifically because the tenant asserted a legal right can support a retaliation or bad-faith argument, and strengthens your position if this dispute proceeds to small claims.",
      citationIds: ["src-2", "src-4"],
    },
  },
  {
    id: "t4b",
    sender: "Landlord",
    text: "Keep pushing and see what happens when I show up to collect it myself.",
    time: "Sep 18, 12:25 PM",
    flag: {
      severity: "high",
      label: "Safety concern — possible threat",
      explanation:
        "This reads as more than a contract dispute — it can be interpreted as a threat of unwanted contact. Counsel AI surfaces safety resources whenever language like this appears, separately from the legal analysis.",
      citationIds: [],
      safety: true,
    },
  },
  { id: "t5", sender: "You", text: "I'd still like the itemized statement in writing within the next 10 days.", time: "Sep 18, 12:30 PM" },
];

export interface ActionStep {
  id: string;
  title: string;
  description: string;
  status: "done" | "current" | "upcoming";
  deadline?: string;
}

export const actionPlan: ActionStep[] = [
  {
    id: "step-1",
    title: "Document the timeline",
    description: "Move-out date, notice given, and every message exchanged — already compiled from your uploads.",
    status: "done",
  },
  {
    id: "step-2",
    title: "Send a written demand letter",
    description:
      "Cites the 21-day statutory deadline and requests the deposit plus statutory damages within 10 days. Draft ready for your review.",
    status: "current",
    deadline: "Send by Oct 1, 2026",
  },
  {
    id: "step-3",
    title: "Prepare a small-claims filing",
    description:
      "If no response in 10 days, file in San Francisco Superior Court, small claims division. Filing fee is under $75 for this amount.",
    status: "upcoming",
    deadline: "By Oct 3, 2026",
  },
  {
    id: "step-4",
    title: "Optional: consult a tenant-rights clinic",
    description:
      "Free legal aid clinics can review your filing before the hearing. Counsel AI can prepare a summary packet for that conversation.",
    status: "upcoming",
  },
];

export const jurisdictions = [
  "California",
  "San Francisco, CA",
  "New York",
  "Texas",
  "Federal (U.S.)",
];

export const stats = {
  jurisdictionsCovered: 51,
  sourcesIndexed: "48,200+",
  avgResponseSeconds: 6,
};

export interface LegalAidOrg {
  id: string;
  name: string;
  focus: ("Housing" | "Employment" | "Consumer" | "Family")[];
  city: string;
  languages: string[];
  phone: string;
  cost: "Free" | "Free or sliding-scale";
  description: string;
}

export const legalAidOrgs: LegalAidOrg[] = [
  {
    id: "org-1",
    name: "Bay Area Tenant Rights Clinic",
    focus: ["Housing"],
    city: "San Francisco, CA",
    languages: ["English", "Spanish", "Cantonese"],
    phone: "+14155550142",
    cost: "Free",
    description: "Walk-in and phone clinics for deposit disputes, habitability, and eviction defense.",
  },
  {
    id: "org-2",
    name: "Golden Gate Legal Aid Society",
    focus: ["Housing", "Consumer", "Family"],
    city: "San Francisco, CA",
    languages: ["English", "Spanish", "Tagalog"],
    phone: "+14155550178",
    cost: "Free or sliding-scale",
    description: "Full-service legal aid nonprofit; income-qualified representation, not just advice.",
  },
  {
    id: "org-3",
    name: "California Workers' Rights Line",
    focus: ["Employment"],
    city: "Statewide, CA",
    languages: ["English", "Spanish", "Mandarin", "Vietnamese"],
    phone: "+18005550199",
    cost: "Free",
    description: "State-funded hotline for wage theft, leave denial, and retaliation questions.",
  },
  {
    id: "org-4",
    name: "Consumer Protection Self-Help Center",
    focus: ["Consumer"],
    city: "San Francisco, CA",
    languages: ["English", "Spanish"],
    phone: "+14155550120",
    cost: "Free",
    description: "Helps prepare small-claims filings for billing disputes and contract issues.",
  },
  {
    id: "org-5",
    name: "Family Justice Resource Center",
    focus: ["Family"],
    city: "San Francisco, CA",
    languages: ["English", "Spanish", "Arabic"],
    phone: "+14155550166",
    cost: "Free or sliding-scale",
    description: "Custody, support, and separation guidance, plus court-navigation appointments.",
  },
];
