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
  GraduationCap,
  Calendar
 } from "lucide-react";

/* -------------------- Simple Card wrapper -------------------- */
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-2xl border shadow-sm bg-white p-6 ${className}`}>
    {children}
  </div>
);

/* Utility to print current modal content and name the PDF */
function printWithTitle(title: string) {
  const prev = document.title;
  document.title = title;
  window.print();
  // reset title shortly after print dialog opens
  setTimeout(() => (document.title = prev), 1200);
}

/* -------------------- Modals -------------------- */
const AwsCostModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;
  const handlePrint = () =>
    printWithTitle("AWS-Cost-Optimization-Case-Study");
  return (
    // NOTE: add "print-area" to the overlay container
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto print-area">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">
            AWS Cost Optimization — 30% Savings Case Study
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 text-slate-700">
          <p>
            <strong>Summary:</strong> Reduced monthly AWS spend ~30% without
            downtime by right-sizing compute, adopting Savings Plans, moving
            storage to cheaper tiers, and optimizing CDN/data transfer. Built
            visibility with CUR→Athena→QuickSight, Budgets, and anomaly alerts.
          </p>

          <div>
            <h4 className="font-semibold">Environment</h4>
            <ul className="list-disc ml-6">
              <li>
                Multi-account (dev/test/prod); EC2/ECS, Lambda, RDS, S3,
                CloudFront
              </li>
              <li>
                Tooling: Cost Explorer, Compute Optimizer, Trusted Advisor,
                CUR→Athena/QuickSight, Terraform
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Key Actions</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Compute:</strong> Right-size + Graviton; Savings Plans;
                Spot & autoscaling; off-hours shutdown for dev/test.
              </li>
              <li>
                <strong>Storage:</strong> EBS gp2→gp3; S3 Intelligent-Tiering +
                lifecycle to Glacier; snapshot/AMI cleanup.
              </li>
              <li>
                <strong>Databases:</strong> Right-size RDS; reserved capacity;
                tune connections/indexes.
              </li>
              <li>
                <strong>Network/CDN:</strong> CloudFront caching, compression,
                Origin Shield; VPC endpoints to reduce NAT.
              </li>
              <li>
                <strong>Governance:</strong> Mandatory tagging; Budgets +
                Anomaly Detection; EventBridge cleanups.
              </li>
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
                  <tr>
                    <td className="border px-3 py-2">Compute (EC2/ECS)</td>
                    <td className="border px-3 py-2 text-right">$50,000</td>
                    <td className="border px-3 py-2 text-right">$34,000</td>
                    <td className="border px-3 py-2 text-right">$16,000</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Storage (S3/EBS)</td>
                    <td className="border px-3 py-2 text-right">$20,000</td>
                    <td className="border px-3 py-2 text-right">$13,000</td>
                    <td className="border px-3 py-2 text-right">$7,000</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Databases (RDS)</td>
                    <td className="border px-3 py-2 text-right">$15,000</td>
                    <td className="border px-3 py-2 text-right">$11,000</td>
                    <td className="border px-3 py-2 text-right">$4,000</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Data Transfer/CDN</td>
                    <td className="border px-3 py-2 text-right">$10,000</td>
                    <td className="border px-3 py-2 text-right">$7,000</td>
                    <td className="border px-3 py-2 text-right">$3,000</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="border px-3 py-2">Total</td>
                    <td className="border px-3 py-2 text-right">$100,000</td>
                    <td className="border px-3 py-2 text-right">$70,000</td>
                    <td className="border px-3 py-2 text-right">
                      $30,000 (30%)
                    </td>
                  </tr>
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

const TimesheetModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;
  const handlePrint = () => printWithTitle("Serverless-Timesheet-API");
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto print-area">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">
            Serverless Timesheet API — Architecture & Details
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 text-slate-700">
          <p>
            <strong>Summary:</strong> A fully serverless timesheet backend using
            API Gateway + Lambda + DynamoDB + S3. Auth via JWT (API Gateway
            authorizer). IaC + CI/CD deliver fast, zero-downtime deploys.
          </p>

          <div>
            <h4 className="font-semibold">Architecture</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>API:</strong> Amazon API Gateway (HTTP API) routes →
                Lambda functions
              </li>
              <li>
                <strong>Compute:</strong> AWS Lambda (Node.js/TypeScript)
              </li>
              <li>
                <strong>Data:</strong> DynamoDB table <code>timesheets</code>{" "}
                (PK: <code>userId</code>, SK: <code>yyyy-mm-dd</code>), GSI for{" "}
                <code>projectId</code>
              </li>
              <li>
                <strong>Storage:</strong> S3 for attachments/exports (
                <code>/exports/{"{month}"}.csv</code>)
              </li>
              <li>
                <strong>Auth:</strong> JWT authorizer (Cognito or custom),
                least-privilege IAM
              </li>
              <li>
                <strong>Observability:</strong> CloudWatch metrics/alarms,
                structured JSON logs, X-Ray tracing
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Key Features</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>CRUD for entries (create, update, list by day/week/month)</li>
              <li>
                Role-based access: users vs admins (project exports,
                corrections)
              </li>
              <li>Input validation (date, hours, project), idempotent writes</li>
              <li>Monthly CSV export to S3 (EventBridge schedule)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">CI/CD</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                GitHub Actions: lint → test → <code>npm run build</code> →
                deploy (SAM/TF)
              </li>
              <li>Blue/green (alias) deployments for zero downtime</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Sample IaC (Terraform)</h4>
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs overflow-x-auto">{`# DynamoDB table
resource "aws_dynamodb_table" "timesheets" {
  name           = "timesheets"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "userId"
  range_key      = "date"
  attribute { name = "userId" type = "S" }
  attribute { name = "date"   type = "S" }
  global_secondary_index {
    name            = "projectId-index"
    hash_key        = "projectId"
    projection_type = "ALL"
  }
}

# Example Lambda (packaging omitted)
resource "aws_lambda_function" "create_entry" {
  function_name = "timesheet-create"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_exec.arn
  filename      = "dist/create_entry.zip"
  environment { variables = { TABLE_NAME = aws_dynamodb_table.timesheets.name } }
}`}</pre>
          </div>

          <div>
            <h4 className="font-semibold">KPIs</h4>
            <ul className="list-disc ml-6">
              <li>P95 latency & Lambda cold starts</li>
              <li>API 4xx/5xx, throttles, retries</li>
              <li>Export job duration & failures</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const IncidentResponseModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;
  const handlePrint = () => printWithTitle("Incident-Response-Automation");
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 overflow-y-auto print-area">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-lg">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-xl font-semibold">
            Incident Response Automation — EventBridge + Lambda + SSM
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5 text-slate-700">
          <p>
            <strong>Summary:</strong> Reduced MTTA/MTTR by automating responses
            to common CloudWatch alarms (disk full, high CPU, unhealthy
            targets). EventBridge routes alerts to Lambda/SSM runbooks for safe
            remediation and notifies Slack/PagerDuty.
          </p>

          <div>
            <h4 className="font-semibold">Architecture</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Signals:</strong> CloudWatch Alarms → EventBridge bus
                (pattern match on alarm name/state)
              </li>
              <li>
                <strong>Orchestration:</strong> EventBridge rules → Lambda
                handlers → SSM Automation runbooks
              </li>
              <li>
                <strong>Actions:</strong> Clear logs/tmp, recycle stuck
                services, scale out ASG, deregister bad targets
              </li>
              <li>
                <strong>Notify:</strong> Slack/PagerDuty webhooks with
                correlation IDs & remediation summary
              </li>
              <li>
                <strong>Observability:</strong> Structured logs, X-Ray traces,
                dashboards for MTTA/MTTR & recurrence
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Common Playbooks</h4>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <em>EC2 Disk 90%:</em> Free disk (logs/tmp), expand volume
                (gp3), restart app, recheck threshold
              </li>
              <li>
                <em>ALB Unhealthy Targets:</em> Drain/deregister instance,
                trigger new instance, re-run health checks
              </li>
              <li>
                <em>CPU &gt; 85% (15m):</em> ASG step scaling + cache flush;
                rollback if error rates rise
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Sample IaC (Terraform)</h4>
            <pre className="bg-slate-900 text-slate-100 rounded-lg p-3 text-xs overflow-x-auto">{`# EventBridge rule for CloudWatch alarm state changes
resource "aws_cloudwatch_event_rule" "alarm_state_change" {
  name        = "alarm-state-change"
  description = "Route CloudWatch alarm state changes to Lambda"
  event_pattern = jsonencode({
    "source": ["aws.cloudwatch"],
    "detail-type": ["CloudWatch Alarm State Change"],
    "detail": { "state": { "value": ["ALARM"] } }
  })
}

resource "aws_cloudwatch_event_target" "alarm_to_lambda" {
  rule = aws_cloudwatch_event_rule.alarm_state_change.name
  arn  = aws_lambda_function.auto_remediate.arn
}

# Minimal Lambda (runtime/package omitted for brevity)
resource "aws_lambda_function" "auto_remediate" {
  function_name = "auto-remediate"
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  role          = aws_iam_role.lambda_exec.arn
  filename      = "dist/auto_remediate.zip"
  environment { variables = { SLACK_WEBHOOK_URL = var.slack_webhook } }
}

# Example SSM Automation doc skeleton
resource "aws_ssm_document" "clear_logs" {
  name          = "AWSInc-ClearLogsTmp"
  document_type = "Automation"
  content = jsonencode({
    schemaVersion = "0.3"
    description   = "Clear logs/tmp on instance"
    mainSteps = [{
      name = "runCommand"
      action = "aws:runCommand"
      inputs = {
        DocumentName = "AWS-RunShellScript"
        Parameters = { commands = ["sudo rm -rf /var/log/*.gz /tmp/*"] }
      }
    }]
  })
}`}</pre>
          </div>

          <div>
            <h4 className="font-semibold">KPIs & Results</h4>
            <ul className="list-disc ml-6">
              <li>MTTA ↓ from 20m → 4m; MTTR ↓ from 65m → 18m (illustrative)</li>
              <li>30–50% fewer repeat incidents via targeted remediations</li>
              <li>Human-on-call load reduced; consistent, auditable runbooks</li>
            </ul>
          </div>

          <p className="text-sm text-slate-500">
            *Replace example metrics with your actual CloudWatch/incident data
            when ready.
          </p>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Main App -------------------- */
export default function App() {
  const [showAws, setShowAws] = useState(false);
  const [showTimesheet, setShowTimesheet] = useState(false);
  const [showIR, setShowIR] = useState(false);

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
			<a href="#education" className="hover:underline">Education</a>
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
{/* EDUCATION */}
<section id="education" className="max-w-6xl mx-auto px-4 py-14">
  <h2 className="text-3xl font-bold mb-6">Education</h2>

  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <h3 className="font-semibold text-xl flex items-center gap-2">
        <GraduationCap className="h-5 w-5" /> Master of Science — Cloud Computing
      </h3>
      <p className="mt-1 text-slate-600">
        <strong>University:</strong> <span>University Of MarylanGlobal Compass </span><br/>
        <strong>Status:</strong> In progress<br/>
        <strong>Expected Graduation:</strong> May 2026
      </p>
      <ul className="mt-3 list-disc ml-6 text-slate-600 text-sm">
        <li>Focus: AWS, Azure, Serverless, DevOps, FinOps</li>
        <li>Capstone: Cost-aware multi-cloud architecture</li>
      </ul>
    </Card>

    <Card>
      <h3 className="font-semibold text-xl flex items-center gap-2">
        <GraduationCap className="h-5 w-5" /> Bachelor Degree — Computer Science
      </h3>
      <p className="mt-1 text-slate-600">
        <strong>University:</strong> <span>Hilcoe School OF Computer Science and Technology</span><br/>
        
      </p>
      <ul className="mt-3 list-disc ml-6 text-slate-600 text-sm">
        <li>Relevant coursework: Networking, Systems Admin, Databases</li>
        <li>Senior Project: Automated ticketing integrations</li>
      </ul>
    </Card>
  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* AWS Cost Optimization */}
          <Card>
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
          </Card>

          {/* Serverless Timesheet API */}
          <Card>
            <Server className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">Serverless Timesheet API</h4>
            <p className="text-sm text-slate-600 mt-1">
              Lambda + API Gateway + DynamoDB + S3 with CI/CD (GitHub Actions) and IaC.
            </p>
            <button
              onClick={() => setShowTimesheet(true)}
              className="mt-3 inline-flex items-center rounded-2xl border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Read case study
            </button>
          </Card>

          {/* Incident Response Automation */}
          <Card>
            <Activity className="h-8 w-8 mb-3 text-sky-600" />
            <h4 className="font-semibold text-lg">Incident Response Automation</h4>
            <p className="text-sm text-slate-600 mt-1">
              EventBridge + Lambda + SSM runbooks for auto-remediation and Slack/PagerDuty alerts; MTTA/MTTR down significantly.
            </p>
            <button
              onClick={() => setShowIR(true)}
              className="mt-3 inline-flex items-center rounded-2xl border px-3 py-1 text-sm hover:bg-slate-50"
            >
              Read case study
            </button>
          </Card>
        </div>
      </section>

      {/* CASES (optional static section) */}
      <section id="cases" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold mb-6">Case Studies & Write-ups</h2>
        <p className="text-slate-600">
          Click “Read case study” on any project above to view full details.
        </p>
      </section>

      {/* RESUME & CONTACT */}
 {/* RESUME & CONTACT */}
<section id="contact" className="max-w-6xl mx-auto px-4 py-14">
  <h2 className="text-3xl font-bold mb-6">Resume & Contact</h2>

  {/* Resume card */}
  <div className="rounded-2xl border shadow-sm bg-white p-6">
    <h4 className="font-semibold text-lg mb-2">Download Resume</h4>
    <a
      href="/resume.pdf"
      target="_blank"
      rel="noreferrer"
      download
      className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-sky-600 text-white"
      title="Open or Save PDF"
    >
      <FileDown className="h-4 w-4" /> Resume (PDF)
    </a>
    <p className="text-sm text-slate-500 mt-2">
      Tip: keep the filename simple like <code>resume.pdf</code> so the link never breaks.
    </p>
  </div>

  {/* Contact links */}
  <div className="rounded-2xl border shadow-sm bg-white p-6 mt-6">
    <h4 className="font-semibold text-lg mb-2">Contact</h4>
    <ul className="space-y-2">
      <li>
        <a
          href="mailto:netsanet@netbel.solutions?subject=Hello%20Netsanet&body=Hi%20Net%2C%20I%27d%20like%20to%20connect..."
          className="flex items-center gap-2 text-sky-600"
        >
          <Mail className="h-4 w-4" /> netsanet@netbel.solutions
        </a>
      </li>
      <li>
        <a
          href="https://github.com/netbel131"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sky-600"
        >
          <Github className="h-4 w-4" /> github.com/netbel131
        </a>
      </li>
      <li>
        <a
          href="https://linkedin.com/in/your-handle"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-sky-600"
        >
          <Linkedin className="h-4 w-4" /> linkedin.com/in/your-handle
        </a>
      </li>
      <li>
        <a href="tel:301.9685249" className="flex items-center gap-2 text-sky-600">
          {/* you can swap icon if you like; lucide-react also has a Phone icon */}
          📞 (###) ###-####
        </a>
      </li>
    </ul>
  </div>

  {/* Optional: simple contact form (no backend) using FormSubmit */}
  <div className="rounded-2xl border shadow-sm bg-white p-6 mt-6">
    <h4 className="font-semibold text-lg mb-3">Send a message</h4>
    <form
      action="https://formsubmit.co/YOUR_EMAIL_HERE"
      method="POST"
      className="space-y-3"
    >
      {/* FormSubmit options */}
      <input type="hidden" name="_subject" value="Portfolio contact" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://YOUR-DOMAIN/thanks.html" />

      <div className="grid md:grid-cols-2 gap-3">
        <input
          className="w-full rounded-xl border px-3 py-2"
          name="name"
          placeholder="Your name"
          required
        />
        <input
          className="w-full rounded-xl border px-3 py-2"
          type="email"
          name="email"
          placeholder="Your email"
          required
        />
      </div>
      <textarea
        className="w-full rounded-xl border px-3 py-2"
        name="message"
        rows={5}
        placeholder="How can I help?"
        required
      />
      <button
        type="submit"
        className="rounded-2xl border px-4 py-2 text-sm hover:bg-slate-50"
      >
        Send
      </button>
      <p className="text-xs text-slate-500">Powered by formsubmit.co — no backend needed.</p>
    </form>
  </div>
</section>


      {/* Render modals */}
      <AwsCostModal open={showAws} onClose={() => setShowAws(false)} />
      <TimesheetModal open={showTimesheet} onClose={() => setShowTimesheet(false)} />
      <IncidentResponseModal open={showIR} onClose={() => setShowIR(false)} />

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Netsanet (Net). All rights reserved.
      </footer>
    </div>
  );
}
