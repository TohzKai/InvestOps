# InvestOps AI

**AI-Native Data Quality Copilot for Private Markets Investment Operations**

---

## Problem Statement

Private markets investment operations teams face significant data quality challenges: inconsistent data formats across sheets, missing mandatory fields, temporal logic errors, and cross-system inconsistencies. Manual review is time-consuming (80% of validation time), error-prone, and creates audit risks. Poor data quality propagates to downstream portfolio monitoring, investor reporting, and regulatory filings.

## Solution Overview

InvestOps AI is a prototype copilot that validates private markets investment data before it enters downstream systems. It applies configurable business rules to detect issues, explains findings in stakeholder-appropriate language, and generates audit-ready documentation.

---

## Key Features

- **Real-time Validation** - 18 validation rules across completeness, format, business logic, and cross-sheet consistency
- **Multi-Stakeholder Explanations** - Tailored views for Investment Operations, Business Analysts, Developers, and QA Testers
- **AI Decision Memo** - Formal recommendation document with business impact, risk analysis, and required actions
- **Test Scenario Generator** - 18 pre-generated test cases covering positive, negative, boundary, and edge cases
- **Business Model Canvas** - Venture positioning and go-to-market overview
- **Responsible AI Guardrails** - Transparency, human oversight, and audit trail preservation

---

## Prototype Flow

1. **Load Sample Data** - Pre-populated with fictional INV-1002 "Jakarta Logistics Platform" containing 4 intentional issues
2. **Run Validation** - Applies 7 validation rules across Investment Master and Quarterly Reporting sheets
3. **View Results** - Dashboard shows KPI cards (Records Checked, Critical/High/Medium Issues, Final Decision)
4. **AI Decision Memo** - Formal recommendation (Reject) with business rationale and next steps
5. **Stakeholder Explanations** - Four audience-specific views of the same issues
6. **Test Scenarios** - Generated validation test cases organized by category
7. **Business Model Canvas** - Venture overview and market positioning
8. **Responsible AI Guardrails** - Ethical considerations and prototype limitations

---

## AI Value Proposition

### AI-Enhanced Decision-Making

InvestOps AI provides consistent, auditable validation decisions that reduce manual review time by 80%. Rule-based logic ensures every submission is evaluated against the same standards, eliminating arbitrary decisions and ensuring regulatory compliance.

### AI-Enhanced Collaboration

Automated stakeholder-specific explanations enable faster cross-functional alignment. Investment Operations sees action items, Business Analysts see data quality metrics, Developers see technical details, and QA Testers see test coverage—all from the same validation run.

### AI-Enhanced Creativity

The system generates comprehensive test scenarios (18 cases across 6 categories) that human teams may overlook. This frees analysts to focus on strategic exception handling while the copilot handles systematic edge case identification.

### Data as a Strategic Asset

Every validation run transforms raw investment data into quality-assured intelligence. The audit trail captures what was validated, what failed, and what must be corrected—building institutional knowledge that improves over time.

---

## Business Model Canvas

| Block | Content |
|-------|---------|
| **Key Partners** | Fund administrators, Custodians, Auditors, Cloud / LLM providers, System integrators, Regulatory advisors |
| **Key Activities** | Data ingestion, Cross-sheet validation, AI decision memos, Stakeholder explanations, Rule maintenance |
| **Key Resources** | Validation rule engine, LLM reasoning layer, Data-quality taxonomy, Audit-log repository |
| **Value Propositions** | Faster data validation, Fewer reporting errors, Stakeholder-specific explanations, Audit-ready evidence, Lower manual QA effort, Bias-aware AI decisions |
| **Customer Relationships** | Enterprise onboarding, Self-service dashboards, Governance reviews, Rule-library support |
| **Channels** | Direct enterprise sales, Ops communities, SI partnerships, Cloud marketplaces, API partners |
| **Customer Segments** | Investment operations, Data governance teams, Fund operations, Compliance teams, Asset managers, Sovereign wealth funds, Private equity firms, Real estate funds, Fund administrators |
| **Cost Structure** | Cloud / LLM usage, Product development, Cybersecurity & compliance, Implementation support, Customer success & sales |
| **Revenue Streams** | Enterprise SaaS subscription, Premium governance / audit modules, API usage fees, Implementation services, Custom rule-library configuration |

---

## Responsible AI Guardrails

| Principle | Description |
|----------|-------------|
| **Fictional Data Only** | All sample data is 100% synthetic. No real company names, client names, or confidential data. |
| **Decision Support** | Provides recommendations, not final decisions. Human operators retain approval authority. |
| **Human Review Required** | Critical and High severity issues require explicit human review before data proceeds. |
| **Transparency** | Rule-based validation with clear explanations. No opaque machine learning models. |
| **Assumptions Documented** | Hidden assumptions (date formats, name matching) and limitations are explicitly shown. |
| **Audit Trail** | Full traceability of all validation runs: inputs, rules applied, issues found, actions taken. |
| **No Real Investment Decisions** | Prototype does not execute, approve, or reject actual investments. |

---

## How to Run Locally

```bash
# Navigate to project directory
cd InvestOps

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173` (or next available port).

---

## Deploy to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_GITHUB_REPO/InvestOps)

1. Click the button above or go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect the Vite configuration
4. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to project
cd InvestOps

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Option 3: Manual Deploy

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure your server to serve the `dist` folder as static files

---

## Vercel Configuration

The project includes `vercel.json` with the correct build settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## Sample Data

The prototype loads fictional sample data for INV-1002 "Jakarta Logistics Platform" containing these intentional issues:

| Issue | Severity | Description |
|-------|----------|-------------|
| Exit Date before Acquisition Date | Critical | 01-Feb-2021 is before 15-Mar-2021 |
| Blank Asset Sector | High | Mandatory field left empty |
| Non-numeric Ownership | High | "around 40 percent" instead of numeric |
| Project Name Mismatch | High | "Jakarta Logistics Platform" vs "Jakarta Logistic Platform" |

**Final Decision: Reject**

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Custom CSS with CSS Variables
- **No Backend**: All validation runs client-side
- **No Database**: Data stays in browser memory

---

## Important Notice

**All data in this prototype is fictional and generated for MBA assignment demonstration purposes only.**

- No real company names or investment details are used
- No actual investment decisions are made
- No external API calls or data transmission
- This is a prototype for educational purposes

---

*InvestOps AI - Prototype for MBA Assignment*
