import React, { useEffect, useMemo, useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaUniversity,
  FaEnvelope,
  FaPhone,
  FaFileDownload,
  FaAws,
  FaCloud,
  FaCogs,
  FaMapMarkerAlt,
  FaShieldAlt, 
} from "react-icons/fa";

// Simple Icons (only Azure here — no DevOps yet)
import { SiMicrosoftazure, SiAzuredevops } from "react-icons/si";


// ---------- Profile ----------
const PROFILE = {
  name: "Netsanet T",
  title: "Cloud Support Engineer | AWS • Azure • DevOps",
  blurb:
    "I keep production systems resilient, observable, and cost-efficient. I troubleshoot incidents, automate fixes, and turn metrics into action.",
  location: "Alexandria, VA",
  email: "netsanet@netbel.solutions",
  phone: "(301) 968 5249",
  linkedin: "https://www.linkedin.com/in/netbel",
  github: "https://github.com/netbel131",
  resumeUrl: "#", // replace with your resume link
  };
// ---------- aboutme ----------
const ABOUT_ME = `
I’m a Cloud & DevOps Engineer with hands-on experience in AWS, Azure, Kubernetes, Terraform, 
and automation tools. I specialize in keeping systems reliable, secure, and cost-efficient 
while streamlining operations with observability and infrastructure as code.

My background has honed my ability to solve problems under pressure, collaborate across teams, 
and deliver scalable cloud solutions. I’m passionate about learning, automation, and creating 
high-performing systems that meet business needs.
`;
	  
// ---------- Education ----------
const EDUCATION = [
  {
    degree: "Master’s in Cloud Computing (In Progress)",
    school: "University of Maryland Global Campus",
    year: "Expected 2026",
  },
  {
    degree: "B.A. in Software Engineering",
    school: "HiLCoE School of Computer Science and Technology ",
    },
];
// ---------- Hero KPIs ----------
const METRICS: { label: string; value: string }[] = [
  { label: "MTTR Improvement", value: "↓ 42%" },
  { label: "Monthly Cost Savings", value: "$35K" },
  { label: "Incidents Resolved", value: "500+" },
  { label: "Change Success Rate", value: "99.5%" },
];
// ---------- certs ----------
  const CERTS = [
  {
    name: "AWS Solutions Architect – Associate",
    icon: (
      <a
        href="https://www.credly.com/badges/b4b654da-b465-4a24-8de9-a516cae39634/linked_in?t=srjwdj"
        target="_blank"
        rel="noopener noreferrer"
        title="Click to verify on Credly"
      >
        <FaAws className="text-orange-500 text-xl hover:scale-110 transition-transform" />
      </a>
    ),
  },
  {
  name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
  icon: (
    <a
      href="https://learn.microsoft.com/api/credentials/share/en-us/NetsanetTirfea-3017/45E4D4877961C0E1?sharingId=8571916607DB183E"
      target="_blank"
      rel="noopener noreferrer"
      title="Click to verify on Microsoft"
    >
      <FaCloud className="text-blue-600 text-xl hover:scale-110 transition-transform" />
    </a>
  ),
},
{
  name: "VMware Certified Professional – Data Center Virtualization (VCP-DCV)",
  icon: (
    <a
      href="https://www.credly.com/badges/eb9ab32f-db8e-4891-bdc8-9dced9f3dedc/public_url" // 🔗 replace with your actual Credly/VMware badge link
      target="_blank"
      rel="noopener noreferrer"
      title="Click to verify on Credly"
    >
      <img
        src="https://1000logos.net/wp-content/uploads/2020/09/VMware-Logo.png"
        alt="VMware"
        className="w-12 h-auto"
      />
    </a>
  ),
},

  
  {
    name: "CompTIA Security+",
    icon: (
      <a
        href="https://www.credly.com/badges/c9e478cf-6301-4c85-8343-e0b58003c30d/public_url"
        target="_blank"
        rel="noopener noreferrer"
        title="Click to verify on Credly"
      >
        <FaShieldAlt className="text-red-600 text-xl hover:scale-110 transition-transform" />
      </a>
    ),
  },
];

// ---------- Academic Projects ----------
type AcademicProject = {
  id: string;
  title: string;
  summary: string;
  outcomes?: string[];
};

const ACADEMIC_PROJECTS: AcademicProject[] = [
  {
    id: "a1",
    title: "Cloud Transformation Analysis",
    summary:
      "Evaluated migration strategies for a mid-sized enterprise, including cost modeling, security controls, and compliance alignment.",
    outcomes: [
      "Applied NIST cloud definitions",
      "Produced ROI report and TCO analysis",
      "Mapped IAM roles to CIS Controls",
    ],
  },
  {
    id: "a2",
    title: "Serverless Timesheet System",
    summary:
      "Designed a serverless employee timesheet system with AWS Lambda, API Gateway, DynamoDB, and S3.",
    outcomes: [
      "Built IaC with Terraform",
      "Integrated monitoring with CloudWatch",
      "Performed cost optimization testing",
    ],
  },
  {
    id: "a3",
    title: "Cloud Cost Optimization Plan",
    summary:
      "Developed a structured cost optimization strategy across AWS services, focusing on compute, storage, and networking.",
    outcomes: [
      "Assessed cloud usage and identified cost drivers",
      "Applied rightsizing, lifecycle policies, and reserved capacity",
      "Achieved ~35% monthly savings with improved governance",
    ],
  },
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

// ---------- Case Studies ----------
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
    pdfUrl: "/case-studies/case_study_healthcare_hipaa.pdf",
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
// ---------- UI Helpers ----------
function Section({ id, title, children }: React.PropsWithChildren<{ id?: string; title?: string }>) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {title && <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{title}</h2>}
      {children}
    </section>
  );
}

function ProjectCard({ p }: { p: { title: string; summary: string; outcomes?: string[] } }) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-white/70 backdrop-blur hover:shadow-md transition">
      <h3 className="text-xl font-semibold">{p.title}</h3>
      <p className="mt-2 text-gray-700">{p.summary}</p>
      {p.outcomes && (
        <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-800">
          {p.outcomes.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CaseStudyCard({ c }: { c: CaseStudy }) {
  return (
    <details className="rounded-2xl border p-6 shadow-sm bg-white/70 backdrop-blur">
      <summary className="cursor-pointer text-lg font-semibold flex justify-between items-center">
        <span>{c.customer}</span>
        {c.pdfUrl && (
          <a href={c.pdfUrl} download className="ml-4 text-sm px-3 py-1 rounded-full border hover:bg-gray-100">
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
function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border p-6 shadow-sm bg-white/60 backdrop-blur">
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  );
}

// ---------- App ----------
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900">
      {/* Header with small Resume + short title + Hamburger */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left: Resume + Name + Short Title */}
          <div className="flex items-center gap-3">
           <a
  href={PROFILE.resumeUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="px-3 py-1.5 rounded-full border hover:shadow flex items-center gap-2"
>
  <FaFileDownload className="text-gray-700" />
  Download Resume
</a>
            <div className="flex flex-col">
              <a href="#home" className="font-bold tracking-tight">{PROFILE.name}</a>
              <span className="text-xs text-gray-600">Cloud Support Engineer</span>
            </div>
          </div>

          {/* Right: Hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2 rounded-lg bg-white shadow-md hover:shadow-lg group"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            title="Menu"
          >
            <span className="w-6 h-0.5 bg-gray-800 group-hover:bg-blue-600"></span>
            <span className="w-6 h-0.5 bg-gray-800 group-hover:bg-blue-600"></span>
            <span className="w-6 h-0.5 bg-gray-800 group-hover:bg-blue-600"></span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition ${drawerOpen ? "visible" : "invisible"}`}
        onClick={() => setDrawerOpen(false)}
      >
        <div className={`absolute inset-0 bg-black/30 transition-opacity ${drawerOpen ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Drawer (ALL navigation) */}
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
          <a href="#academic-projects" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Academic Projects</a>
          <a href="#skills" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Skills</a>
          <a href="#contact" onClick={() => setDrawerOpen(false)} className="px-3 py-2 rounded hover:bg-gray-50">Contact</a>
          <a
  href="#about"
  onClick={() => setDrawerOpen(false)}
  className="px-3 py-2 rounded hover:bg-gray-50"
>
  About Me
</a>
<a
            href={PROFILE.resumeUrl}
            onClick={() => setDrawerOpen(false)}
            className="mt-2 px-3 py-2 rounded border text-center flex items-center gap-2 justify-center"
          >
            <FaFileDownload className="text-gray-700" /> Resume
          </a>
          
        </nav>
      </aside>

      {/* Hero */}
     <Section id="home">
  <div className="rounded-2xl border bg-white/80 backdrop-blur p-8 shadow-lg">
    <div className="grid md:grid-cols-5 gap-8 items-center">
      <div className="md:col-span-3">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Cloud Support Engineer
          <br />
          <span className="mt-2 flex justify-center md:justify-start items-center gap-6 text-2xl md:text-3xl text-gray-700">
            <FaAws title="AWS" className="text-orange-500" />
            <FaCloud title="Azure" className="text-blue-600" />
            <FaCogs title="DevOps" className="text-indigo-600" />
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-700">{PROFILE.blurb}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#projects" className="px-4 py-2 rounded-xl bg-black text-white">View Projects</a>
          <a href={PROFILE.linkedin} className="px-4 py-2 rounded-xl border">LinkedIn</a>
          <a href={PROFILE.github} className="px-4 py-2 rounded-xl border">GitHub</a>
        </div>

<div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-600">
  <div className="flex items-center gap-2">
    <FaMapMarkerAlt className="text-red-500" />
    <span>{PROFILE.location}</span>
  </div>
  <div className="flex items-center gap-2">
    <FaEnvelope className="text-blue-500" />
    <a href={`mailto:${PROFILE.email}`} className="hover:underline">{PROFILE.email}</a>
  </div>
  <div className="flex items-center gap-2">
    <FaPhone className="text-green-500" />
    <a href={`tel:${PROFILE.phone}`} className="hover:underline">{PROFILE.phone}</a>
  </div>
</div>

      </div>

      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        {METRICS.map((m, i) => (
          <KPI key={i} value={m.value} label={m.label} />
        ))}
      </div>
    </div>
  </div>
</Section>
{/* about */}
{/* ---------- About Me ---------- */}
<Section id="about" title="About Me">
   <div className="rounded-2xl border p-6 bg-white/70 backdrop-blur">
    <p className="text-gray-700 leading-relaxed">
      I bring over <span className="font-semibold">15 years of IT experience</span>, beginning my career 
      as a <span className="font-medium">Network and Systems Engineer</span> working with Cisco, VMware and  
      Windows environments. In that role, I gained strong foundations in infrastructure, 
      troubleshooting, and keeping mission-critical systems resilient.
    </p>
    <p className="text-gray-700 leading-relaxed mt-4">
      Over time, I made a deliberate <span className="font-semibold">transition into Cloud & DevOps</span>, 
      building on my background to embrace AWS, Azure, Kubernetes, Terraform, and automation practices. 
      This journey has allowed me to bridge legacy IT with modern cloud architectures, bringing both 
      depth of operational knowledge and agility in new technologies.
    </p>
    <p className="text-gray-700 leading-relaxed mt-4">
      Today, I specialize in <span className="font-medium">cloud support engineering</span> — improving 
      reliability, optimizing costs, and automating workflows. My goal is to apply both my traditional 
      infrastructure expertise and cloud skillset to help organizations scale securely and efficiently.
    </p>

    {/* Highlights in two columns */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-semibold text-gray-900">What I Do</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-800">
          <li>Incident response playbooks (Sev-1→Sev-3) with auto-remediation</li>
          <li>Observability: metrics, logs, traces mapped to SLOs</li>
          <li>Cost optimization: rightsizing, storage lifecycle, reserved capacity</li>
          <li>Infrastructure as Code with Terraform & pipelines</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">How I Work</h3>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-800">
          <li>Root-cause mindset, calm under pressure</li>
          <li>Clear documentation and handoffs</li>
          <li>Security-first guardrails and policy-as-code</li>
          <li>Continuous learning & incremental improvements</li>
        </ul>
      </div>
    </div>

    {/* Tech “chips” */}
    <div className="mt-6">
      <h3 className="font-semibold text-gray-900">Tooling I Use</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {[
          "AWS", "Azure", "Kubernetes", "Terraform",
          "CloudWatch", "Grafana", "OpenSearch",
          "GitHub Actions", "Azure DevOps", "Python", "Bash"
        ].map((t) => (
          <span key={t} className="px-3 py-1.5 rounded-full border bg-gray-50 text-sm text-gray-700">
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
</Section>

{/* education */}
<Section id="education" title="Education">
  <div className="rounded-2xl border p-6 bg-white/70 backdrop-blur">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {EDUCATION.map((edu, i) => (
        <div key={i} className="flex items-start gap-3">
          <FaUniversity className="text-indigo-600 text-xl mt-1" />
          <div className="flex flex-col">
            <div className="font-semibold">{edu.degree}</div>
            <div className="text-gray-700">{edu.school}</div>
            <div className="text-sm text-gray-500">{edu.year}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</Section>

	  {/* certs */}
<Section id="skills" title="Certifications">
  <div className="rounded-2xl border p-6 bg-white/70 backdrop-blur">
    <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
      {CERTS.map((c, i) => (
        <li key={i} className="flex items-center gap-2 text-gray-800">
          {c.icon}
          <span>{c.name}</span>
        </li>
      ))}
    </ul>
  </div>
</Section>
      {/* Projects */}
      <Section id="projects" title="Projects & Playbooks">
        <div className="flex flex-wrap gap-2 mb-6">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2 rounded-full border text-sm transition hover:shadow ${
                activeTag === t ? "bg-black text-white border-black" : "bg-white text-gray-800"
              }`}
            >
              {t}
            </button>
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
            <CaseStudyCard key={c.id} c={c} />
          ))}
        </div>
      </Section>

      {/* Academic Projects */}
      <Section id="academic-projects" title="Academic Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {ACADEMIC_PROJECTS.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </Section>
	  
      {/* Footer */}
      <footer className="mt-12 border-t pt-6 text-center text-sm text-gray-600">
  <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
  <p className="mt-2">
    Built with <span className="font-semibold">React & Tailwind CSS</span>
  </p>
</footer>
    </div>
  );
}
