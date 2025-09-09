import React, { useState } from "react";
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

// -------- Modal component (keep above App) --------
const AwsCostModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">AWS Cost Optimization — 30% Savings Case Study</h3>
          <button onClick={onClose} className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50">Close</button>
        </div>

        <div className="px-6 py-5 space-y-5 text-slate-700">
          <p><strong>Summary:</strong> Reduced monthly AWS spend ~30% without downtime by right-sizing compute, adopting Savings Plans, moving storage to cheaper tiers, and optimizing CDN/data transfer. Built visibility with CUR→Athena→QuickSight, Budgets, and anomaly alerts.</p>

          <div>
            <h4 className="font-semibold">Environment</h4>
            <ul className="list-disc ml-6">
              <li>Multi-account (dev/test/prod); EC2/ECS, Lambda, RDS, S3, CloudFront</li>
              <li>Tooling: Cost Explorer, Compute Optimizer, Trusted Advisor, CUR→Athena/QuickSight, Terraform</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Key Actions</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>Compute:</strong> Right-size + Graviton; Savings Plans; Spot & autoscaling; off-hours shutdown for dev/test.</li>
              <li><strong>Storage:</strong> EBS gp2→gp3; S3 Intelligent-Tiering + lifecycle to Glacier; snapshot/AMI cleanup.</li>
              <li><strong>Databases:</strong> Right-size RDS; reserved capacity; tune connections/indexes.</li>
              <li><strong>Network/CDN:</strong> CloudFront caching, compression, Origin Shield; VPC endpoints to reduce NAT.</li>
              <li><strong>Governance:</strong> Mandatory tagging; Budgets + Anomaly Detection; EventBridge cleanups.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Before vs After (illustrative)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="border px-3 py-2 text-left">Category</th>
                    <th className="border px-3 py-2 text-right">Baseline</th>
                    <th className="border px-3 py-2 text-right">After</th>
                    <th className="border px-3 py-2 text-right">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-2">Compute (EC2/ECS)</td><td className="border px-3 py-2 text-right">$50,000</td><td className="border px-3 py-2 text-right">$34,000</td><td className="border px-3 py-2 text-right">$16,000</td></tr>
                  <tr><td className="border px-3 py-2">Storage (S3/EBS)</td><td className="border px-3 py-2 text-right">$20,000</td><td className="border px-3 py-2 text-right">$13,000</td><td className="border px-3 py-2 text-right">$7,000</td></tr>
                  <tr><td className="border px-3 py-2">Databases (RDS)</td><td className="border px-3 py-2 text-right">$15,000</td><td className="border px-3 py-2 text-right">$11,000</td><td className="border px-3 py-2 text-right">$4,000</td></tr>
                  <tr><td className="border px-3 py-2">Data Transfer/CDN</td><td className="border px-3 py-2 text-right">$10,000</td><td className="border px-3 py-2 text-right">$7,000</td><td className="border px-3 py-2 text-right">$3,000</td></tr>
                  <tr className="font-semibold"><td className="border px-3 py-2">Total</td><td className="border px-3 py-2 text-right">$100,000</td><td className="border px-3 py-2 text-right">$70,000</td><td className="border px-3 py-2 text-right">$30,000 (30%)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">IaC Samples (Terraform)</h4>
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs overflow-x-auto">{`# S3 lifecycle to Glacier
resource "aws_s3_bucket_lifecycle_configuration" "logs" {
  bucket = aws_s3_bucket.logs.id
  rule {
    id     = "logs-to-glacier"
    status = "Enabled"
    filter { prefix = "logs/" }
    transition { days = 30 storage_class = "GLACIER" }
    expiration { days = 365 }
  }
}

# AWS Budget email alert
resource "aws_budgets_budget" "monthly_total" {
  name         = "Monthly-Total"
  budget_type  = "COST"
  limit_amount = "80000"
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator = "GREATER_THAN"
    threshold           = 80
    threshold_type      = "PERCENTAGE"
    notification_type   = "ACTUAL"
    subscriber_email_addresses = ["finops@yourco.com","net@yourco.com"]
  }
}`}</pre>
          </div>

          <div>
            <h4 className="font-semibold">KPIs</h4>
            <ul className="list-disc ml-6">
              <li>Savings Plan coverage & utilization</li>
              <li>Cost by service/app/env (CUR/QuickSight)</li>
              <li>CloudFront cache hit ratio; NAT data egress</li>
              <li>EBS gp3 adoption; S3 Glacier bytes; snapshot counts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------- Main App --------
export default function App() {
  // ✅ Hook must be inside the function, before return:
  const [showAws, setShowAws] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <a href="#home" className="flex items-center gap-2 font-semibold text-lg">
            <Cloud className="h-6 w-6" /> <span>Cloud Support – Portfolio</span>
          </a>
          <div className="hidden sm:flex items-center gap-4">
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#projects" className="hover:underline">Projects</a>
            <a href="#cases" className="hover:underline">Case Studies</a>
            <a href="#contact" className="hover:underline">Contact</a>
            <a href="#resume" className="px-3 py-1 rounded-2xl bg-sky-600 text-white">Resume</a>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl sm:text-5xl font-extrabold">
            Hi, I'm <span className="text-sky-600">Netsanet (Net)</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Cloud Support Engineer focused on reliability, cost optimization, and secure automation
            across AWS & Azure. I build serverless solutions, codify infrastructure with Terraform,
            and resolve production issues end-to-end.
          </p>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Skills & Certifications</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border shadow-sm bg-white p-6">
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
          </div>
          <div className="rounded-2xl border shadow-sm bg-white p-6">
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
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border shadow-sm bg-white p-6">
            <DollarSign className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">AWS Cost Optimization</h4>
            <p className="text-sm text-slate-600 mt-1">
              Cut monthly spend ~30% using RI/Savings Plans, S3 lifecycle, EBS cleanup, CloudFront caching.
            </p>
            <button
              onClick={() => setShowAws(true)}
              className="mt-3 inline-flex items-center rounded-2xl border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Read case study
            </button>
          </div>

          <div className="rounded-2xl border shadow-sm bg-white p-6">
            <Server className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">Serverless Timesheet API</h4>
            <p className="text-sm text-slate-600 mt-1">
              Lambda + API Gateway + DynamoDB + S3 with CI/CD (GitHub Actions) and IaC.
            </p>
          </div>

          <div className="rounded-2xl border shadow-sm bg-white p-6">
            <Activity className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">F5 → Cloud Load Balancer Migration</h4>
            <p className="text-sm text-slate-600 mt-1">
              Migrated 1,000+ VIPs from EOL devices to Viprion & ALB/NLB with SSL offload.
            </p>
          </div>
        </div>
      </section>

      {/* Render modal here */}
      <AwsCostModal open={showAws} onClose={() => setShowAws(false)} />

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Netsanet (Net). All rights reserved.
      </footer>
    </div>
  );
}
