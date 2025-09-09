import React, { useEffect, useMemo, useState } from "react";
import { FaLinkedin, FaGithub, FaUniversity, FaEnvelope, FaPhone } from "react-icons/fa";

// =========================
// Cloud Support Engineer — Showcase Site (App.tsx)
// =========================

// ---------- Profile ----------
const PROFILE = {
  name: "Your Name",
  title: "Cloud Support Engineer | AWS • Azure • DevOps",
  blurb:
    "I keep production systems resilient, observable, and cost-efficient. I troubleshoot incidents, automate fixes, and turn metrics into action.",
  location: "Alexandria, VA",
  email: "you@example.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://www.linkedin.com/in/yourprofile",
  github: "https://github.com/yourhandle",
  resumeUrl: "#", // replace with your resume link
  school: "Your University (Placeholder)",
};

// ---------- Hero KPIs ----------
const METRICS: { label: string; value: string }[] = [
  { label: "MTTR Improvement", value: "↓ 42%" },
  { label: "Monthly Cost Savings", value: "$35K" },
  { label: "Incidents Resolved", value: "500+" },
  { label: "Change Success Rate", value: "99.5%" },
];

// ---------- Projects ----------
type Tag =
  | "All"
  | "AWS"
  | "Azure"
  | "GCP"
  | "Kubernetes"
  | "Terraform"
  | "Observability"
  | "Security";

const TAGS: Tag[] = ["All", "AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Observability", "Security"];

type Project = {
  id: string;
  title: string;
  summary: string;
  outcomes: string[];
  tags: Tag[];
  links?: { label: string; href: string }[];
};

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "24/7 Incident Response Playbooks + Automation",
    summary:
      "Designed runbooks for Sev-1 to Sev-3 with auto-remediation via Lambda and Azure Functions. Integrated PagerDuty + Slack for on-call rotations.",
    outcomes: [
      "Cut MTTR from 85 → 49 minutes",
      "Reduced false alerts by 60% using SLO-based alerting",
      "Automated restarts + cache flush for 12 common failure modes",
    ],
    tags: ["All", "AWS", "Azure", "Observability"],
    links: [
      { label: "Runbook Template (PDF)", href: "#" },
      { label: "Lambda Auto-Fix POC", href: "#" },
    ],
  },
  {
    id: "p2",
    title: "Cost Optimization Dashboard (Athena + QuickSight)",
    summary:
      "Centralized cost & usage insights across accounts. Added anomaly detection and recommendations for RI/Savings Plans.",
    outcomes: [
      "Realized $420K annualized savings",
      "30% EBS snapshot reduction via lifecycle policies",
      "Cross-tag compliance from 62% → 95%",
    ],
    tags: ["All", "AWS"],
    links: [{ label: "Demo Report", href: "#" }],
  },
  {
    id: "p3",
    title: "Observability Overhaul (CloudWatch + Grafana + Prometheus)",
    summary:
      "Unified metrics, logs, and traces. Mapped golden signals to SLOs and piped logs to OpenSearch for fast RCA.",
    outcomes: [
      "99.9% SLO met for user-facing APIs",
      "Query latency P95 reduced from 850ms → 410ms",
      "Playbook MTTK (time to know) ↓ 55%",
    ],
    tags: ["All", "AWS", "Kubernetes", "Observability"],
  },
  {
    id: "p4",
    title: "Blueprint: Serverless Timesheet App (API GW → Lambda → DynamoDB)",
    summary:
      "Reference workload for support runbooks: canary deploys, feature flags, IaC modules, and chaos tests.",
    outcomes: [
      "Zero-downtime blue/green releases",
      "Unit + integration tests in CI",
      "Cost <$50/month at pilot scale",
    ],
    tags: ["All", "AWS", "Terraform"],
    links: [
      { label: "Architecture Diagram", href: "#" },
      { label: "IaC Module", href: "#" },
    ],
  },
  {
    id: "p5",
    title: "AKS Reliability: Pod Disruption Budgets + HPA + Keda",
    summary:
      "Tuned autoscaling and rollouts for a noisy-neighbor SaaS. Hardened ingress and added proactive capacity alerts.",
    outcomes: [
      "Error rate ↓ 70% during deploys",
      "Throughput +28% at peak load",
      "Stabilized PDB-aware maintenance windows",
    ],
    tags: ["All", "Azure", "Kubernetes", "Observability"],
  },
  {
    id: "p6",
    title: "Policy-as-Code Guardrails (OPA + Terraform + Azure Policy)",
    summary:
      "Codified security & cost guardrails. Blocked public S3/Blob, enforced TLS, tagging, and backup policies across envs.",
    outcomes: [
      "Prevented 100% of high-risk misconfigs pre-merge",
      "Drift detection + auto-remediation for 60+ rules",
      "Audit-ready evidence in minutes",
    ],
    tags: ["All", "AWS", "Azure", "Terraform", "Security"],
  },
];

// ---------- Case Studies (with PDF download) ----------
type CaseStudy = {
  id: string;
  customer: string;
  challenge: string;
  approach: string;
  impact: string[];
  pdfUrl?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "c1",
    customer: "Healthcare Analytics (HIPAA)",
    challenge:
      "Nightly ETL jobs overran, breaking 8am SLAs; costs spiking with orphaned EBS snapshots and oversized RDS.",
    approach:
      "Instrumented end-to-end tracing, right-sized RDS with Performance Insights, added snapshot lifecycle & S3 Glacier, created on-call playbooks.",
    impact: [
      "SLA met 99.7% within 3 weeks",
      "Storage spend ↓ 33%",
      "On-call pages/week from 11 → 3",
    ],
    pdfUrl: "/case-studies/case_study_healthcare_hipaa.pdf", // put PDFs in /public/case-studies/
  },
  {
    id: "c2",
    customer: "FinTech Payments",
    challenge:
      "Intermittent latency spikes on checkout API under bursty traffic; blue/green deploys caused brief error storms.",
    approach:
      "Introduced canaries with step-wise traffic, tuned autoscaling policies, optimized connection pooling, and set SLO-driven alerts.",
    impact: [
      "P95 latency ↓ 48%",
      "Zero failed deploys in 90 days",
      "Customer complaints ↓ 72%",
    ],
    pdfUrl: "/case-studies/case_study_fintech_payments.pdf",
  },
];

// ---------- Skills ----------
const SKILLS: string[] = [
  "Incident Management (ITIL)",
  "SRE Practices (SLO/SLA/SLE)",
  "Linux & Networking (TCP/IP, DNS, TLS)",
  "Containers (Docker, K8s)",
  "IaC (Terraform, CloudFormation)",
  "CI/CD (GitHub Actions, Azure DevOps)",
  "Observability (CloudWatch, Grafana, OpenSearch)",
  "Security (KMS, IAM, Secrets Mgmt)",
];

const BADGES: string[] = ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Python", "PowerShell", "Bash", "Git", "Prometheus", "OpenTelemetry"];

const CERTS: string[] = [
  "AWS Solutions Architect – Associate",
  "Azure Administrator Associate (AZ-104)",
  "Kubernetes Administrator (CKA)",
  "ITIL v4 Foundation",
];

// =========================
// ===== Components =========
// =========================
function Section({ id, title, children }: React.PropsWithChildren<{ id?: string; title?: string }>) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h2>
      )}
      {children}
    </section>
  );
}

function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-white/60 backdrop-blur">
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}

function Pill({ text, active, onClick }: { text: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border text-sm transition hover:shadow ${
        active ? "bg-black text-white border-black" : "bg-white text-gray-800"
      }`}
    >
      {text}
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-white/70 backdrop-blur hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 text-gray-700">{p.summary}</p>
      <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-800">
        {p.outcomes.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {p.tags.filter((t) => t !== "All").map((t, i) => (
          <span key={i} className="px-2 py-1 text-xs rounded-full border bg-gray-50">
            {t}
          </span>
        ))}
      </div>
      {p.links && (
        <div className="mt-4 flex flex-wrap gap-3">
          {p.links.map((l, i) => (
            <a key={i} href={l.href} className="text-sm underline hover:no-underline">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseStudy({ c }: { c: CaseStudy }) {
  return (
    <details className="rounded-2xl border p-6 shadow-sm bg-white/70 backdrop-blur">
      <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center">
        <span>{c.customer}</span>
        {c.pdfUrl && (
          <a
            href={c.pdfUrl}
            download
            className="ml-4 text-sm px-3 py-1 rounded-full border hover:bg-gray-100"
          >
            Download PDF
          </a>
        )}
      </summary>
      <div className="mt-3 grid md:grid-cols-3 gap-4">
        <div>
          <div className="text-sm font-semibold">Challenge</div>
          <p className="text-gray-700 mt-1">{c.challenge}</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Approach</div>
          <p className="text-gray-700 mt-1">{c.approach}</p>
        </div>
        <div>
          <div className="text-sm font-semibold">Impact</div>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-800">
            {c.impact.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

// =========================
// ========== App ==========
// =========================
export default function App() {
  const [activeTag, setActiveTag] = useState<Tag>("All");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeTag === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Header / Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-bold tracking-tight">{PROFILE.name}</a>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#case-studies" className="hover:underline">Case Studies</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href={PROFILE.resumeUrl} className="px-3 py-1.5 rounded-full border hover:shadow">Download Résumé</a>
          </nav>
          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
			 title="Menu"
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </header>

      {/* Drawer + Overlay */}
      <div
        className={`fixed inset-0 z-40 transition ${drawerOpen ? "visible" : "invisible"}`}
        onClick={() => setDrawerOpen(false)}
      >
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`} />
      </div>
      <aside
        className={`fixed right-0 top-0 h-full w-72 md:w-96 bg-white z-50 border-l shadow-xl transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <span className="font-semibold">Menu</span>
          <button aria-label="Close navigation" onClick={() => setDrawerOpen(false)} className="p-2 rounded hover:bg-gray-100">✕</button>
        </div>
        <nav className="p-4 flex flex-col gap-3 text-sm">
          <a href="#projects" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Projects</a>
          <a href="#case-studies" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Case Studies</a>
          <a href="#skills" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Skills</a>
          <a href="#contact" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Contact</a>
          <a href={PROFILE.resumeUrl} onClick={() => setDrawerOpen(false)} className="mt-2 px-3 py-2 rounded border text-center">Download Résumé</a>
          <div className="mt-4 text-xs text-gray-500 px-3">{PROFILE.location} • {PROFILE.email}</div>
        </nav>
      </aside>

      {/* Hero */}
      <Section id="home">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{PROFILE.title}</h1>
            <p className="mt-4 text-lg text-gray-700">{PROFILE.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="px-4 py-2 rounded-xl bg-black text-white">View Projects</a>
              <a href={PROFILE.linkedin} className="px-4 py-2 rounded-xl border flex items-center gap-2">
                <FaLinkedin className="text-blue-600" /> LinkedIn
              </a>
              <a href={PROFILE.github} className="px-4 py-2 rounded-xl border flex items-center gap-2">
                <FaGithub className="text-gray-800" /> GitHub
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-600 flex flex-col gap-1">
              <div className="flex items-center gap-2"><FaEnvelope className="text-red-500" /> {PROFILE.email}</div>
              <div className="flex items-center gap-2"><FaPhone className="text-green-600" /> {PROFILE.phone}</div>
              <div>{PROFILE.location}</div>
            </div>
            <div className="mt-2 text-sm text-gray-500 italic flex items-center gap-2">
              <FaUniversity className="text-indigo-600" /> 🎓 Education: {PROFILE.school}
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {METRICS.map((m, i) => (
              <KPI key={i} value={m.value} label={m.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects & Playbooks">
        <div className="flex flex-wrap gap-2 mb-6">
          {TAGS.map((t) => (
            <Pill key={t} text={t} active={activeTag === t} onClick={() => setActiveTag(t)} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </Section>

      {/* Case Studies */}
      <Section id="case-studies" title="Case Studies">
        <div className="grid md:grid-cols-2 gap-6">
          {CASE_STUDIES.map((c) => (
            <CaseStudy key={c.id} c={c} />
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border p-6 bg-white/70 backdrop-blur">
            <h3 className="font-semibold">Core Skills</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SKILLS.map((s, i) => (
                <li key={i} className="text-gray-800">• {s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border p-6 bg-white/70 backdrop-blur">
            <h3 className="font-semibold">Stacks & Platforms</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {BADGES.map((b, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full border bg-gray-50 text-sm">{b}</span>
              ))}
            </div>
            <h3 className="mt-6 font-semibold">Certifications</h3>
            <ul className="mt-3 space-y-1">
              {CERTS.map((c, i) => (
                <li key={i} className="text-gray-800">• {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="rounded-2xl border p-8 bg-white/70 backdrop-blur">
          <p className="text-gray-800">
            Interested in reliability audits, on-call process improvements, or cost optimization workshops? I’m happy to help.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={`mailto:${PROFILE.email}`} className="px-4 py-2 rounded-xl bg-black text-white flex items-center gap-2">
              <FaEnvelope /> Email Me
            </a>
            <a href={PROFILE.resumeUrl} className="px-4 py-2 rounded-xl border">Download Résumé</a>
            <a href={PROFILE.linkedin} className="px-4 py-2 rounded-xl border flex items-center gap-2">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
      </footer>
    </div>
  );
}
