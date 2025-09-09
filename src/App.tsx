import React from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Cpu,
  ShieldCheck,
  Github,
  Linkedin,
  Mail,
  FileDown,
  DollarSign,
  Server,
  Activity,
} from "lucide-react";

// Simple Card replacement
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl border shadow-sm bg-white p-6 ${className}`}
  >
    {children}
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a
            href="#home"
            className="flex items-center gap-2 font-semibold text-lg"
          >
            <Cloud className="h-6 w-6" />{" "}
            <span>Cloud Support – Portfolio</span>
          </a>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#skills" className="hover:underline">
              Skills
            </a>
            <a href="#projects" className="hover:underline">
              Projects
            </a>
            <a href="#cases" className="hover:underline">
              Case Studies
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
            <a
              href="#resume"
              className="px-3 py-1 rounded-2xl bg-sky-600 text-white"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Hi, I'm <span className="text-sky-600">Netsanet (Net)</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Cloud Support Engineer focused on reliability, cost
            optimization, and secure automation across AWS & Azure. I
            build serverless solutions, codify infrastructure with
            Terraform, and resolve production issues end-to-end.
          </p>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">
          Skills & Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-xl flex items-center gap-2">
              <Cpu className="h-5 w-5" /> Cloud & DevOps
            </h3>
            <ul className="mt-3 list-disc ml-6 text-slate-600">
              <li>AWS (EC2, S3, RDS, Lambda)</li>
              <li>Azure (VMs, Functions, App Service)</li>
              <li>Containers (EKS, AKS)</li>
              <li>CI/CD (GitHub Actions)</li>
              <li>Terraform & IaC</li>
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold text-xl flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Security & Ops
            </h3>
            <ul className="mt-3 list-disc ml-6 text-slate-600">
              <li>IAM · RBAC/ABAC</li>
              <li>KMS · Key Vault</li>
              <li>Monitoring: CloudWatch, Azure Monitor</li>
              <li>Logging: ELK stack</li>
              <li>Compliance: CIS · HIPAA (scenario)</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <DollarSign className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">
              AWS Cost Optimization
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Cut monthly spend ~30% using RI/Savings Plans, S3 lifecycle,
              EBS cleanup, CloudFront caching.
            </p>
          </Card>
          <Card>
            <Server className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">
              Serverless Timesheet API
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Lambda + API Gateway + DynamoDB + S3 with CI/CD (GitHub
              Actions) and IaC.
            </p>
          </Card>
          <Card>
            <Activity className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">
              F5 → Cloud Load Balancer Migration
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              Migrated 1,000+ VIPs from EOL devices to Viprion & ALB/NLB
              with SSL offload.
            </p>
          </Card>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">
          Case Studies & Write-ups
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h4 className="font-semibold text-lg">
              Incident: 500 Errors on API Gateway
            </h4>
            <p className="text-sm text-slate-600 mt-2">
              Root cause: exhausted DB connections. Fixed with RDS tuning,
              Lambda concurrency limits, and retries.
            </p>
          </Card>
          <Card>
            <h4 className="font-semibold text-lg">
              Cost Spike: S3 & Data Transfer
            </h4>
            <p className="text-sm text-slate-600 mt-2">
              Solved by enabling Intelligent-Tiering, CloudFront caching,
              and lifecycle policies. Saved 32%.
            </p>
          </Card>
        </div>
      </section>

      {/* RESUME & CONTACT */}
      <section id="resume" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Resume & Contact</h2>
        <Card>
          <h4 className="font-semibold text-lg mb-2">
            Download Resume
          </h4>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-sky-600 text-white"
          >
            <FileDown className="h-4 w-4" /> Resume (PDF)
          </a>
        </Card>
        <Card className="mt-6">
          <h4 className="font-semibold text-lg mb-2">Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/your-handle"
                target="_blank"
                className="flex items-center gap-2 text-sky-600"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/your-handle"
                target="_blank"
                className="flex items-center gap-2 text-sky-600"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href="mailto:you@example.com"
                className="flex items-center gap-2 text-sky-600"
              >
                <Mail className="h-4 w-4" /> you@example.com
              </a>
            </li>
          </ul>
        </Card>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Netsanet (Net). All rights reserved.
      </footer>
    </div>
  );
}
