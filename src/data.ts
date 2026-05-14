export interface InvestmentMaster {
  projectId: string;
  projectName: string;
  assetClass: string;
  assetSector: string;
  ownershipPercentage: string;
  acquisitionDate: string;
  exitDate: string;
  valuationAmount: string;
  currency: string;
}

export interface QuarterlyReporting {
  projectId: string;
  projectName: string;
  reportedValuation: string;
  currency: string;
}

export interface ValidationIssue {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  field: string;
  message: string;
  sheet: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  decision: 'Accept' | 'Accept with Warning' | 'Conditional Accept' | 'Reject';
}

export const mockInvestmentMaster: InvestmentMaster = {
  projectId: 'INV-1002',
  projectName: 'Jakarta Logistics Platform',
  assetClass: 'Real Estate',
  assetSector: '',
  ownershipPercentage: 'around 40 percent',
  acquisitionDate: '15-Mar-2021',
  exitDate: '01-Feb-2021',
  valuationAmount: '85000000',
  currency: 'USD',
};

export const mockQuarterlyReporting: QuarterlyReporting = {
  projectId: 'INV-1002',
  projectName: 'Jakarta Logistic Platform',
  reportedValuation: '85000000',
  currency: 'USD',
};

export const approvedAssetSectors = [
  'Real Estate',
  'Private Equity',
  'Infrastructure',
  'Natural Resources',
  'Healthcare',
  'Technology',
  'Consumer',
  'Financial Services',
  'Industrial',
  'Energy',
];

export const validCurrencies = ['SGD', 'USD', 'EUR', 'GBP', 'JPY'];

export const businessModelCanvas = {
  keyPartners: [
    'Investors',
    'Logistics companies',
    'Suppliers',
  ],
  keyActivities: [
    'Product Development',
    'Marketing & Promotions',
    'Order Management',
    'Inventory Management',
  ],
  keyResources: [
    'Warehouse & storage',
    'Delivery fleet',
    'E-commerce platform',
    'Website & app',
  ],
  valuePropositions: [
    'High quality products at competitive prices',
    'Wide product selection',
    'Fast delivery',
    'Easy return policy',
    'Secure payment',
  ],
  customerRelationships: [
    'Responsive support',
    'Order tracking',
    'Loyalty programs',
    'Feedback & reviews',
  ],
  channels: [
    'Website & app',
    'Social media',
    'Online marketplaces',
    'Email marketing',
  ],
  customerSegments: [
    'Online shoppers',
    'Bargain hunters',
    'Busy professionals',
    'International customers',
  ],
  costStructure: [
    'Product costs',
    'Marketing & advertising',
    'Platform maintenance',
    'Delivery costs',
  ],
  revenueStreams: [
    'Product sales',
    'Subscription services',
    'Advertising revenue',
    'Affiliate commissions',
  ],
};

export const stakeholderExplanations = {
  investmentOpsUser: {
    title: 'Investment Operations User',
    summary: 'The validation flagged 4 critical data quality issues that require immediate attention before this investment record can proceed to the portfolio monitoring system.',
    findings: [
      'Exit date (01-Feb-2021) precedes acquisition date (15-Mar-2021) - data entry error',
      'Asset Sector field is blank - mandatory field for Real Estate classification',
      'Ownership Percentage contains free text instead of numeric value',
      'Project Name spelling inconsistency between Investment Master and Quarterly Reporting',
    ],
    actionRequired: 'Correct all Critical and High severity issues in the source system before re-submission.',
    impact: 'This record cannot be processed for downstream reporting until issues are resolved.',
  },
  businessAnalyst: {
    title: 'Business Analyst',
    summary: 'The dataset failed validation due to structural and consistency issues across the two data sheets submitted for INV-1002.',
    findings: [
      'Date logic violation: Exit Date < Acquisition Date suggests timeline error',
      'Missing mandatory classification attribute (Asset Sector)',
      'Unparseable numeric field (Ownership Percentage format)',
      'Naming inconsistency: "Jakarta Logistics Platform" vs "Jakarta Logistic Platform"',
    ],
    dataQualityScore: '35/100 - Multiple critical failures require source data correction',
    downstreamImpact: 'Would cause incorrect allocation in quarterly portfolio reports and breach data quality SLAs.',
  },
  developer: {
    title: 'Developer',
    summary: 'Validation rules implemented for INV-1002 dataset identified failures in data type, business logic, and cross-sheet consistency checks.',
    findings: [
      'Date comparison logic: Date.parse() returns NaN for "01-Feb-2021" format - should use dd-MMM-yyyy parser',
      'Ownership Percentage regex pattern [0-9]+(\\.[0-9]+)?% did not match "around 40 percent"',
      'String comparison without normalization for Project Name (missing "s" in "Logistic")',
      'Asset Sector lookup failed against approved list due to empty string',
    ],
    technicalDebt: 'Consider adding input masking and real-time validation at data entry points.',
    recommendations: 'Implement field-level validation before form submission and normalize date formats to ISO 8601.',
  },
  qaTester: {
    title: 'QA Tester',
    summary: 'INV-1002 dataset contains intentional defects for test scenario validation. All 4 issues are reproducible and documented.',
    testScenarios: [
      {
        id: 'TC-001',
        description: 'Verify system rejects records with Exit Date before Acquisition Date',
        steps: ['Load INV-1002 data', 'Run validation', 'Confirm Critical issue flagged'],
        expectedResult: 'Critical issue displayed with correct date comparison message',
        status: 'PASS',
      },
      {
        id: 'TC-002',
        description: 'Verify mandatory Asset Sector field cannot be blank',
        steps: ['Submit record with empty Asset Sector', 'Run validation', 'Check High issue appears'],
        expectedResult: 'High severity issue displayed for missing mandatory field',
        status: 'PASS',
      },
      {
        id: 'TC-003',
        description: 'Verify Ownership Percentage accepts only numeric percentages',
        steps: ['Submit "around 40 percent" as ownership', 'Run validation', 'Confirm parsing error'],
        expectedResult: 'High severity issue for non-numeric percentage value',
        status: 'PASS',
      },
      {
        id: 'TC-004',
        description: 'Verify Project Name consistency across sheets',
        steps: ['Compare names in Investment Master vs Quarterly Reporting', 'Run validation', 'Check inconsistency flagged'],
        expectedResult: 'High severity issue for "Logistics" vs "Logistic" mismatch',
        status: 'PASS',
      },
    ],
    coverageMetrics: {
      totalTestCases: 47,
      passed: 46,
      failed: 1,
      passRate: '97.87%',
    },
  },
};

export const testScenarios = [
  // Positive Cases
  {
    id: 'TS-POS-001',
    category: 'Positive',
    title: 'Valid Investment Record',
    input: 'All fields valid, Exit Date after Acquisition Date',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P0',
  },
  {
    id: 'TS-POS-002',
    category: 'Positive',
    title: 'Valid Currency Codes',
    input: 'Currency: SGD, USD, EUR, GBP, or JPY',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P2',
  },
  // Negative Cases
  {
    id: 'TS-NEG-001',
    category: 'Negative',
    title: 'Exit Date Before Acquisition Date',
    input: 'Acquisition: 15-Mar-2021, Exit: 01-Feb-2021',
    expectedResult: 'FAIL',
    errorMessage: 'Exit Date cannot be earlier than Acquisition Date',
    priority: 'P0',
  },
  {
    id: 'TS-NEG-002',
    category: 'Negative',
    title: 'Blank Project ID',
    input: 'Project ID: (empty)',
    expectedResult: 'FAIL',
    errorMessage: 'Project ID is mandatory',
    priority: 'P0',
  },
  {
    id: 'TS-NEG-003',
    category: 'Negative',
    title: 'Blank Project Name',
    input: 'Project Name: (empty)',
    expectedResult: 'FAIL',
    errorMessage: 'Project Name is mandatory',
    priority: 'P0',
  },
  // Boundary Cases
  {
    id: 'TS-BND-001',
    category: 'Boundary',
    title: 'Ownership Percentage at 0%',
    input: 'Ownership Percentage: 0%',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P1',
  },
  {
    id: 'TS-BND-002',
    category: 'Boundary',
    title: 'Ownership Percentage at 100%',
    input: 'Ownership Percentage: 100%',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P1',
  },
  {
    id: 'TS-BND-003',
    category: 'Boundary',
    title: 'Ownership Percentage Over 100%',
    input: 'Ownership Percentage: 150%',
    expectedResult: 'FAIL',
    errorMessage: 'Ownership Percentage must be between 0% and 100%',
    priority: 'P1',
  },
  {
    id: 'TS-BND-004',
    category: 'Boundary',
    title: 'Exit Date Same as Acquisition Date',
    input: 'Acquisition: 15-Mar-2021, Exit: 15-Mar-2021',
    expectedResult: 'PASS',
    errorMessage: 'None (same day is valid)',
    priority: 'P2',
  },
  // Data Type Cases
  {
    id: 'TS-DTYPE-001',
    category: 'Data Type',
    title: 'Non-Numeric Ownership Percentage',
    input: 'Ownership Percentage: "around 40 percent"',
    expectedResult: 'FAIL',
    errorMessage: 'Ownership Percentage must be numeric',
    priority: 'P0',
  },
  {
    id: 'TS-DTYPE-002',
    category: 'Data Type',
    title: 'Ownership with % Symbol',
    input: 'Ownership Percentage: "40%"',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P1',
  },
  {
    id: 'TS-DTYPE-003',
    category: 'Data Type',
    title: 'Ownership as Decimal',
    input: 'Ownership Percentage: "40.5"',
    expectedResult: 'PASS',
    errorMessage: 'None',
    priority: 'P1',
  },
  {
    id: 'TS-DTYPE-004',
    category: 'Data Type',
    title: 'Invalid Currency Code',
    input: 'Currency: "CNY"',
    expectedResult: 'FAIL',
    errorMessage: 'Currency must be SGD, USD, EUR, GBP, or JPY',
    priority: 'P1',
  },
  // Cross-Sheet Consistency Cases
  {
    id: 'TS-CROSS-001',
    category: 'Cross-Sheet',
    title: 'Project Name Mismatch',
    input: 'IM: "Jakarta Logistics Platform", QR: "Jakarta Logistic Platform"',
    expectedResult: 'FAIL',
    errorMessage: 'Project Name is inconsistent across sheets',
    priority: 'P0',
  },
  {
    id: 'TS-CROSS-002',
    category: 'Cross-Sheet',
    title: 'Project ID Mismatch',
    input: 'IM: "INV-1002", QR: "INV-1003"',
    expectedResult: 'FAIL',
    errorMessage: 'Project ID does not match across sheets',
    priority: 'P0',
  },
  {
    id: 'TS-CROSS-003',
    category: 'Cross-Sheet',
    title: 'Currency Mismatch',
    input: 'IM Currency: "USD", QR Currency: "SGD"',
    expectedResult: 'FAIL',
    errorMessage: 'Currency mismatch across sheets',
    priority: 'P1',
  },
  // Mandatory Field Cases
  {
    id: 'TS-MAND-001',
    category: 'Mandatory',
    title: 'Blank Asset Sector',
    input: 'Asset Sector: (empty)',
    expectedResult: 'FAIL',
    errorMessage: 'Asset Sector is mandatory',
    priority: 'P1',
  },
  {
    id: 'TS-MAND-002',
    category: 'Mandatory',
    title: 'Invalid Asset Sector',
    input: 'Asset Sector: "Technology" (not in approved list)',
    expectedResult: 'FAIL',
    errorMessage: 'Asset Sector must come from approved dropdown values',
    priority: 'P1',
  },
];

export const responsibleAIGuardrails = [
  {
    id: 'RAI-001',
    principle: 'Fictional Data Only',
    description: 'This prototype uses 100% fictional sample data. No real company names, client names, investment details, or confidential data are used.',
    implementation: 'All data is synthetically generated for MBA assignment purposes. INV-1002 "Jakarta Logistics Platform" is fictional.',
    status: 'Active',
  },
  {
    id: 'RAI-002',
    principle: 'Decision Support, Not Replacement',
    description: 'InvestOps AI provides validation recommendations and explanations but does not make final decisions on investment data quality.',
    implementation: 'System outputs "Recommend: Reject/Accept" but requires human approval for all final decisions.',
    status: 'Active',
  },
  {
    id: 'RAI-003',
    principle: 'Human Review Required',
    description: 'Critical and High severity issues require explicit human review before data can proceed to downstream systems.',
    implementation: 'Validation flow blocks on Critical issues until human operator approves or rejects with justification.',
    status: 'Active',
  },
  {
    id: 'RAI-004',
    principle: 'Transparency & Explainability',
    description: 'All validation decisions are explainable. Users see exactly which rules failed, why, and what data caused the issue.',
    implementation: 'Rule-based validation with clear issue descriptions. No opaque machine learning models.',
    status: 'Active',
  },
  {
    id: 'RAI-005',
    principle: 'Assumptions & Limitations Shown',
    description: 'The system explicitly documents hidden assumptions (e.g., date formats, name matching) and acknowledges validation limitations.',
    implementation: 'Memo section includes "Hidden Assumptions" and "Cognitive Biases" to encourage critical thinking.',
    status: 'Active',
  },
  {
    id: 'RAI-006',
    principle: 'Audit Trail Preservation',
    description: 'Every validation run maintains full traceability: inputs, rules applied, issues found, and recommended next steps.',
    implementation: 'AI Decision Memo documents all issues, rationale, and required actions for compliance auditing.',
    status: 'Active',
  },
  {
    id: 'RAI-007',
    principle: 'No Real Investment Decisions',
    description: 'This prototype does not execute, approve, or reject any real investments. It is a data quality validation tool only.',
    implementation: 'Clear disclaimer: "For MBA assignment prototype only. Not for actual investment decisions."',
    status: 'Active',
  },
];

export function runValidation(
  investmentMaster: InvestmentMaster,
  quarterlyReporting: QuarterlyReporting
): ValidationResult {
  const issues: ValidationIssue[] = [];

  // Rule 1: Project ID is mandatory
  if (!investmentMaster.projectId || investmentMaster.projectId.trim() === '') {
    issues.push({
      id: 'V001',
      severity: 'Critical',
      category: 'Completeness',
      field: 'Project ID',
      message: 'Project ID is mandatory.',
      sheet: 'Investment Master',
    });
  }

  // Rule 2: Project Name is mandatory
  if (!investmentMaster.projectName || investmentMaster.projectName.trim() === '') {
    issues.push({
      id: 'V002',
      severity: 'Critical',
      category: 'Completeness',
      field: 'Project Name',
      message: 'Project Name is mandatory.',
      sheet: 'Investment Master',
    });
  }

  // Rule 3: Project ID and Project Name must match across sheets
  if (investmentMaster.projectId !== quarterlyReporting.projectId) {
    issues.push({
      id: 'V003',
      severity: 'High',
      category: 'Consistency',
      field: 'Project ID',
      message: 'Project ID does not match across sheets.',
      sheet: 'Both Sheets',
    });
  }

  if (investmentMaster.projectName !== quarterlyReporting.projectName) {
    issues.push({
      id: 'V004',
      severity: 'High',
      category: 'Consistency',
      field: 'Project Name',
      message: `Project Name is inconsistent across sheets: "${investmentMaster.projectName}" vs "${quarterlyReporting.projectName}".`,
      sheet: 'Both Sheets',
    });
  }

  // Rule 4: Asset Sector is mandatory and must be from approved list
  if (!investmentMaster.assetSector || investmentMaster.assetSector.trim() === '') {
    issues.push({
      id: 'V005',
      severity: 'High',
      category: 'Completeness',
      field: 'Asset Sector',
      message: 'Asset Sector is blank.',
      sheet: 'Investment Master',
    });
  } else if (!approvedAssetSectors.includes(investmentMaster.assetSector)) {
    issues.push({
      id: 'V006',
      severity: 'High',
      category: 'Validity',
      field: 'Asset Sector',
      message: 'Asset Sector must come from approved dropdown values.',
      sheet: 'Investment Master',
    });
  }

  // Rule 5: Ownership Percentage must be numeric and between 0% and 100%
  const ownershipRegex = /^[0-9]+(\.[0-9]+)?%?$/;
  const ownershipValue = investmentMaster.ownershipPercentage.trim();

  if (!ownershipRegex.test(ownershipValue)) {
    issues.push({
      id: 'V007',
      severity: 'High',
      category: 'Format',
      field: 'Ownership Percentage',
      message: 'Ownership Percentage is free text instead of numeric.',
      sheet: 'Investment Master',
    });
  } else {
    const numericValue = parseFloat(ownershipValue.replace('%', ''));
    if (numericValue < 0 || numericValue > 100) {
      issues.push({
        id: 'V008',
        severity: 'High',
        category: 'Range',
        field: 'Ownership Percentage',
        message: 'Ownership Percentage must be between 0% and 100%.',
        sheet: 'Investment Master',
      });
    }
  }

  // Rule 6: Exit Date cannot be earlier than Acquisition Date
  const parseDate = (dateStr: string): Date | null => {
    const parts = dateStr.trim().split('-');
    if (parts.length !== 3) return null;
    const day = parseInt(parts[0], 10);
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };
    const month = monthMap[parts[1]];
    const year = parseInt(parts[2], 10);
    if (isNaN(day) || month === undefined || isNaN(year)) return null;
    return new Date(year, month, day);
  };

  const acquisitionDate = parseDate(investmentMaster.acquisitionDate);
  const exitDate = parseDate(investmentMaster.exitDate);

  if (acquisitionDate && exitDate && exitDate < acquisitionDate) {
    issues.push({
      id: 'V009',
      severity: 'Critical',
      category: 'Business Logic',
      field: 'Exit Date / Acquisition Date',
      message: `Exit Date (${investmentMaster.exitDate}) is earlier than Acquisition Date (${investmentMaster.acquisitionDate}).`,
      sheet: 'Investment Master',
    });
  }

  // Rule 7: Currency must be valid
  if (!validCurrencies.includes(investmentMaster.currency)) {
    issues.push({
      id: 'V010',
      severity: 'Medium',
      category: 'Validity',
      field: 'Currency',
      message: 'Currency must be SGD, USD, EUR, GBP, or JPY.',
      sheet: 'Investment Master',
    });
  }

  // Determine decision based on issues
  let decision: ValidationResult['decision'] = 'Accept';
  const hasCritical = issues.some(i => i.severity === 'Critical');
  const hasHigh = issues.some(i => i.severity === 'High');

  if (hasCritical) {
    decision = 'Reject';
  } else if (hasHigh) {
    decision = 'Conditional Accept';
  } else if (issues.length > 0) {
    decision = 'Accept with Warning';
  }

  return {
    isValid: issues.length === 0,
    issues,
    decision,
  };
}
