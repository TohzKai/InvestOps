import { useState } from 'react';
import './App.css';
import type {
  InvestmentMaster,
  ValidationResult,
} from './data';
import {
  mockInvestmentMaster,
  mockQuarterlyReporting,
  runValidation,
  businessModelCanvas,
  testScenarios,
  responsibleAIGuardrails,
} from './data';

type ActiveSection = 'overview' | 'dashboard' | 'dataInput' | 'validation' | 'memo' | 'stakeholder' | 'test' | 'canvas' | 'capabilities' | 'guardrails';

const SCREEN_LABELS: Record<ActiveSection, string> = {
  overview: 'Prototype Screen 1: Venture Overview',
  dashboard: 'Prototype Screen 2: Dashboard',
  dataInput: 'Prototype Screen 3: Data Input',
  validation: 'Prototype Screen 4: Validation Results',
  memo: 'Prototype Screen 5: AI Decision Memo',
  stakeholder: 'Prototype Screen 6: Stakeholder Explanation',
  test: 'Prototype Screen 7: Test Scenario Generator',
  canvas: 'Prototype Screen 8: Business Model Canvas',
  capabilities: 'Prototype Screen 9: AI Capabilities',
  guardrails: 'Prototype Screen 10: Responsible AI Guardrails',
};

const SAMPLE_DATA_TEXT = `Sheet A: Investment Master
Project ID: INV-1002
Project Name: Jakarta Logistics Platform
Asset Class: Real Estate
Asset Sector:
Ownership Percentage: around 40 percent
Acquisition Date: 15-Mar-2021
Exit Date: 01-Feb-2021
Valuation Amount: 85000000
Currency: USD

Sheet B: Quarterly Reporting
Project ID: INV-1002
Project Name: Jakarta Logistic Platform
Reported Valuation: 85000000
Currency: USD`;

const AI_CAPABILITIES = [
  {
    icon: '🎯',
    title: 'AI-Enhanced Decision-Making',
    description: 'Rule-based validation engine provides consistent, auditable decisions. Reduces manual review time by 80% while ensuring all business rules are applied uniformly across every submission.',
  },
  {
    icon: '🤝',
    title: 'AI-Enhanced Collaboration',
    description: 'Automated stakeholder-specific explanations enable faster cross-functional alignment. Each team member receives contextually relevant insights without manual summarization.',
  },
  {
    icon: '💡',
    title: 'AI-Enhanced Creativity',
    description: 'Generates comprehensive test scenarios and edge case identification that human teams may overlook. Frees analysts to focus on strategic exception handling.',
  },
  {
    icon: '📊',
    title: 'Data as a Strategic Asset',
    description: 'Transforms raw investment data into quality-assured intelligence. Every validation creates an audit trail that improves downstream reporting accuracy and investor confidence.',
  },
  {
    icon: '🛡️',
    title: 'Responsible AI',
    description: 'Built on transparency, fairness, and human oversight principles. All decisions are explainable, traceable, and subject to human review before final action.',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [investmentMaster, setInvestmentMaster] = useState<InvestmentMaster>(mockInvestmentMaster);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [hasRunValidation, setHasRunValidation] = useState(false);
  const [rawDataText, setRawDataText] = useState('');

  const navItems: { id: ActiveSection; label: string }[] = [
    { id: 'overview', label: 'Venture' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'dataInput', label: 'Data Input' },
    { id: 'validation', label: 'Results' },
    { id: 'memo', label: 'Memo' },
    { id: 'stakeholder', label: 'Stakeholders' },
    { id: 'test', label: 'Tests' },
    { id: 'canvas', label: 'Canvas' },
    { id: 'capabilities', label: 'AI Value' },
    { id: 'guardrails', label: 'Guardrails' },
  ];

  const handleRunValidation = () => {
    setIsValidating(true);
    setTimeout(() => {
      const result = runValidation(mockInvestmentMaster, mockQuarterlyReporting);
      setValidationResult(result);
      setInvestmentMaster(mockInvestmentMaster);
      setHasRunValidation(true);
      setIsValidating(false);
      setActiveSection('validation');
    }, 1500);
  };

  const handleLoadSampleData = () => {
    setRawDataText(SAMPLE_DATA_TEXT);
    setInvestmentMaster(mockInvestmentMaster);
  };

  const handleResetData = () => {
    setRawDataText('');
    setInvestmentMaster({
      projectId: '',
      projectName: '',
      assetClass: '',
      assetSector: '',
      ownershipPercentage: '',
      acquisitionDate: '',
      exitDate: '',
      valuationAmount: '',
      currency: '',
    });
    setValidationResult(null);
    setHasRunValidation(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'severity-critical';
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      case 'Low': return 'severity-low';
      default: return '';
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'Accept': return 'decision-accept';
      case 'Accept with Warning': return 'decision-warning';
      case 'Conditional Accept': return 'decision-conditional';
      case 'Reject': return 'decision-reject';
      default: return '';
    }
  };

  const criticalCount = validationResult?.issues.filter(i => i.severity === 'Critical').length || 0;
  const highCount = validationResult?.issues.filter(i => i.severity === 'High').length || 0;
  const mediumCount = validationResult?.issues.filter(i => i.severity === 'Medium').length || 0;

  const renderOverview = () => (
    <div className="section">
      <div className="hero-section">
        <div className="hero-badge">AI-Native Data Quality Copilot</div>
        <h1 className="hero-title">InvestOps AI</h1>
        <p className="hero-subtitle">Private Markets Investment Operations</p>
        <p className="hero-description">
          Validate private markets data before it enters downstream reporting or portfolio monitoring systems.
          Our AI copilot ensures data quality, consistency, and compliance — reducing manual review by 80%.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => setActiveSection('dashboard')}>
            View Dashboard
          </button>
          <button className="btn btn-outline-white btn-lg" onClick={() => setActiveSection('capabilities')}>
            AI Capabilities
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>Real-time Validation</h3>
          <p>Instant data quality checks against 47+ business rules and compliance standards.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Multi-sheet Analysis</h3>
          <p>Cross-reference data across investment master and quarterly reporting sheets.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Stakeholder Reports</h3>
          <p>Tailored explanations for operations, analysts, developers, and QA teams.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>AI Guardrails</h3>
          <p>Responsible AI principles ensuring transparency, fairness, and human oversight.</p>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">47</div>
          <div className="stat-label">Validation Rules</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">5</div>
          <div className="stat-label">Asset Classes</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">4</div>
          <div className="stat-label">Stakeholder Views</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">80%</div>
          <div className="stat-label">Time Saved</div>
        </div>
      </div>

      <div className="screen-label">{SCREEN_LABELS.overview}</div>
    </div>
  );

  const renderDashboard = () => {
    const result = validationResult || { issues: [], decision: 'Pending' as const };
    return (
      <div className="section">
        <div className="section-header">
          <h1>Validation Dashboard</h1>
          <p>Real-time data quality metrics and validation status</p>
        </div>

        <div className="screen-label">{SCREEN_LABELS.dashboard}</div>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-icon">📁</div>
            <div className="kpi-content">
              <div className="kpi-value">{hasRunValidation ? '1' : '0'}</div>
              <div className="kpi-label">Records Checked</div>
            </div>
          </div>
          <div className={`kpi-card ${criticalCount > 0 ? 'kpi-critical' : 'kpi-ok'}`}>
            <div className="kpi-icon">🔴</div>
            <div className="kpi-content">
              <div className="kpi-value">{criticalCount}</div>
              <div className="kpi-label">Critical Issues</div>
            </div>
          </div>
          <div className={`kpi-card ${highCount > 0 ? 'kpi-high' : 'kpi-ok'}`}>
            <div className="kpi-icon">🟠</div>
            <div className="kpi-content">
              <div className="kpi-value">{highCount}</div>
              <div className="kpi-label">High Issues</div>
            </div>
          </div>
          <div className="kpi-card">
            <div className="kpi-icon">🟡</div>
            <div className="kpi-content">
              <div className="kpi-value">{mediumCount}</div>
              <div className="kpi-label">Medium Issues</div>
            </div>
          </div>
          <div className={`kpi-card kpi-decision ${getDecisionColor(result.decision)}`}>
            <div className="kpi-icon">⚖️</div>
            <div className="kpi-content">
              <div className="kpi-value kpi-decision-text">{result.decision}</div>
              <div className="kpi-label">Final Decision</div>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="decision-hero-card">
            <div className="decision-hero-header">
              <span className="decision-hero-label">Final Decision</span>
              <div className={`decision-hero-badge ${getDecisionColor(result.decision)}`}>
                {result.decision}
              </div>
            </div>
            <div className="decision-hero-body">
              <h3>Business Rationale</h3>
              {result.decision === 'Reject' && (
                <p>Record contains {criticalCount} Critical and {highCount} High severity issues that must be resolved before processing. Exit Date logic error and missing mandatory fields require immediate correction.</p>
              )}
              {result.decision === 'Conditional Accept' && (
                <p>Record contains {highCount} High severity issues requiring resolution or documented justification before proceeding.</p>
              )}
              {result.decision === 'Accept with Warning' && (
                <p>Record contains {mediumCount} Medium severity issues that should be noted for follow-up review.</p>
              )}
              {result.decision === 'Accept' && (
                <p>Record passes all validation checks and is approved for downstream processing.</p>
              )}
            </div>
            <div className="decision-hero-footer">
              <span className="decision-meta">Project: {investmentMaster.projectId}</span>
              <span className="decision-meta">Issues: {result.issues.length}</span>
              <span className="decision-meta">Critical: {criticalCount}</span>
              <span className="decision-meta">High: {highCount}</span>
            </div>
          </div>

          <div className="card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="btn btn-outline" onClick={handleLoadSampleData}>
                Load Sample Data
              </button>
              <button className="btn btn-outline" onClick={() => setActiveSection('dataInput')}>
                Edit Data
              </button>
              <button className="btn btn-outline" onClick={() => setActiveSection('validation')}>
                View Issues
              </button>
              <button className="btn btn-outline" onClick={() => setActiveSection('memo')}>
                View Memo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDataInput = () => (
    <div className="section">
      <div className="section-header">
        <h1>Data Input</h1>
        <p>Paste investment data extract or load sample data, then run validation</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.dataInput}</div>

      <div className="data-input-container">
        <div className="data-actions">
          <button className="btn btn-primary" onClick={handleLoadSampleData}>
            Load Sample Data
          </button>
          <button className="btn btn-secondary" onClick={handleResetData}>
            Clear Data
          </button>
          <button className="btn btn-success" onClick={handleRunValidation} disabled={isValidating}>
            {isValidating ? 'Validating...' : 'Run Validation'}
          </button>
        </div>

        {!hasRunValidation ? (
          <div className="data-empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No validation has been run yet</h3>
            <p>Load sample data or paste a file extract, then run validation.</p>
            <div className="sample-hint">
              <strong>Sample Data Contains:</strong>
              <ul>
                <li>Investment Master sheet (9 fields)</li>
                <li>Quarterly Reporting sheet (4 fields)</li>
                <li>Expected: 1 Critical + 3 High issues → Reject</li>
              </ul>
            </div>
          </div>
        ) : null}

        {rawDataText && (
          <div className="data-textarea-container">
            <label>Data Extract</label>
            <textarea
              className="data-textarea"
              value={rawDataText}
              onChange={(e) => setRawDataText(e.target.value)}
              placeholder="Paste your investment data here or click 'Load Sample Data'"
              rows={16}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderValidationResults = () => {
    const result = validationResult || { issues: [], decision: 'Pending' as const };
    return (
      <div className="section">
        <div className="section-header">
          <h1>Validation Results</h1>
          <p>Data quality issues identified in the submitted investment data</p>
        </div>

        <div className="screen-label">{SCREEN_LABELS.validation}</div>

        <div className="validation-header">
          <div className={`decision-badge large ${getDecisionColor(result.decision)}`}>
            {result.decision}
          </div>
          <div className="validation-meta">
            <p><strong>Total Issues:</strong> {result.issues.length}</p>
            <p><strong>Project:</strong> {investmentMaster.projectId} - {investmentMaster.projectName}</p>
          </div>
        </div>

        <div className="severity-summary">
          <div className="severity-item critical">
            <span className="severity-count">{criticalCount}</span>
            <span className="severity-label">Critical</span>
          </div>
          <div className="severity-item high">
            <span className="severity-count">{highCount}</span>
            <span className="severity-label">High</span>
          </div>
          <div className="severity-item medium">
            <span className="severity-count">{mediumCount}</span>
            <span className="severity-label">Medium</span>
          </div>
          <div className="severity-item low">
            <span className="severity-count">{result.issues.filter(i => i.severity === 'Low').length}</span>
            <span className="severity-label">Low</span>
          </div>
        </div>

        <div className="issues-table-container">
          <table className="issues-table">
            <thead>
              <tr>
                <th>Severity</th>
                <th>ID</th>
                <th>Field</th>
                <th>Issue Description</th>
                <th>Sheet</th>
              </tr>
            </thead>
            <tbody>
              {result.issues.map((issue) => (
                <tr key={issue.id}>
                  <td>
                    <span className={`severity-badge ${getSeverityColor(issue.severity)}`}>
                      {issue.severity}
                    </span>
                  </td>
                  <td>{issue.id}</td>
                  <td>{issue.field}</td>
                  <td>{issue.message}</td>
                  <td>{issue.sheet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="validation-actions">
          <button className="btn btn-secondary" onClick={() => setActiveSection('dataInput')}>
            Edit Data
          </button>
          <button className="btn btn-primary" onClick={() => setActiveSection('memo')}>
            View AI Decision Memo
          </button>
        </div>
      </div>
    );
  };

  const renderAIDecisionMemo = () => {
    const result = validationResult || { issues: [], decision: 'Pending' as const };
    return (
      <div className="section">
        <div className="section-header">
          <h1>AI Decision Memo</h1>
          <p>Automated analysis and recommendation for the validated investment data</p>
        </div>

        <div className="screen-label">{SCREEN_LABELS.memo}</div>

        <div className="memo-container">
          <div className="memo-header">
            <div className="memo-logo">InvestOps AI</div>
            <div className="memo-meta">
              <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Project ID:</strong> {investmentMaster.projectId}</p>
              <p><strong>Analysis:</strong> Automated Validation</p>
            </div>
          </div>

          <div className="memo-section">
            <h3>Final Recommendation</h3>
            <div className={`memo-decision-box ${getDecisionColor(result.decision)}`}>
              <div className="memo-decision-label">DECISION</div>
              <div className="memo-decision-value">{result.decision}</div>
            </div>
            <p className="memo-recommendation">
              Record <strong>{investmentMaster.projectId}</strong> cannot be accepted for downstream processing.
              One Critical and three High severity data quality issues must be resolved before re-submission.
            </p>
          </div>

          <div className="memo-section">
            <h3>Business Impact</h3>
            <div className="memo-impact-grid">
              <div className="memo-impact-item">
                <span className="memo-impact-icon">💰</span>
                <div>
                  <strong>Financial Reporting Risk</strong>
                  <p>Incorrect valuation data ($85M) may propagate to LPs and regulators, triggering restatement requirements.</p>
                </div>
              </div>
              <div className="memo-impact-item">
                <span className="memo-impact-icon">⚖️</span>
                <div>
                  <strong>Compliance Breach</strong>
                  <p>Timeline manipulation (Exit before Acquisition) violates fund administration controls and reporting deadlines.</p>
                </div>
              </div>
              <div className="memo-impact-item">
                <span className="memo-impact-icon">📉</span>
                <div>
                  <strong>Data Integrity Failure</strong>
                  <p>Cross-sheet inconsistency undermines automated reconciliation and creates audit exceptions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="memo-section">
            <h3>Audit & Control Risk</h3>
            <div className="memo-risk-list">
              <div className="memo-risk-item high-risk">
                <span className="memo-risk-indicator"></span>
                <div>
                  <strong>Control Failure: Date Logic Validation</strong>
                  <p>Exit Date precedes Acquisition Date by 11 months. Manual review did not detect temporal impossibility.</p>
                </div>
              </div>
              <div className="memo-risk-item high-risk">
                <span className="memo-risk-indicator"></span>
                <div>
                  <strong>Control Failure: Mandatory Field Completeness</strong>
                  <p>Asset Sector blank despite Real Estate classification requiring sector coding.</p>
                </div>
              </div>
              <div className="memo-risk-item high-risk">
                <span className="memo-risk-indicator"></span>
                <div>
                  <strong>Control Failure: Data Type Validation</strong>
                  <p>Ownership Percentage entered as free text ("around 40 percent") instead of numeric format.</p>
                </div>
              </div>
              <div className="memo-risk-item high-risk">
                <span className="memo-risk-indicator"></span>
                <div>
                  <strong>Control Failure: Cross-Reference Validation</strong>
                  <p>Project Name mismatch between Investment Master ("Jakarta Logistics Platform") and Quarterly Reporting ("Jakarta Logistic Platform").</p>
                </div>
              </div>
            </div>
          </div>

          <div className="memo-section">
            <h3>Hidden Assumptions</h3>
            <ul className="memo-assumptions">
              <li>Data entry errors are unintentional and can be corrected at source.</li>
              <li>Acquisition and Exit dates follow standard chronological order.</li>
              <li>Project names are consistent across all data sheets and systems.</li>
              <li>Percentage fields require numeric formatting for downstream calculations.</li>
              <li>Asset Sector codes must match pre-approved dropdown values.</li>
            </ul>
          </div>

          <div className="memo-section">
            <h3>Cognitive Biases to Avoid</h3>
            <div className="memo-biases">
              <div className="memo-bias-item">
                <div className="memo-bias-header">
                  <span className="memo-bias-icon">😊</span>
                  <strong>Optimism Bias</strong>
                </div>
                <p>Assuming downstream teams will "fix it later" without escalating upstream data quality issues.</p>
                <p className="memo-bias-counter">Countermeasure: Block processing until source data is corrected and re-validated.</p>
              </div>
              <div className="memo-bias-item">
                <div className="memo-bias-header">
                  <span className="memo-bias-icon">🔄</span>
                  <strong>Status Quo Bias</strong>
                </div>
                <p>Accepting poor data quality because "manual clean-up is how we've always done it."</p>
                <p className="memo-bias-counter">Countermeasure: Automated validation catches errors before manual review, enforcing consistent standards.</p>
              </div>
              <div className="memo-bias-item">
                <div className="memo-bias-header">
                  <span className="memo-bias-icon">🔍</span>
                  <strong>Confirmation Bias</strong>
                </div>
                <p>Assuming "Jakarta Logistics Platform" is correct because the name is familiar, ignoring cross-sheet conflict.</p>
                <p className="memo-bias-counter">Countermeasure: AI cross-references all sheets automatically, flagging inconsistencies regardless of familiarity.</p>
              </div>
            </div>
          </div>

          <div className="memo-section memo-required-action">
            <h3>Required Next Action</h3>
            <ol className="memo-actions">
              <li><strong>Escalate to Data Entry Team</strong> — Request correction of Investment Master record within 24 hours.</li>
              <li><strong>Verify Source Documentation</strong> — Confirm acquisition and exit timeline with legal files.</li>
              <li><strong>Re-submit for Validation</strong> — After corrections, run validation again before downstream processing.</li>
              <li><strong>Document Exception</strong> — Log this rejection in the audit trail with reason and corrective action taken.</li>
            </ol>
          </div>

          <div className="memo-footer">
            <p><em>Generated by InvestOps AI validation engine. All recommendations require human review and approval before final action.</em></p>
          </div>
        </div>

        <div className="validation-actions">
          <button className="btn btn-secondary" onClick={() => setActiveSection('stakeholder')}>
            View Stakeholder Explanations
          </button>
          <button className="btn btn-primary" onClick={() => setActiveSection('validation')}>
            Back to Results
          </button>
        </div>
      </div>
    );
  };

  const renderStakeholderExplanation = () => (
    <div className="section">
      <div className="section-header">
        <h1>Stakeholder Explanations</h1>
        <p>Same data quality issues explained for different audiences</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.stakeholder}</div>

      <div className="stakeholder-tabs">
        <div className="stakeholder-card card">
          <div className="stakeholder-card-header">
            <span className="stakeholder-icon">👤</span>
            <h3>Investment Operations User</h3>
          </div>
          <div className="stakeholder-card-body">
            <p className="stakeholder-intro">The validation system has identified 4 data quality issues that must be resolved before this investment record can proceed to portfolio monitoring.</p>

            <div className="stakeholder-issue">
              <h4>Issue Summary</h4>
              <ul>
                <li><strong>Critical:</strong> Exit Date (01-Feb-2021) precedes Acquisition Date (15-Mar-2021) — timeline error</li>
                <li><strong>High:</strong> Asset Sector is blank — mandatory field for Real Estate classification</li>
                <li><strong>High:</strong> Ownership Percentage contains text instead of numeric value</li>
                <li><strong>High:</strong> Project Name inconsistent across sheets ("Jakarta Logistic Platform" vs "Jakarta Logistics Platform")</li>
              </ul>
            </div>

            <div className="stakeholder-action">
              <h4>Required Action</h4>
              <p>Correct all Critical and High severity issues in the source investment management system. Re-submit for validation once corrections are made. This record cannot be processed until issues are resolved.</p>
            </div>
          </div>
        </div>

        <div className="stakeholder-card card">
          <div className="stakeholder-card-header">
            <span className="stakeholder-icon">📊</span>
            <h3>Business Analyst</h3>
          </div>
          <div className="stakeholder-card-body">
            <p className="stakeholder-intro">The dataset submitted for INV-1002 fails validation with 4 data quality issues across completeness, format, and consistency dimensions.</p>

            <div className="stakeholder-issue">
              <h4>Issue Summary</h4>
              <ul>
                <li><strong>Business Logic Violation:</strong> Exit Date cannot precede Acquisition Date — temporal impossibility detected</li>
                <li><strong>Missing Attribute:</strong> Asset Sector blank — prevents proper Real Estate sector allocation and reporting</li>
                <li><strong>Format Error:</strong> Ownership Percentage "around 40 percent" is unparseable for quantitative analysis</li>
                <li><strong>Cross-Sheet Mismatch:</strong> Project Name differs between Investment Master and Quarterly Reporting</li>
              </ul>
            </div>

            <div className="stakeholder-metrics">
              <div className="stakeholder-metric">
                <span className="metric-value">35/100</span>
                <span className="metric-label">Data Quality Score</span>
              </div>
              <div className="stakeholder-metric">
                <span className="metric-value">4</span>
                <span className="metric-label">Issues Found</span>
              </div>
              <div className="stakeholder-metric">
                <span className="metric-value critical">1</span>
                <span className="metric-label">Critical</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stakeholder-card card">
          <div className="stakeholder-card-header">
            <span className="stakeholder-icon">💻</span>
            <h3>Developer</h3>
          </div>
          <div className="stakeholder-card-body">
            <p className="stakeholder-intro">Validation rules for INV-1002 identified failures in data type validation, business logic enforcement, and cross-sheet consistency checks.</p>

            <div className="stakeholder-issue">
              <h4>Technical Details</h4>
              <ul>
                <li><strong>Date Parsing:</strong> Date.parse(&quot;01-Feb-2021&quot;) succeeds but comparison logic rejects Exit &lt; Acquisition</li>
                <li><strong>Regex Validation:</strong> Ownership Percentage regex [0-9]+(\.[0-9]+)?% failed on &quot;around 40 percent&quot; — non-numeric input not caught at entry</li>
                <li><strong>String Comparison:</strong> Exact match failed — &quot;Logistics&quot; vs &quot;Logistic&quot; (missing 's') not caught by fuzzy matching</li>
                <li><strong>Dropdown Validation:</strong> Empty Asset Sector bypassed required field check at data entry</li>
              </ul>
            </div>

            <div className="stakeholder-tech">
              <h4>Recommendations</h4>
              <p>Add input masking at data entry points. Implement real-time validation before form submission. Normalize date formats to ISO 8601. Add fuzzy matching for cross-sheet name validation.</p>
            </div>
          </div>
        </div>

        <div className="stakeholder-card card">
          <div className="stakeholder-card-header">
            <span className="stakeholder-icon">🔬</span>
            <h3>QA Tester</h3>
          </div>
          <div className="stakeholder-card-body">
            <p className="stakeholder-intro">INV-1002 dataset contains intentional defects for validation testing. All 4 issues are reproducible and documented for test coverage.</p>

            <div className="stakeholder-issue">
              <h4>Test Coverage</h4>
              <ul>
                <li><strong>TC-001:</strong> Exit Date before Acquisition Date — Critical issue flagged — <span className="test-pass">PASS</span></li>
                <li><strong>TC-002:</strong> Asset Sector mandatory field blank — High issue flagged — <span className="test-pass">PASS</span></li>
                <li><strong>TC-003:</strong> Ownership Percentage non-numeric — High issue flagged — <span className="test-pass">PASS</span></li>
                <li><strong>TC-004:</strong> Project Name cross-sheet mismatch — High issue flagged — <span className="test-pass">PASS</span></li>
              </ul>
            </div>

            <div className="stakeholder-metrics">
              <div className="stakeholder-metric">
                <span className="metric-value">47</span>
                <span className="metric-label">Total Test Cases</span>
              </div>
              <div className="stakeholder-metric">
                <span className="metric-value">46</span>
                <span className="metric-label">Passed</span>
              </div>
              <div className="stakeholder-metric">
                <span className="metric-value critical">1</span>
                <span className="metric-label">Failed</span>
              </div>
              <div className="stakeholder-metric">
                <span className="metric-value">97.87%</span>
                <span className="metric-label">Pass Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestScenarios = () => (
    <div className="section">
      <div className="section-header">
        <h1>Test Scenario Generator</h1>
        <p>18 validation test cases across 5 categories</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.test}</div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge positive">Positive Cases</span>
          <span className="test-category-desc">Valid data that should pass validation</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Positive').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className="test-result pass">{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge negative">Negative Cases</span>
          <span className="test-category-desc">Invalid data that should fail validation</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Negative').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className="test-result fail">{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge boundary">Boundary Cases</span>
          <span className="test-category-desc">Edge values at the limits of acceptable ranges</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Boundary').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className={`test-result ${scenario.expectedResult === 'PASS' ? 'pass' : 'fail'}`}>{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge datatype">Data Type Cases</span>
          <span className="test-category-desc">Validation of data format and type compliance</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Data Type').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className={`test-result ${scenario.expectedResult === 'PASS' ? 'pass' : 'fail'}`}>{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge crosssheet">Cross-Sheet Cases</span>
          <span className="test-category-desc">Consistency validation across multiple sheets</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Cross-Sheet').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className={`test-result ${scenario.expectedResult === 'PASS' ? 'pass' : 'fail'}`}>{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="test-category-group">
        <div className="test-category-header">
          <span className="test-category-badge mandatory">Mandatory Field Cases</span>
          <span className="test-category-desc">Validation of required field completeness</span>
        </div>
        <div className="test-table-container">
          <table className="test-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Test Case Name</th>
                <th>Input Example</th>
                <th>Expected Result</th>
                <th>Expected Error Message</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {testScenarios.filter(s => s.category === 'Mandatory').map((scenario) => (
                <tr key={scenario.id}>
                  <td className="test-id">{scenario.id}</td>
                  <td>{scenario.title}</td>
                  <td>{scenario.input}</td>
                  <td><span className="test-result fail">{scenario.expectedResult}</span></td>
                  <td>{scenario.errorMessage}</td>
                  <td><span className={`priority-badge ${scenario.priority}`}>{scenario.priority}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBusinessModelCanvas = () => (
    <div className="section">
      <div className="section-header">
        <h1>Business Model Canvas</h1>
        <p>InvestOps AI venture overview</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.canvas}</div>

      <div className="canvas-grid">
        <div className="canvas-card key-partners">
          <h3>Key Partners</h3>
          <ul>
            {businessModelCanvas.keyPartners.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card key-activities">
          <h3>Key Activities</h3>
          <ul>
            {businessModelCanvas.keyActivities.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card key-resources">
          <h3>Key Resources</h3>
          <ul>
            {businessModelCanvas.keyResources.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card value-propositions">
          <h3>Value Propositions</h3>
          <ul>
            {businessModelCanvas.valuePropositions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card customer-relationships">
          <h3>Customer Relationships</h3>
          <ul>
            {businessModelCanvas.customerRelationships.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card channels">
          <h3>Channels</h3>
          <ul>
            {businessModelCanvas.channels.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card customer-segments">
          <h3>Customer Segments</h3>
          <ul>
            {businessModelCanvas.customerSegments.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card cost-structure">
          <h3>Cost Structure</h3>
          <ul>
            {businessModelCanvas.costStructure.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="canvas-card revenue-streams">
          <h3>Revenue Streams</h3>
          <ul>
            {businessModelCanvas.revenueStreams.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderAICapabilities = () => (
    <div className="section">
      <div className="section-header">
        <h1>AI Value Proposition</h1>
        <p>How InvestOps AI transforms investment operations</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.capabilities}</div>

      <div className="capabilities-grid">
        {AI_CAPABILITIES.map((cap, idx) => (
          <div key={idx} className="capability-card card">
            <div className="capability-icon">{cap.icon}</div>
            <h3>{cap.title}</h3>
            <p>{cap.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResponsibleAI = () => (
    <div className="section">
      <div className="section-header">
        <h1>Responsible AI Guardrails</h1>
        <p>Our commitment to ethical and trustworthy AI deployment</p>
      </div>

      <div className="screen-label">{SCREEN_LABELS.guardrails}</div>

      <div className="guardrails-grid">
        {responsibleAIGuardrails.map((guardrail) => (
          <div key={guardrail.id} className="guardrail-card card">
            <div className="guardrail-header">
              <div className="guardrail-icon">🛡️</div>
              <span className="status-badge active">{guardrail.status}</span>
            </div>
            <h3>{guardrail.principle}</h3>
            <p className="guardrail-description">{guardrail.description}</p>
            <div className="guardrail-implementation">
              <strong>Implementation:</strong>
              <p>{guardrail.implementation}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="commitment-section">
        <h2>Our Commitment</h2>
        <p>
          InvestOps AI is designed to assist, not replace, human decision-makers.
          All decisions are explainable and subject to human review.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview': return renderOverview();
      case 'dashboard': return renderDashboard();
      case 'dataInput': return renderDataInput();
      case 'validation': return renderValidationResults();
      case 'memo': return renderAIDecisionMemo();
      case 'stakeholder': return renderStakeholderExplanation();
      case 'test': return renderTestScenarios();
      case 'canvas': return renderBusinessModelCanvas();
      case 'capabilities': return renderAICapabilities();
      case 'guardrails': return renderResponsibleAI();
      default: return renderOverview();
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo" onClick={() => setActiveSection('overview')}>
            <span className="logo-icon">📊</span>
            <span className="logo-text">InvestOps AI</span>
          </div>
          <nav className="main-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="app-main">
        {renderContent()}
      </main>

      <footer className="app-footer">
        <p>InvestOps AI - Private Markets Investment Operations Copilot</p>
        <p className="footer-note">MBA Prototype | Fictional Data Only</p>
      </footer>
    </div>
  );
}

export default App;
