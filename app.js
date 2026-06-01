const inputs = {
  purchasePrice: document.querySelector("#purchasePrice"),
  deposit: document.querySelector("#deposit"),
  depositPercent: document.querySelector("#depositPercent"),
  mortgageRate: document.querySelector("#mortgageRate"),
  mortgageTerm: document.querySelector("#mortgageTerm"),
  rent: document.querySelector("#rent"),
  expenses: document.querySelector("#expenses"),
  interestOnlyCost: document.querySelector("#interestOnlyCost"),
  icrFactor: document.querySelector("#icrFactor"),
  taxBand: document.querySelector("#taxBand"),
  refurbCost: document.querySelector("#refurbCost"),
  fees: document.querySelector("#fees"),
  dwellingCount: document.querySelector("#dwellingCount"),
};

const outputs = {
  dealScore: document.querySelector("#dealScore"),
  scoreMeter: document.querySelector("#scoreMeter"),
  scoreLabel: document.querySelector("#scoreLabel"),
  monthlyCashflow: document.querySelector("#monthlyCashflow"),
  roi: document.querySelector("#roi"),
  grossYield: document.querySelector("#grossYield"),
  netYield: document.querySelector("#netYield"),
  mortgagePayment: document.querySelector("#mortgagePayment"),
  purchaseTaxLabel: document.querySelector("#purchaseTaxLabel"),
  purchaseTax: document.querySelector("#purchaseTax"),
  cashNeeded: document.querySelector("#cashNeeded"),
  icrCoverage: document.querySelector("#icrCoverage"),
  taxBasisText: document.querySelector("#taxBasisText"),
  insightList: document.querySelector("#insightList"),
  taxModal: document.querySelector("#taxModal"),
  openTaxModal: document.querySelector("#openTaxModal"),
  closeTaxModal: document.querySelector("#closeTaxModal"),
  monthlyTax: document.querySelector("#monthlyTax"),
  annualTax: document.querySelector("#annualTax"),
  afterTaxCashflow: document.querySelector("#afterTaxCashflow"),
  taxRent: document.querySelector("#taxRent"),
  taxExpenses: document.querySelector("#taxExpenses"),
  taxMortgageInterest: document.querySelector("#taxMortgageInterest"),
  taxReliefLabel: document.querySelector("#taxReliefLabel"),
  taxRelief: document.querySelector("#taxRelief"),
  taxableProfit: document.querySelector("#taxableProfit"),
  taxNote: document.querySelector("#taxNote"),
};

const premium = {
  views: document.querySelectorAll(".app-view"),
  navButtons: document.querySelectorAll(".nav-button"),
  sidebarItems: document.querySelectorAll("[data-sidebar-target]"),
  navAuthButton: document.querySelector("#navAuthButton"),
  premiumHero: document.querySelector(".premium-hero"),
  showLogin: document.querySelector("#showLogin"),
  loginPanel: document.querySelector("#loginPanel"),
  promoForm: document.querySelector("#promoForm"),
  promoCode: document.querySelector("#promoCode"),
  promoMessage: document.querySelector("#promoMessage"),
  dashboardPromoForm: document.querySelector("#dashboardPromoForm"),
  dashboardPromoCode: document.querySelector("#dashboardPromoCode"),
  dashboardPromoMessage: document.querySelector("#dashboardPromoMessage"),
  adminNav: document.querySelector(".admin-nav"),
  emailLoginForm: document.querySelector("#emailLoginForm"),
  loginEmail: document.querySelector("#loginEmail"),
  loginPasswordWrap: document.querySelector("#loginPasswordWrap"),
  loginPassword: document.querySelector("#loginPassword"),
  authModeButtons: document.querySelectorAll("[data-auth-mode]"),
  emailAuthSubmit: document.querySelector("#emailAuthSubmit"),
  authMessage: document.querySelector("#authMessage"),
  passwordResetForm: document.querySelector("#passwordResetForm"),
  newPassword: document.querySelector("#newPassword"),
  resetPasswordSubmit: document.querySelector("#resetPasswordSubmit"),
  resetMessage: document.querySelector("#resetMessage"),
  themeToggle: document.querySelector("#themeToggle"),
  accountPasswordForm: document.querySelector("#accountPasswordForm"),
  accountPassword: document.querySelector("#accountPassword"),
  accountPasswordMessage: document.querySelector("#accountPasswordMessage"),
  exportAccountData: document.querySelector("#exportAccountData"),
  deletePortfolioData: document.querySelector("#deletePortfolioData"),
  privacyMessage: document.querySelector("#privacyMessage"),
  dashboardPanel: document.querySelector("#dashboardPanel"),
  openPropertyModal: document.querySelector("#openPropertyModal"),
  logoutButton: document.querySelector("#logoutButton"),
  closePropertyModal: document.querySelector("#closePropertyModal"),
  propertyModal: document.querySelector("#propertyModal"),
  propertyForm: document.querySelector("#propertyForm"),
  propertySearch: document.querySelector("#propertySearch"),
  propertyList: document.querySelector("#propertyList"),
  propertyDetailView: document.querySelector("#propertyDetailView"),
  propertyDetailPanel: document.querySelector("#propertyDetailPanel"),
  backToProperties: document.querySelector("#backToProperties"),
  detailAddProperty: document.querySelector("#detailAddProperty"),
  propertyDetailTitle: document.querySelector("#propertyDetailTitle"),
  propertyRecordMetrics: document.querySelector("#propertyRecordMetrics"),
  propertyDetailSummary: document.querySelector("#propertyDetailSummary"),
  propertyDetailTabButtons: document.querySelectorAll("[data-property-detail-tab]"),
  propertyDetailPanels: document.querySelectorAll("[data-property-detail-panel]"),
  editPropertyButton: document.querySelector("#editPropertyButton"),
  deletePropertyButton: document.querySelector("#deletePropertyButton"),
  deletePropertyMessage: document.querySelector("#deletePropertyMessage"),
  propertyOwnershipModel: document.querySelector("#propertyOwnershipModel"),
  propertyOperatorNote: document.querySelector("#propertyOperatorNote"),
  propertyOperatorFields: document.querySelectorAll(".operator-field"),
  propertyManagementForm: document.querySelector("#propertyManagementForm"),
  detailOwnershipModel: document.querySelector("#detailOwnershipModel"),
  detailOperatorFields: document.querySelectorAll(".detail-operator-field"),
  detailLandlordName: document.querySelector("#detailLandlordName"),
  detailGuaranteedRent: document.querySelector("#detailGuaranteedRent"),
  detailMaintenanceModel: document.querySelector("#detailMaintenanceModel"),
  detailMaintenanceFee: document.querySelector("#detailMaintenanceFee"),
  detailRentDueDay: document.querySelector("#detailRentDueDay"),
  detailRentReminder: document.querySelector("#detailRentReminder"),
  propertyManagementMessage: document.querySelector("#propertyManagementMessage"),
  tenancyForm: document.querySelector("#tenancyForm"),
  tenancyMessage: document.querySelector("#tenancyMessage"),
  tenancyHistoryList: document.querySelector("#tenancyHistoryList"),
  detailTenantName: document.querySelector("#detailTenantName"),
  detailTenantPhone: document.querySelector("#detailTenantPhone"),
  detailTenantEmail: document.querySelector("#detailTenantEmail"),
  detailTenantPreviousAddress: document.querySelector("#detailTenantPreviousAddress"),
  addTenantToTenancy: document.querySelector("#addTenantToTenancy"),
  detailTenantList: document.querySelector("#detailTenantList"),
  detailGuarantorName: document.querySelector("#detailGuarantorName"),
  detailGuarantorPhone: document.querySelector("#detailGuarantorPhone"),
  detailGuarantorEmail: document.querySelector("#detailGuarantorEmail"),
  remortgageForm: document.querySelector("#remortgageForm"),
  remortgageMessage: document.querySelector("#remortgageMessage"),
  remortgageHistoryList: document.querySelector("#remortgageHistoryList"),
  propertyExpenseFilters: document.querySelector("#propertyExpenseFilters"),
  propertyExpenseSearch: document.querySelector("#propertyExpenseSearch"),
  propertyExpenseFrom: document.querySelector("#propertyExpenseFrom"),
  propertyExpenseTo: document.querySelector("#propertyExpenseTo"),
  propertyExpenseType: document.querySelector("#propertyExpenseType"),
  propertyExpenseStatus: document.querySelector("#propertyExpenseStatus"),
  propertyExpenseList: document.querySelector("#propertyExpenseList"),
  approvePropertyDrafts: document.querySelector("#approvePropertyDrafts"),
  exportPropertyTransactions: document.querySelector("#exportPropertyTransactions"),
  propertyReportFilters: document.querySelector("#propertyReportFilters"),
  propertyReportFrom: document.querySelector("#propertyReportFrom"),
  propertyReportTo: document.querySelector("#propertyReportTo"),
  propertyReportSearch: document.querySelector("#propertyReportSearch"),
  reportIncludeRent: document.querySelector("#reportIncludeRent"),
  reportIncludeMortgage: document.querySelector("#reportIncludeMortgage"),
  reportIncludeExpenses: document.querySelector("#reportIncludeExpenses"),
  reportIncludeTenancies: document.querySelector("#reportIncludeTenancies"),
  landlordReport: document.querySelector("#landlordReport"),
  printLandlordReport: document.querySelector("#printLandlordReport"),
  reminderList: document.querySelector("#reminderList"),
  notificationButton: document.querySelector("#notificationButton"),
  notificationCount: document.querySelector("#notificationCount"),
  notificationPanel: document.querySelector("#notificationPanel"),
  closeNotificationPanel: document.querySelector("#closeNotificationPanel"),
  notificationList: document.querySelector("#notificationList"),
  exportPortfolio: document.querySelector("#exportPortfolio"),
  portfolioCount: document.querySelector("#portfolioCount"),
  portfolioValue: document.querySelector("#portfolioValue"),
  portfolioDebt: document.querySelector("#portfolioDebt"),
  portfolioCashflow: document.querySelector("#portfolioCashflow"),
  subscriptionStatus: document.querySelector("#subscriptionStatus"),
  subscriptionRenewal: document.querySelector("#subscriptionRenewal"),
  subscriptionPaid: document.querySelector("#subscriptionPaid"),
  subscriptionSince: document.querySelector("#subscriptionSince"),
  subscriptionNote: document.querySelector("#subscriptionNote"),
  manageBilling: document.querySelector("#manageBilling"),
  invoiceList: document.querySelector("#invoiceList"),
  refreshAdmin: document.querySelector("#refreshAdmin"),
  adminUsers: document.querySelector("#adminUsers"),
  adminSubscriptions: document.querySelector("#adminSubscriptions"),
  adminMrr: document.querySelector("#adminMrr"),
  adminProperties: document.querySelector("#adminProperties"),
  adminPageViews: document.querySelector("#adminPageViews"),
  adminPremiumViews: document.querySelector("#adminPremiumViews"),
  adminPdfExports: document.querySelector("#adminPdfExports"),
  adminPromos: document.querySelector("#adminPromos"),
  adminUserList: document.querySelector("#adminUserList"),
  adminEventList: document.querySelector("#adminEventList"),
  adminPromoForm: document.querySelector("#adminPromoForm"),
  adminPromoCode: document.querySelector("#adminPromoCode"),
  adminPromoUses: document.querySelector("#adminPromoUses"),
  adminPromoExpiry: document.querySelector("#adminPromoExpiry"),
  adminPromoDuration: document.querySelector("#adminPromoDuration"),
  adminPromoMessage: document.querySelector("#adminPromoMessage"),
  adminPromoList: document.querySelector("#adminPromoList"),
  dashboardTabButtons: document.querySelectorAll("[data-dashboard-tab]"),
  dashboardPanels: document.querySelectorAll("[data-dashboard-panel]"),
  transactionForm: document.querySelector("#transactionForm"),
  transactionProperty: document.querySelector("#transactionProperty"),
  transactionDate: document.querySelector("#transactionDate"),
  transactionType: document.querySelector("#transactionType"),
  transactionAmount: document.querySelector("#transactionAmount"),
  transactionCategory: document.querySelector("#transactionCategory"),
  transactionTaxTreatment: document.querySelector("#transactionTaxTreatment"),
  transactionStatus: document.querySelector("#transactionStatus"),
  transactionNotes: document.querySelector("#transactionNotes"),
  transactionFilters: document.querySelector("#transactionFilters"),
  transactionSearch: document.querySelector("#transactionSearch"),
  transactionFilterProperty: document.querySelector("#transactionFilterProperty"),
  transactionFilterType: document.querySelector("#transactionFilterType"),
  transactionFilterStatus: document.querySelector("#transactionFilterStatus"),
  resetTransactionFilters: document.querySelector("#resetTransactionFilters"),
  transactionList: document.querySelector("#transactionList"),
  quarterSummary: document.querySelector("#quarterSummary"),
  exportQuarterPack: document.querySelector("#exportQuarterPack"),
  documentForm: document.querySelector("#documentForm"),
  documentLabel: document.querySelector("#documentLabel"),
  documentType: document.querySelector("#documentType"),
  documentPaymentStatus: document.querySelector("#documentPaymentStatus"),
  documentExpiry: document.querySelector("#documentExpiry"),
  documentExpenseDate: document.querySelector("#documentExpenseDate"),
  documentExpenseAmount: document.querySelector("#documentExpenseAmount"),
  documentExpenseCategory: document.querySelector("#documentExpenseCategory"),
  documentExpenseNotes: document.querySelector("#documentExpenseNotes"),
  documentFile: document.querySelector("#documentFile"),
  documentReminder: document.querySelector("#documentReminder"),
  documentMessage: document.querySelector("#documentMessage"),
  documentCount: document.querySelector("#documentCount"),
  documentActionBar: document.querySelector("#documentActionBar"),
  documentList: document.querySelector("#documentList"),
  expenseDocumentForm: document.querySelector("#expenseDocumentForm"),
  expenseDocumentLabel: document.querySelector("#expenseDocumentLabel"),
  expenseDocumentType: document.querySelector("#expenseDocumentType"),
  expenseDocumentPaymentStatus: document.querySelector("#expenseDocumentPaymentStatus"),
  expenseDocumentDate: document.querySelector("#expenseDocumentDate"),
  expenseDocumentAmount: document.querySelector("#expenseDocumentAmount"),
  expenseDocumentCategory: document.querySelector("#expenseDocumentCategory"),
  expenseDocumentNotes: document.querySelector("#expenseDocumentNotes"),
  expenseDocumentFile: document.querySelector("#expenseDocumentFile"),
  expenseDocumentMessage: document.querySelector("#expenseDocumentMessage"),
  adminTabButtons: document.querySelectorAll("[data-admin-tab]"),
  adminPanels: document.querySelectorAll("[data-admin-panel]"),
};

const appConfig = window.PROPERTY_PANEL_CONFIG || {};
const SUPABASE_URL = appConfig.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = appConfig.SUPABASE_ANON_KEY || "";
const CHECKOUT_FUNCTION = "create-checkout-session";
const PORTAL_FUNCTION = "create-billing-portal-session";
const SYNC_SUBSCRIPTION_FUNCTION = "sync-subscription";
const ACTIVE_SUBSCRIPTION_STATUSES = ["active", "trialing"];
const PASSWORD_REQUIREMENTS = "Password must be at least 8 characters and include a letter and a number.";
let passwordRecoveryPending =
  window.location.hash.includes("type=recovery") || window.location.search.includes("type=recovery");
const supabaseClient =
  window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

function passwordMeetsRequirements(password) {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
}

let investorType = "individual";
let mortgageType = "interestOnly";
let region = "england";
let propertyType = "residential";
let taxResidence = "england";
let depositEditedBy = "percent";
let latestMetrics = null;

const taxBands = {
  england: [
    { id: "basic", label: "Basic rate - 20% (£12,571-£50,270)", rate: 0.2 },
    { id: "higher", label: "Higher rate - 40% (£50,271-£125,140)", rate: 0.4 },
    { id: "additional", label: "Additional rate - 45% (over £125,140)", rate: 0.45 },
  ],
  scotland: [
    { id: "starter", label: "Starter rate - 19% (£12,571-£16,537)", rate: 0.19 },
    { id: "basic", label: "Scottish basic rate - 20% (£16,538-£29,526)", rate: 0.2 },
    { id: "intermediate", label: "Intermediate rate - 21% (£29,527-£43,662)", rate: 0.21 },
    { id: "higher", label: "Higher rate - 42% (£43,663-£75,000)", rate: 0.42 },
    { id: "advanced", label: "Advanced rate - 45% (£75,001-£125,140)", rate: 0.45 },
    { id: "top", label: "Top rate - 48% (over £125,140)", rate: 0.48 },
  ],
};

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const PROPERTY_STORAGE_KEY = "property-panel-properties";
const TRANSACTION_STORAGE_KEY = "property-panel-transactions";
const DOCUMENT_STORAGE_KEY = "property-panel-documents";
const SELECTED_PLAN_STORAGE_KEY = "property-panel-selected-plan";
const CHECKOUT_PENDING_STORAGE_KEY = "property-panel-checkout-pending";
const LEGACY_PROPERTY_STORAGE_KEY = "valo" + "ra-properties";
const PROMO_STORAGE_KEY = "property-panel-promo-access";
const LEGACY_PROMO_STORAGE_KEY = "valo" + "ra-promo-access";
const THEME_STORAGE_KEY = "property-panel-theme";
const UI_STATE_STORAGE_KEY = "property-panel-ui-state";
const PREMIUM_PROPERTY_LIMIT = 5;
const TENANCY_META_PREFIX = "PROPERTY_PANEL_TENANCY_META:";
const REMORTGAGE_META_PREFIX = "PROPERTY_PANEL_REMORTGAGE_META:";

const storedProperties =
  localStorage.getItem(PROPERTY_STORAGE_KEY) || localStorage.getItem(LEGACY_PROPERTY_STORAGE_KEY);
if (!localStorage.getItem(PROPERTY_STORAGE_KEY) && storedProperties) {
  localStorage.setItem(PROPERTY_STORAGE_KEY, storedProperties);
}

const storedPromoAccess =
  localStorage.getItem(PROMO_STORAGE_KEY) || localStorage.getItem(LEGACY_PROMO_STORAGE_KEY);
if (!localStorage.getItem(PROMO_STORAGE_KEY) && storedPromoAccess) {
  localStorage.setItem(PROMO_STORAGE_KEY, storedPromoAccess);
}

let properties = JSON.parse(storedProperties || "null") || [];
let transactions = JSON.parse(localStorage.getItem(TRANSACTION_STORAGE_KEY) || "null") || [];
let documents = JSON.parse(localStorage.getItem(DOCUMENT_STORAGE_KEY) || "null") || [];
let promoAccess = false;
let authMode = "signup";
let authListenerAttached = false;
let isAdminUser = false;
let activePropertyId = null;
let editingPropertyId = null;
let editingTenancyId = null;
let editingRemortgageId = null;
let editingTransactionId = null;
let tenancyTenantDrafts = [];
let currentSubscription = null;
let currentUser = null;
let subscriptionSyncAttempted = false;
let selectedPlan = localStorage.getItem(SELECTED_PLAN_STORAGE_KEY) === "pro" ? "pro" : "premium";

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = resolvedTheme;
  premium.themeToggle.textContent = resolvedTheme === "dark" ? "Light" : "Dark";
  premium.themeToggle.setAttribute("aria-pressed", resolvedTheme === "dark" ? "true" : "false");
}

function initTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const preferredTheme =
    storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(preferredTheme);
}

function createId(prefix) {
  return `${prefix}-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function normalizePropertyRecord(property) {
  return {
    ...property,
    id: property.id || createId("property"),
    ownershipModel: property.ownershipModel || "Owned",
    landlordName: property.landlordName || "",
    guaranteedRent: Number(property.guaranteedRent || 0),
    maintenanceModel: property.maintenanceModel || "Landlord charged for repairs",
    maintenanceFee: Number(property.maintenanceFee || 0),
    mortgageProductType: property.mortgageProductType || "Fixed",
    tenancies: (property.tenancies || []).map(normalizeTenancyRecord),
    remortgages: (property.remortgages || []).map(normalizeRemortgageRecord),
  };
}

properties = properties.map(normalizePropertyRecord);

function normalizeTransactionRecord(transaction) {
  const tenancyMatch = String(transaction.notes || "").match(/\[tenancy:([^\]]+)\]/);
  return {
    ...transaction,
    id: transaction.id || createId("transaction"),
    propertyId: transaction.propertyId || "",
    documentId: transaction.documentId || "",
    tenancyId: transaction.tenancyId || tenancyMatch?.[1] || "",
    date: transaction.date || new Date().toISOString().slice(0, 10),
    amount: Number(transaction.amount || 0),
    type: transaction.type === "expense" ? "expense" : "income",
    category: transaction.category || "Uncategorised",
    taxTreatment: transaction.taxTreatment || "review",
    source: transaction.source || "manual",
    status: transaction.status || "approved",
    notes: transaction.notes || "",
  };
}

transactions = transactions.map(normalizeTransactionRecord);

function normalizeDocumentRecord(document) {
  return {
    ...document,
    id: document.id || createId("document"),
    propertyId: document.propertyId || "",
    label: document.label || "Document",
    documentType: document.documentType || "Other",
    fileName: document.fileName || "",
    fileSize: Number(document.fileSize || 0),
    mimeType: document.mimeType || "",
    storagePath: document.storagePath || "",
    expiryDate: document.expiryDate || "",
    reminderEnabled: document.reminderEnabled === true,
    pageCount: Math.min(Math.max(Number(document.pageCount || 1), 1), 5),
    aiStatus: document.aiStatus || "not_requested",
    paymentStatus: document.paymentStatus || document.aiResult?.paymentStatus || "not_applicable",
    linkedTransactionId: document.linkedTransactionId || "",
    aiResult: document.aiResult || null,
    aiError: document.aiError || "",
    aiScannedAt: document.aiScannedAt || "",
    aiScanStartedAt: document.aiScanStartedAt || "",
    createdAt: document.createdAt || new Date().toISOString(),
  };
}

documents = documents.map(normalizeDocumentRecord);

function isPersistedProperty(property) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(property.id || "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function externalHttpUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function formatDate(dateString) {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(
    new Date(dateString),
  );
}

function moneyFromPence(pence) {
  return money.format((Number(pence) || 0) / 100);
}

function valueOf(input) {
  return Number(input.value) || 0;
}

function daysUntil(dateString) {
  const today = new Date();
  const target = new Date(`${dateString}T12:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function dateValue(dateString) {
  return dateString ? new Date(`${dateString}T12:00:00`).getTime() : 0;
}

function latestMortgageDeal(property) {
  const latestRemortgage = [...(property.remortgages || [])].sort((a, b) => {
    const bDate = dateValue(b.startDate) || dateValue(b.expiryDate);
    const aDate = dateValue(a.startDate) || dateValue(a.expiryDate);
    return bDate - aDate;
  })[0];

  if (latestRemortgage) {
    return {
      productType: latestRemortgage.productType || property.mortgageProductType || "Fixed",
      rate: Number(latestRemortgage.rate ?? property.rate) || 0,
      balance: Number(latestRemortgage.balance ?? property.mortgageBalance) || 0,
      expiryDate: latestRemortgage.expiryDate || property.mortgageExpiry,
      termMonths: latestRemortgage.termMonths,
      equityRelease: Number(latestRemortgage.equityRelease || 0),
      valuation: Number(latestRemortgage.valuation || 0),
      notes: latestRemortgage.notes || "",
      source: "remortgage",
    };
  }

  return {
    productType: property.mortgageProductType || "Fixed",
    rate: Number(property.rate || 0),
    balance: Number(property.mortgageBalance || 0),
    expiryDate: property.mortgageExpiry,
    termMonths: null,
    equityRelease: 0,
    valuation: Number(property.currentValue || 0),
    notes: "",
    source: "property",
  };
}

function propertyCashflow(property) {
  const mortgageDeal = latestMortgageDeal(property);
  const mortgageInterest = mortgageDeal.balance * (mortgageDeal.rate / 100 / 12);
  return property.rent - property.expenses - mortgageInterest;
}

function transactionPropertyName(propertyId) {
  return properties.find((property) => property.id === propertyId)?.name || "Unassigned";
}

function renderTransactionPropertyOptions() {
  if (!premium.transactionProperty) return;

  premium.transactionProperty.replaceChildren(
    new Option("General portfolio", ""),
    ...properties.map((property) => new Option(property.name, property.id)),
  );

  if (premium.transactionFilterProperty) {
    const currentValue = premium.transactionFilterProperty.value || "all";
    premium.transactionFilterProperty.replaceChildren(
      new Option("All properties", "all"),
      new Option("General portfolio", ""),
      ...properties.map((property) => new Option(property.name, property.id)),
    );
    premium.transactionFilterProperty.value = [...premium.transactionFilterProperty.options].some(
      (option) => option.value === currentValue,
    )
      ? currentValue
      : "all";
  }
}

function renderDocumentPropertyOptions() {
  if (!premium.documentProperty) return;

  premium.documentProperty.replaceChildren(
    ...properties.map((property) => {
      const option = document.createElement("option");
      option.value = property.id;
      option.textContent = property.name;
      return option;
    }),
  );
}

function quarterKey(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  const quarter = Math.floor(date.getMonth() / 3) + 1;
  return `${date.getFullYear()} Q${quarter}`;
}

function currentQuarterKey() {
  return quarterKey(new Date().toISOString().slice(0, 10));
}

function monthKey(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function currentMonthLabel() {
  return new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date());
}

function currentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function isDateInRange(dateString, startDate, endDate) {
  if (!dateString) return false;
  if (startDate && dateString < startDate) return false;
  if (endDate && dateString > endDate) return false;
  return true;
}

function renderQuarterSummary() {
  if (!premium.quarterSummary) return;

  const activeQuarter = currentQuarterKey();
  const quarterTransactions = transactions.filter((transaction) => quarterKey(transaction.date) === activeQuarter);
  const approvedTransactions = quarterTransactions.filter((transaction) => transaction.status === "approved");
  const income = approvedTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenses = approvedTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const reviewCount = quarterTransactions.filter((transaction) => transaction.status !== "approved").length;

  premium.quarterSummary.replaceChildren(
    ...[
      ["Quarter", activeQuarter],
      ["Income", money.format(income)],
      ["Expenses", money.format(expenses)],
      ["Net", money.format(income - expenses)],
      ["Needs review", String(reviewCount)],
    ].map(([label, value]) => {
      const item = document.createElement("div");
      item.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
      return item;
    }),
  );
}

function currentQuarterRange() {
  const now = new Date();
  const quarter = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), quarter * 3, 1);
  const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    label: `Q${quarter + 1} ${now.getFullYear()}`,
  };
}

function transactionCsvRows(rows) {
  return rows.map((transaction) => ({
    date: transaction.date,
    property: transactionPropertyName(transaction.propertyId),
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    tax_treatment: transaction.taxTreatment,
    status: transaction.status,
    source: transaction.source,
    notes: transaction.notes || "",
  }));
}

function downloadTransactionsCsv(rows, fileName) {
  const headers = ["date", "property", "type", "amount", "category", "tax_treatment", "status", "source", "notes"];
  const csv = [
    headers.join(","),
    ...transactionCsvRows(rows).map((row) =>
      headers
        .map((header) => `"${String(row[header] ?? "").replaceAll('"', '""')}"`)
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadJson(payload, fileName) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadText(contents, fileName, type = "text/plain;charset=utf-8") {
  const blob = new Blob([contents], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function quarterTransactions() {
  const range = currentQuarterRange();
  return transactions
    .filter((transaction) => transaction.date >= range.start && transaction.date <= range.end);
}

function exportQuarterPackCsv() {
  if (!hasProAccess()) {
    premium.subscriptionNote.textContent = "Quarterly accountant exports are included in PropertyPanel Pro.";
    switchDashboardTab("subscription");
    return;
  }

  const range = currentQuarterRange();
  const rows = quarterTransactions();

  downloadTransactionsCsv(rows, `propertypanel-${range.label.toLowerCase().replace(" ", "-")}-accountant-pack.csv`);
  trackEvent("quarter_pack_exported", { quarter: range.label, rows: rows.length });
}

function filteredTransactionsForDashboard() {
  const search = (premium.transactionSearch?.value || "").trim().toLowerCase();
  const propertyId = premium.transactionFilterProperty?.value ?? "all";
  const type = premium.transactionFilterType?.value || "all";
  const status = premium.transactionFilterStatus?.value || "all";

  return transactions.filter((transaction) => {
    const propertyName = transactionPropertyName(transaction.propertyId);
    const matchesSearch =
      !search ||
      [transaction.category, propertyName, transaction.notes, transaction.source, transaction.taxTreatment, transaction.status]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesProperty = propertyId === "all" || transaction.propertyId === propertyId;
    const matchesType = type === "all" || transaction.type === type;
    const matchesStatus = status === "all" || transaction.status === status;
    return matchesSearch && matchesProperty && matchesType && matchesStatus;
  });
}

function renderTransactions() {
  if (!premium.transactionList) return;

  localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
  renderTransactionPropertyOptions();
  if (premium.transactionDate && !premium.transactionDate.value) {
    premium.transactionDate.value = new Date().toISOString().slice(0, 10);
  }

  const visibleTransactions = filteredTransactionsForDashboard();

  if (!transactions.length) {
    premium.transactionList.innerHTML = '<p class="field-hint">No transactions yet. Add rent or expenses here to build the quarterly report.</p>';
    renderQuarterSummary();
    return;
  }

  if (!visibleTransactions.length) {
    premium.transactionList.innerHTML = '<p class="field-hint">No transactions match these filters.</p>';
    renderQuarterSummary();
    return;
  }

  premium.transactionList.replaceChildren(
    ...visibleTransactions.slice(0, 24).map((transaction) => {
      const row = document.createElement("article");
      row.className = "transaction-row";
      const detail = document.createElement("div");
      const meta = document.createElement("span");
      const category = document.createElement("strong");
      const status = document.createElement("small");
      const amount = document.createElement("div");
      const actions = document.createElement("div");
      const editButton = document.createElement("button");
      const deleteButton = document.createElement("button");

      meta.textContent = `${formatDate(transaction.date)} · ${transactionPropertyName(transaction.propertyId)}`;
      category.textContent = transaction.category;
      status.textContent = `${transaction.taxTreatment} · ${transaction.status}${transaction.notes ? ` · ${transaction.notes}` : ""}`;
      amount.className = `transaction-amount ${transaction.type === "expense" ? "expense" : "income"}`;
      amount.textContent = `${transaction.type === "expense" ? "-" : "+"}${money.format(transaction.amount)}`;
      actions.className = "detail-actions";
      if (transaction.status !== "approved") {
        const approveButton = document.createElement("button");
        approveButton.className = "tax-button small-button";
        approveButton.type = "button";
        approveButton.dataset.approveTransaction = transaction.id;
        approveButton.textContent = "Approve";
        actions.append(approveButton);
      }
      editButton.className = "secondary-button small-button";
      editButton.type = "button";
      editButton.dataset.editTransaction = transaction.id;
      editButton.textContent = "Edit";
      deleteButton.className = "secondary-button small-button danger-button";
      deleteButton.type = "button";
      deleteButton.dataset.deleteTransaction = transaction.id;
      deleteButton.textContent = "Delete";

      detail.append(meta, category, status);
      actions.append(editButton, deleteButton);
      row.append(detail, amount, actions);
      return row;
    }),
  );
  renderQuarterSummary();
}

function documentPropertyName(propertyId) {
  return properties.find((property) => property.id === propertyId)?.name || "No property";
}

function fileSizeLabel(size) {
  const bytes = Number(size || 0);
  if (!bytes) return "-";
  if (bytes < 1024 * 1024) return `${Math.ceil(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function paymentStatusLabel(status) {
  if (status === "paid") return "Paid";
  if (status === "unpaid") return "Unpaid";
  return "Not applicable";
}

function dateFromInput(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day, 12);
}

function dateInputValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateForMonth(year, month, day) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(Math.max(Number(day) || 1, 1), lastDay), 12);
}

function addMonths(date, months) {
  return dateForMonth(date.getFullYear(), date.getMonth() + months, date.getDate());
}

function calculatedMortgageEndDate(startDate, termMonths) {
  const start = dateFromInput(startDate);
  const months = Number(termMonths || 0);
  if (!start || !months) return "";
  const endDate = addMonths(start, months);
  endDate.setDate(endDate.getDate() - 1);
  return dateInputValue(endDate);
}

function updateMortgageEndFromTerm({ force = false } = {}) {
  const calculatedEnd = calculatedMortgageEndDate(
    document.querySelector("#detailMortgageStart").value,
    document.querySelector("#detailMortgageTermMonths").value,
  );
  const endInput = document.querySelector("#detailMortgageEnd");
  if (calculatedEnd && (force || !endInput.value || endInput.dataset.autoCalculated === "true")) {
    endInput.value = calculatedEnd;
    endInput.dataset.autoCalculated = "true";
  }
}

function propertyAddressLabel(property) {
  return [property.addressLine1, property.addressLine2, property.town, property.postcode].filter(Boolean).join(", ") || property.name;
}

function propertyNotesPayload(property) {
  const metadata = {
    landlordName: property.landlordName || "",
    documents: property.documents || "",
  };
  return `PROPERTY_PANEL_META:${JSON.stringify(metadata)}`;
}

function parsePropertyNotes(notes) {
  if (!notes || !String(notes).startsWith("PROPERTY_PANEL_META:")) {
    return { landlordName: "", documents: notes || "" };
  }

  try {
    const metadata = JSON.parse(String(notes).replace("PROPERTY_PANEL_META:", ""));
    return {
      landlordName: metadata.landlordName || "",
      documents: metadata.documents || "",
    };
  } catch {
    return { landlordName: "", documents: "" };
  }
}

function contactFromTenant(tenant) {
  return [tenant.phone, tenant.email].filter(Boolean).join(" / ");
}

function primaryTenant(tenancy) {
  return (tenancy.tenants || []).find((tenant) => tenant.name || tenant.phone || tenant.email) || {
    name: tenancy.tenantName || "",
    phone: tenancy.tenantContact && !tenancy.tenantContact.includes("@") ? tenancy.tenantContact : "",
    email: tenancy.tenantContact && tenancy.tenantContact.includes("@") ? tenancy.tenantContact : "",
    previousAddress: "",
  };
}

function parseTenancyDocuments(documentNames = []) {
  const names = Array.isArray(documentNames) ? documentNames : [];
  const metadataEntry = names.find((name) => String(name).startsWith(TENANCY_META_PREFIX));
  const documents = names.filter((name) => !String(name).startsWith(TENANCY_META_PREFIX));

  if (!metadataEntry) {
    return { documents, tenants: [], guarantor: { name: "", phone: "", email: "" } };
  }

  try {
    const metadata = JSON.parse(String(metadataEntry).replace(TENANCY_META_PREFIX, ""));
    return {
      documents,
      tenants: Array.isArray(metadata.tenants) ? metadata.tenants : [],
      guarantor: metadata.guarantor || { name: "", phone: "", email: "" },
    };
  } catch {
    return { documents, tenants: [], guarantor: { name: "", phone: "", email: "" } };
  }
}

function normalizeTenantRecord(tenant = {}) {
  return {
    id: tenant.id || createId("tenant"),
    name: tenant.name || "",
    phone: tenant.phone || "",
    email: tenant.email || "",
    previousAddress: tenant.previousAddress || "",
  };
}

function normalizeTenancyRecord(tenancy = {}) {
  const parsedDocuments = parseTenancyDocuments(tenancy.documents || tenancy.document_names || []);
  const fallbackTenant = {
    name: tenancy.tenantName || "",
    phone: tenancy.tenantContact && !String(tenancy.tenantContact).includes("@") ? tenancy.tenantContact : "",
    email: tenancy.tenantContact && String(tenancy.tenantContact).includes("@") ? tenancy.tenantContact : "",
    previousAddress: "",
  };
  const tenants = (parsedDocuments.tenants.length ? parsedDocuments.tenants : tenancy.tenants || [fallbackTenant])
    .map(normalizeTenantRecord)
    .filter((tenant) => tenant.name || tenant.phone || tenant.email || tenant.previousAddress);
  const leadTenant = tenants[0] || normalizeTenantRecord(fallbackTenant);
  const guarantor = tenancy.guarantor || parsedDocuments.guarantor || {};

  return {
    ...tenancy,
    tenantName: leadTenant.name || tenancy.tenantName || "",
    tenantContact: contactFromTenant(leadTenant) || tenancy.tenantContact || "",
    tenants,
    guarantor: {
      name: guarantor.name || "",
      phone: guarantor.phone || "",
      email: guarantor.email || "",
    },
    rentChanges: (tenancy.rentChanges || []).map((change) => ({
      ...change,
      id: change.id || createId("rent-change"),
      effectiveDate: change.effectiveDate || "",
      rent: Number(change.rent || 0),
    })).sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate)),
    documents: parsedDocuments.documents,
  };
}

function parseRemortgageNotes(notes = "") {
  if (!notes || !String(notes).startsWith(REMORTGAGE_META_PREFIX)) {
    return { notes: notes || "", valuation: 0 };
  }

  try {
    const metadata = JSON.parse(String(notes).replace(REMORTGAGE_META_PREFIX, ""));
    return {
      notes: metadata.notes || "",
      valuation: Number(metadata.valuation || 0),
    };
  } catch {
    return { notes: "", valuation: 0 };
  }
}

function remortgageNotesPayload(remortgage) {
  if (!remortgage.valuation) return remortgage.notes || null;
  return `${REMORTGAGE_META_PREFIX}${JSON.stringify({
    notes: remortgage.notes || "",
    valuation: Number(remortgage.valuation || 0),
  })}`;
}

function normalizeRemortgageRecord(remortgage = {}) {
  const parsedNotes = parseRemortgageNotes(remortgage.notes || "");
  return {
    ...remortgage,
    valuation: Number(remortgage.valuation || parsedNotes.valuation || 0),
    notes: remortgage.notes && String(remortgage.notes).startsWith(REMORTGAGE_META_PREFIX)
      ? parsedNotes.notes
      : remortgage.notes || "",
  };
}

function tenancyDocumentsPayload(tenancy) {
  const metadata = {
    tenants: (tenancy.tenants || []).map(normalizeTenantRecord),
    guarantor: tenancy.guarantor || { name: "", phone: "", email: "" },
  };
  return [...(tenancy.documents || []), `${TENANCY_META_PREFIX}${JSON.stringify(metadata)}`];
}

function documentActionButtons(documentRecord) {
  return `
    <button class="secondary-button small-button" type="button" data-download-document="${escapeHtml(documentRecord.id)}">Open</button>
  `;
}

function renderDocuments() {
  if (!premium.documentList) return;

  localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
  const property = activeProperty();
  const visibleDocuments = property ? documents.filter((documentRecord) => documentRecord.propertyId === property.id) : documents;
  if (premium.documentCount) {
    premium.documentCount.textContent = `${visibleDocuments.length} ${visibleDocuments.length === 1 ? "file" : "files"}`;
  }

  if (!properties.length) {
    premium.documentList.innerHTML = '<p class="field-hint">Add a property before uploading documents.</p>';
    if (premium.documentMessage) premium.documentMessage.textContent = "Documents attach to a saved property.";
    return;
  }

  if (premium.documentMessage) {
    premium.documentMessage.textContent = hasProAccess()
      ? "Documents and manual costs are saved against this property."
      : "Documents are saved against this property. Upgrade to Pro to enable expiry reminders.";
  }
  if (premium.documentReminder) {
    premium.documentReminder.disabled = !hasProAccess();
    if (!hasProAccess()) premium.documentReminder.checked = false;
  }

  if (!visibleDocuments.length) {
    if (premium.documentActionBar) premium.documentActionBar.replaceChildren();
    premium.documentList.innerHTML = '<p class="field-hint">No documents saved for this property yet.</p>';
    return;
  }

  if (premium.documentActionBar) {
    const latestDocument = visibleDocuments[0];
    premium.documentActionBar.innerHTML = `
      <div>
        <span>Latest document</span>
        <strong>${escapeHtml(latestDocument.label)}</strong>
        <small>${escapeHtml(documentPropertyName(latestDocument.propertyId))} · ${escapeHtml(latestDocument.documentType)} · ${escapeHtml(latestDocument.fileName || "File")}</small>
      </div>
      <div class="detail-actions">
        ${documentActionButtons(latestDocument)}
      </div>
    `;
  }

  const heading = document.createElement("div");
  heading.className = "document-row document-row-head";
  heading.innerHTML = `
    <span>Document</span>
    <span>Type</span>
    <span>Status</span>
    <span>Actions</span>
  `;

  premium.documentList.replaceChildren(
    heading,
    ...visibleDocuments.map((documentRecord) => {
      const row = document.createElement("div");
      row.className = "document-row";
      row.dataset.documentRow = documentRecord.id;
      const fileSummary = documentRecord.pageCount
        ? `${documentRecord.pageCount} page${documentRecord.pageCount === 1 ? "" : "s"}`
        : fileSizeLabel(documentRecord.fileSize);

      row.innerHTML = `
        <span>${escapeHtml(documentRecord.label)}<small>${escapeHtml(documentRecord.documentType)} · ${escapeHtml(documentRecord.fileName || "File")} · ${escapeHtml(fileSizeLabel(documentRecord.fileSize))}</small></span>
        <span>${escapeHtml(documentRecord.documentType)}<small>${documentRecord.expiryDate ? `Expires ${escapeHtml(formatDate(documentRecord.expiryDate))}` : "No expiry"}</small></span>
        <strong>${escapeHtml(paymentStatusLabel(documentRecord.paymentStatus))}<small>${escapeHtml(fileSummary)}</small></strong>
        <div class="detail-actions">
          ${documentActionButtons(documentRecord)}
          <button class="secondary-button small-button danger-button" type="button" data-delete-document="${escapeHtml(documentRecord.id)}">Delete</button>
        </div>
      `;
      return row;
    }),
  );
}

function resetTransactionForm() {
  editingTransactionId = null;
  premium.transactionForm.reset();
  premium.transactionDate.value = new Date().toISOString().slice(0, 10);
  premium.transactionForm.querySelector("button[type='submit']").textContent = "Save transaction";
}

function tenancyNoteMarker(tenancyId) {
  return `[tenancy:${tenancyId}]`;
}

function transactionTenancyId(transaction) {
  if (transaction.tenancyId) return transaction.tenancyId;
  return String(transaction.notes || "").match(/\[tenancy:([^\]]+)\]/)?.[1] || "";
}

function tenancyRentTransactions(tenancyId) {
  return transactions
    .filter((transaction) => transactionTenancyId(transaction) === tenancyId)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)));
}

function tenancyRentForDate(tenancy, dueDate) {
  return (tenancy.rentChanges || [])
    .filter((change) => change.effectiveDate && change.effectiveDate <= dueDate)
    .reduce((amount, change) => Number(change.rent || amount), Number(tenancy.rent || 0));
}

function currentTenancyRent(tenancy) {
  return tenancyRentForDate(tenancy, new Date().toISOString().slice(0, 10));
}

function tenancyRentDueDates(property, tenancy) {
  const startDate = dateFromInput(tenancy.startDate);
  if (!startDate) return [];

  const explicitEndDate = dateFromInput(tenancy.endDate);
  const fallbackEndDate = dateForMonth(startDate.getFullYear(), startDate.getMonth() + 11, property.rentDueDay || startDate.getDate());
  const endDate = explicitEndDate || fallbackEndDate;
  const dueDay = Number(property.rentDueDay || startDate.getDate() || 1);
  const dueDates = [];
  let dueDate = dateForMonth(startDate.getFullYear(), startDate.getMonth(), dueDay);

  if (dueDate < startDate) {
    dueDate = dateForMonth(startDate.getFullYear(), startDate.getMonth() + 1, dueDay);
  }

  while (dueDate <= endDate && dueDates.length < 120) {
    dueDates.push(dateInputValue(dueDate));
    dueDate = dateForMonth(dueDate.getFullYear(), dueDate.getMonth() + 1, dueDay);
  }

  return dueDates;
}

function buildTenancyRentTransaction(property, tenancy, dueDate, existingTransaction = null) {
  const marker = tenancyNoteMarker(tenancy.id);
  return normalizeTransactionRecord({
    ...(existingTransaction || {}),
    id: existingTransaction?.id || createId("transaction"),
    propertyId: property.id,
    tenancyId: tenancy.id,
    date: dueDate,
    amount: Number(tenancyRentForDate(tenancy, dueDate) || property.rent || 0),
    type: "income",
    category: tenancy.tenantName ? `Rent - ${tenancy.tenantName}` : "Rent due",
    taxTreatment: "revenue",
    source: "manual",
    status: existingTransaction?.status || "draft",
    notes: existingTransaction?.notes?.includes(marker)
      ? existingTransaction.notes
      : `${tenancy.tenantName || "Tenant"} rent schedule ${marker}`,
  });
}

async function syncTenancyRentSchedule(property, tenancy) {
  if (!tenancy?.id) return;
  if (!tenancy.startDate || !Number(tenancy.rent || 0)) {
    await deleteTenancyRentSchedule(tenancy.id);
    return;
  }

  const dueDates = tenancyRentDueDates(property, tenancy);
  const dueDateSet = new Set(dueDates);
  const existingTransactions = tenancyRentTransactions(tenancy.id);
  const existingByDate = new Map(existingTransactions.map((transaction) => [transaction.date, transaction]));

  for (const dueDate of dueDates) {
    const existingTransaction = existingByDate.get(dueDate);
    const scheduledTransaction = buildTenancyRentTransaction(property, tenancy, dueDate, existingTransaction);
    const canRefreshExisting =
      existingTransaction &&
      existingTransaction.status !== "approved" &&
      existingTransaction.date >= new Date().toISOString().slice(0, 10);
    if (canRefreshExisting) {
      Object.assign(existingTransaction, scheduledTransaction);
      await updateTransactionInSupabase(existingTransaction);
    } else if (!existingTransaction) {
      const savedId = await saveTransactionToSupabase(scheduledTransaction);
      if (savedId) scheduledTransaction.id = savedId;
      transactions = [scheduledTransaction, ...transactions];
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const transactionsToDelete = existingTransactions.filter(
    (transaction) => !dueDateSet.has(transaction.date) && transaction.status !== "approved" && transaction.date >= today,
  );
  for (const transaction of transactionsToDelete) {
    await deleteTransactionFromSupabase(transaction.id);
  }
  if (transactionsToDelete.length) {
    const deleteIds = new Set(transactionsToDelete.map((transaction) => transaction.id));
    transactions = transactions.filter((transaction) => !deleteIds.has(transaction.id));
  }
}

async function deleteTenancyRentSchedule(tenancyId) {
  const today = new Date().toISOString().slice(0, 10);
  const linkedTransactions = tenancyRentTransactions(tenancyId).filter(
    (transaction) => transaction.status !== "approved" && transaction.date >= today,
  );
  for (const transaction of linkedTransactions) {
    await deleteTransactionFromSupabase(transaction.id);
  }
  const linkedIds = new Set(linkedTransactions.map((transaction) => transaction.id));
  transactions = transactions.filter((transaction) => !linkedIds.has(transaction.id));
}

function createReportMetric(label, value) {
  const item = document.createElement("div");
  const labelElement = document.createElement("span");
  const valueElement = document.createElement("strong");
  labelElement.textContent = label;
  valueElement.textContent = value;
  item.append(labelElement, valueElement);
  return item;
}

function ensurePropertyDetailFilterDefaults() {
  const range = currentMonthRange();
  if (premium.propertyExpenseFrom && !premium.propertyExpenseFrom.value) premium.propertyExpenseFrom.value = range.start;
  if (premium.propertyExpenseTo && !premium.propertyExpenseTo.value) premium.propertyExpenseTo.value = range.end;
  if (premium.propertyReportFrom && !premium.propertyReportFrom.value) premium.propertyReportFrom.value = range.start;
  if (premium.propertyReportTo && !premium.propertyReportTo.value) premium.propertyReportTo.value = range.end;
}

function propertyTransactionsForRange(property, startDate, endDate) {
  return transactions.filter(
    (transaction) =>
      transaction.propertyId === property.id &&
      isDateInRange(transaction.date, startDate, endDate),
  );
}

function transactionMatchesSearch(transaction, search) {
  if (!search) return true;
  return [transaction.category, transaction.notes, transaction.source, transaction.taxTreatment, transaction.status]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function filteredPropertyTransactions(property) {
  ensurePropertyDetailFilterDefaults();

  const search = (premium.propertyExpenseSearch?.value || "").trim().toLowerCase();
  const type = premium.propertyExpenseType?.value || "all";
  const status = premium.propertyExpenseStatus?.value || "all";
  const startDate = premium.propertyExpenseFrom?.value || "";
  const endDate = premium.propertyExpenseTo?.value || "";

  return propertyTransactionsForRange(property, startDate, endDate)
    .filter((transaction) => type === "all" || transaction.type === type)
    .filter((transaction) => status === "all" || transaction.status === status)
    .filter((transaction) => transactionMatchesSearch(transaction, search))
    .sort((a, b) => dateValue(b.date) - dateValue(a.date));
}

function renderPropertyExpenses(property) {
  if (!premium.propertyExpenseList) return;
  const filteredTransactions = filteredPropertyTransactions(property);
  const visibleDraftCount = filteredTransactions.filter((transaction) => transaction.status !== "approved").length;
  if (premium.approvePropertyDrafts) {
    premium.approvePropertyDrafts.disabled = visibleDraftCount === 0;
    premium.approvePropertyDrafts.textContent = visibleDraftCount
      ? `Approve visible drafts (${visibleDraftCount})`
      : "Approve visible drafts";
  }
  if (premium.exportPropertyTransactions) {
    premium.exportPropertyTransactions.disabled = filteredTransactions.length === 0;
  }

  if (!filteredTransactions.length) {
    premium.propertyExpenseList.innerHTML = `<div class="detail-row muted-row">No matching transactions for this property</div>`;
    return;
  }

  premium.propertyExpenseList.replaceChildren(
    ...filteredTransactions.map((transaction) => {
      const row = document.createElement("div");
      row.className = "detail-row property-transaction-row";
      row.innerHTML = `
        <div><span>Date</span><strong>${formatDate(transaction.date)}</strong></div>
        <div><span>Type</span><strong>${escapeHtml(transaction.type)}</strong></div>
        <div><span>Category</span><strong>${escapeHtml(transaction.category)}</strong></div>
        <div><span>Amount</span><strong class="transaction-amount ${transaction.type === "expense" ? "expense" : "income"}">${transaction.type === "expense" ? "-" : "+"}${money.format(transaction.amount)}</strong></div>
        <div><span>Status</span><strong>${escapeHtml(transaction.status)}</strong></div>
        <div><span>Tax</span><strong>${escapeHtml(transaction.taxTreatment)}</strong></div>
        <div><span>Source</span><strong>${escapeHtml(transaction.source)}</strong></div>
        <div><span>Notes</span><strong>${escapeHtml(transaction.notes || "-")}</strong></div>
        <div class="detail-actions property-transaction-actions">
          ${transaction.status !== "approved" ? `<button class="tax-button small-button" type="button" data-approve-property-transaction="${transaction.id}">Approve</button>` : ""}
          <button class="secondary-button small-button" type="button" data-edit-property-transaction="${transaction.id}">Edit</button>
          <button class="secondary-button small-button danger-button" type="button" data-delete-property-transaction="${transaction.id}">Delete</button>
        </div>
      `;
      return row;
    }),
  );
}

function exportPropertyTransactionsCsv(property) {
  const rows = filteredPropertyTransactions(property);
  if (!rows.length) return;

  downloadTransactionsCsv(rows, `${property.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-transactions.csv`);
}

function loadTransactionIntoForm(transaction) {
  editingTransactionId = transaction.id;
  premium.transactionProperty.value = transaction.propertyId || "";
  premium.transactionDate.value = transaction.date || new Date().toISOString().slice(0, 10);
  premium.transactionAmount.value = transaction.amount || "";
  premium.transactionType.value = transaction.type || "income";
  premium.transactionCategory.value = transaction.category || "";
  premium.transactionTaxTreatment.value = transaction.taxTreatment || "review";
  premium.transactionStatus.value = transaction.status || "approved";
  premium.transactionNotes.value = transaction.notes || "";
  premium.transactionForm.querySelector("button[type='submit']").textContent = "Update transaction";
}

function printActiveLandlordReport() {
  const property = activeProperty();
  if (!property) return;
  const includeDocuments = confirmIncludePropertyDocuments(property);
  document.body.classList.add("print-landlord-report");
  document.body.dataset.printPropertyName = property.name;
  renderLandlordReport(property);
  renderPrintDocumentAppendix(includeDocuments ? [property] : []);
  window.print();
}

function confirmIncludePropertyDocuments(property = null) {
  const relatedDocuments = property
    ? documents.filter((document) => document.propertyId === property.id)
    : documents;
  if (!relatedDocuments.length) return false;
  const target = property ? ` for ${property.name}` : " for saved properties";
  return window.confirm(`Include a document list${target} in this PDF export?`);
}

function renderPrintDocumentAppendix(targetProperties = []) {
  document.querySelector("#printDocumentAppendix")?.remove();
  if (!targetProperties.length) return;

  const propertiesWithDocuments = targetProperties
    .map((property) => ({
      property,
      relatedDocuments: documents.filter((document) => document.propertyId === property.id),
    }))
    .filter((item) => item.relatedDocuments.length);

  if (!propertiesWithDocuments.length) return;

  const appendix = document.createElement("section");
  appendix.id = "printDocumentAppendix";
  appendix.className = "print-document-appendix";
  appendix.innerHTML = `
    <h2>Attached property documents</h2>
    ${propertiesWithDocuments
      .map(
        ({ property, relatedDocuments }) => `
          <section class="print-document-property">
            <h3>${escapeHtml(property.name)}</h3>
            <div class="print-document-list">
              ${relatedDocuments
        .map(
          (document) => `
            <div>
              <strong>${escapeHtml(document.label)}</strong>
              <span>${escapeHtml(document.documentType)} · ${escapeHtml(document.fileName || "File")} · ${escapeHtml(fileSizeLabel(document.fileSize))}</span>
              <span>${document.expiryDate ? `Expires ${formatDate(document.expiryDate)}` : "No expiry date"}</span>
            </div>
          `,
        )
        .join("")}
            </div>
          </section>
        `,
      )
      .join("")}
  `;
  document.body.append(appendix);
}

function renderLandlordReport(property) {
  if (!premium.landlordReport) return;

  ensurePropertyDetailFilterDefaults();
  const startDate = premium.propertyReportFrom?.value || "";
  const endDate = premium.propertyReportTo?.value || "";
  const includeRent = premium.reportIncludeRent?.checked !== false;
  const includeMortgage = premium.reportIncludeMortgage?.checked !== false;
  const includeExpenses = premium.reportIncludeExpenses?.checked !== false;
  const includeTenancies = premium.reportIncludeTenancies?.checked !== false;
  const reportSearch = (premium.propertyReportSearch?.value || "").trim().toLowerCase();
  const reportTransactions = propertyTransactionsForRange(property, startDate, endDate)
    .filter((transaction) => transactionMatchesSearch(transaction, reportSearch));
  const rentReceived = reportTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const expenseTotal = reportTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const repairCharges = reportTransactions
    .filter((transaction) => {
      const category = transaction.category.toLowerCase();
      return transaction.type === "expense" && (category.includes("repair") || category.includes("maintenance"));
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const guaranteedRent = Number(property.guaranteedRent || 0);
  const maintenanceFee =
    property.maintenanceModel === "Operator covers repairs for monthly fee" ? Number(property.maintenanceFee || 0) : 0;
  const landlordRepairCharge =
    property.maintenanceModel === "Landlord charged for repairs" ? repairCharges : 0;
  const mortgageDeal = latestMortgageDeal(property);
  const mortgageInterest = mortgageDeal.balance * (mortgageDeal.rate / 100 / 12);
  const landlordGrossRent = guaranteedRent || rentReceived || Number(property.rent || 0);
  const netPayable = landlordGrossRent - landlordRepairCharge - maintenanceFee;
  const periodLabel = [startDate ? formatDate(startDate) : "", endDate ? formatDate(endDate) : ""].filter(Boolean).join(" to ") || currentMonthLabel();
  const reportIntro = document.createElement("div");
  reportIntro.className = "landlord-report-intro";
  reportIntro.append(
    createReportMetric("Landlord", property.landlordName || "-"),
    createReportMetric("Property", property.name || "-"),
    createReportMetric("Address", propertyAddressLabel(property)),
  );

  const metrics = document.createElement("div");
  metrics.className = "landlord-report-metrics";
  const metricItems = [
    createReportMetric("Period", periodLabel),
    createReportMetric("Model", property.ownershipModel || "Owned"),
  ];
  if (includeRent) {
    metricItems.push(
      createReportMetric("Rent received", money.format(rentReceived)),
      createReportMetric("Guaranteed rent", guaranteedRent ? money.format(guaranteedRent) : "-"),
    );
  }
  if (includeMortgage) {
    metricItems.push(
      createReportMetric("Mortgage rate", `${Number(mortgageDeal.rate || 0).toFixed(2)}%`),
      createReportMetric("Est. monthly interest", money.format(mortgageInterest)),
    );
  }
  if (includeExpenses) {
    metricItems.push(
      createReportMetric("Expenses", money.format(expenseTotal)),
      createReportMetric("Repair deductions", money.format(landlordRepairCharge)),
      createReportMetric("Maintenance fee", money.format(maintenanceFee)),
    );
  }
  metricItems.push(createReportMetric("Net payable to landlord", money.format(netPayable)));
  metrics.append(...metricItems);

  const note = document.createElement("p");
  note.className = "field-hint";
  note.textContent =
    property.maintenanceModel === "Operator covers repairs for monthly fee"
      ? "This report uses the fixed monthly maintenance fee, so individual repair expenses are not deducted from the landlord payment."
      : "This report deducts repair and maintenance expenses tagged in transactions for this property.";

  const transactionList = document.createElement("div");
  transactionList.className = "document-list landlord-report-lines";
  const relevantTransactions = reportTransactions.filter(
    (transaction) => {
      const category = transaction.category.toLowerCase();
      if (includeRent && transaction.type === "income") return true;
      return includeExpenses && (category.includes("repair") || category.includes("maintenance") || transaction.type === "expense");
    },
  );

  if (relevantTransactions.length) {
    relevantTransactions.forEach((transaction) => {
      const item = document.createElement("div");
      const label = document.createElement("span");
      const value = document.createElement("strong");
      label.textContent = `${formatDate(transaction.date)} · ${transaction.category}`;
      value.textContent = `${transaction.type === "expense" ? "-" : "+"}${money.format(transaction.amount)}`;
      item.append(label, value);
      transactionList.append(item);
    });
  } else {
    const empty = document.createElement("div");
    const label = document.createElement("span");
    const value = document.createElement("strong");
    label.textContent = "No rent or repair transactions recorded for this month";
    value.textContent = "Add transactions";
    empty.append(label, value);
    transactionList.append(empty);
  }

  const sections = [reportIntro, metrics, note, transactionList];
  if (includeTenancies) {
    const tenancyList = document.createElement("div");
    tenancyList.className = "document-list landlord-report-lines";
    const visibleTenancies = (property.tenancies || []).filter((tenancy) => {
      const tenants = (tenancy.tenants || []).length ? tenancy.tenants : [primaryTenant(tenancy)];
      const tenantSearchText = tenants
        .flatMap((tenant) => [tenant.name, tenant.phone, tenant.email, tenant.previousAddress])
        .join(" ");
      if (!reportSearch) return true;
      return [
        tenancy.tenantName,
        tenancy.tenantContact,
        tenantSearchText,
        tenancy.guarantor?.name,
        tenancy.guarantor?.phone,
        tenancy.guarantor?.email,
        tenancy.notes,
      ]
        .join(" ")
        .toLowerCase()
        .includes(reportSearch);
    });
    if (visibleTenancies.length) {
      visibleTenancies.forEach((tenancy) => {
        const item = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("strong");
        const tenants = (tenancy.tenants || []).length ? tenancy.tenants : [primaryTenant(tenancy)];
        const tenantSummary = tenants
          .map((tenant) => `${tenant.name || "Tenant"}${contactFromTenant(tenant) ? ` (${contactFromTenant(tenant)})` : ""}`)
          .join(", ");
        const previousAddresses = tenants
          .map((tenant) => tenant.previousAddress)
          .filter(Boolean)
          .join(" / ");
        const guarantor = tenancy.guarantor?.name
          ? `Guarantor: ${tenancy.guarantor.name}${contactFromTenant(tenancy.guarantor) ? ` (${contactFromTenant(tenancy.guarantor)})` : ""}`
          : "No guarantor";
        label.textContent = `${tenantSummary || "Tenant"} · ${formatDate(tenancy.startDate)} to ${formatDate(tenancy.endDate)}`;
        value.textContent = `${money.format(Number(tenancy.rent || 0))}${previousAddresses ? ` · Previous: ${previousAddresses}` : ""} · ${guarantor}`;
        item.append(label, value);
        tenancyList.append(item);
      });
    } else {
      const empty = document.createElement("div");
      const label = document.createElement("span");
      const value = document.createElement("strong");
      label.textContent = "No tenancy records saved";
      value.textContent = "Add long-term rent";
      empty.append(label, value);
      tenancyList.append(empty);
    }
    sections.push(tenancyList);
  }

  premium.landlordReport.replaceChildren(...sections);
}

function propertyMatchesSearch(property, search) {
  if (!search) return true;
  const tenancyText = (property.tenancies || [])
    .flatMap((tenancy) => [
      tenancy.tenantName,
      tenancy.tenantContact,
      ...(tenancy.tenants || []).flatMap((tenant) => [tenant.name, tenant.phone, tenant.email, tenant.previousAddress]),
    ])
    .join(" ");
  return [
    property.name,
    property.addressLine1,
    property.addressLine2,
    property.town,
    property.postcode,
    property.region,
    property.letType,
    property.ownershipModel,
    property.landlordName,
    property.landlordRegistration,
    tenancyText,
  ]
    .join(" ")
    .toLowerCase()
    .includes(search);
}

function renderPremiumDashboard() {
  localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(properties));
  const totalValue = properties.reduce((sum, property) => sum + Number(property.currentValue || 0), 0);
  const totalDebt = properties.reduce((sum, property) => sum + latestMortgageDeal(property).balance, 0);
  const totalCashflow = properties.reduce((sum, property) => sum + propertyCashflow(property), 0);
  const propertySearch = (premium.propertySearch?.value || "").trim().toLowerCase();
  const visibleProperties = properties.filter((property) => propertyMatchesSearch(property, propertySearch));

  premium.portfolioCount.textContent =
    currentPlanCode() === "premium" ? `${Math.min(properties.length, PREMIUM_PROPERTY_LIMIT)}/${PREMIUM_PROPERTY_LIMIT}` : properties.length;
  premium.portfolioValue.textContent = money.format(totalValue);
  premium.portfolioDebt.textContent = money.format(totalDebt);
  premium.portfolioCashflow.textContent = money.format(totalCashflow);
  premium.openPropertyModal.textContent = isPremiumAtPropertyLimit() ? "Upgrade for more properties" : "Add property";
  premium.detailAddProperty.textContent = isPremiumAtPropertyLimit() ? "Upgrade for more properties" : "Add property";

  premium.propertyList.replaceChildren(
    ...visibleProperties.map((property) => {
      const card = document.createElement("article");
      card.className = "property-card";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.dataset.propertyId = property.id;
      const mortgageDeal = latestMortgageDeal(property);
      const mortgageInterest = mortgageDeal.balance * (mortgageDeal.rate / 100 / 12);
      const cashflow = propertyCashflow(property);
      const expiryDays = daysUntil(mortgageDeal.expiryDate);

      card.innerHTML = `
        <div class="property-card-head">
          <div>
            <h3>${escapeHtml(property.name)}</h3>
            <span class="field-hint">${escapeHtml(property.region)} · ${escapeHtml(property.letType)}</span>
          </div>
          <span class="pill">${escapeHtml(expiryDays <= 120 ? "Remortgage soon" : mortgageDeal.productType)}</span>
        </div>
        <div class="property-meta">
          <div><span>Purchase price</span><strong>${money.format(property.purchasePrice)}</strong></div>
          <div><span>Value</span><strong>${money.format(property.currentValue)}</strong></div>
          <div><span>Mortgage</span><strong>${money.format(mortgageDeal.balance)}</strong></div>
          <div><span>Rate</span><strong>${mortgageDeal.rate.toFixed(2)}%</strong></div>
          <div><span>Rent</span><strong>${money.format(property.rent)}</strong></div>
          <div><span>Expenses</span><strong>${money.format(property.expenses)}</strong></div>
          <div><span>Cashflow</span><strong>${money.format(cashflow)}</strong></div>
          <div><span>Mortgage interest</span><strong>${money.format(mortgageInterest)}</strong></div>
        </div>
        <div class="property-expiry"><span>Expiry</span><strong>${mortgageDeal.expiryDate || "-"}</strong></div>
        <p class="field-hint">Open property record for tenancy and remortgage history.</p>
      `;
      return card;
    }),
  );

  if (!properties.length) {
    premium.propertyList.innerHTML = `<p class="field-hint">No properties saved yet. Add your first property to start building the portfolio.</p>`;
  } else if (!visibleProperties.length) {
    premium.propertyList.innerHTML = `<p class="field-hint">No properties match this search.</p>`;
  }

  renderReminders();
  renderTransactions();
  renderDocuments();
}

function activeProperty() {
  return properties.find((property) => property.id === activePropertyId);
}

function propertyDisplayNameFromAddress() {
  const address1 = document.querySelector("#propertyAddress1").value.trim();
  const town = document.querySelector("#propertyTown").value.trim();
  return [address1, town].filter(Boolean).join(", ");
}

function updateOperatorFieldsVisibility() {
  const selectedModel = premium.propertyOwnershipModel?.value || "Owned";
  const wantsOperatorFields = selectedModel !== "Owned";
  const showOperatorFields = wantsOperatorFields && hasProAccess();
  premium.propertyOperatorNote.hidden = !wantsOperatorFields;
  if (premium.propertyOperatorNote) {
    const title = premium.propertyOperatorNote.querySelector("span");
    const copy = premium.propertyOperatorNote.querySelector("p");
    if (title && copy) {
      title.textContent = hasProAccess()
        ? "Rent-to-rent / managed setup"
        : "Pro workflow";
      copy.textContent = hasProAccess()
        ? "Use these fields only when you pay the owner a guaranteed rent or manage repairs under a separate maintenance arrangement."
        : "Rent-to-rent and managed property fields are included in PropertyPanel Pro.";
    }
  }
  premium.propertyOperatorFields.forEach((field) => {
    field.hidden = !showOperatorFields;
  });
}

function resetPropertyForm() {
  editingPropertyId = null;
  premium.propertyForm.reset();
  document.querySelector("#propertyRentDueDay").value = "1";
  document.querySelector("#propertyRentReminder").value = "On";
  document.querySelector("#propertyOwnershipModel").value = "Owned";
  document.querySelector("#propertyLandlordName").value = "";
  document.querySelector("#propertyMortgageProduct").value = "Fixed";
  document.querySelector("#propertyModal .eyebrow").textContent = "Add property";
  document.querySelector("#propertyModalTitle").textContent = "Save a premium portfolio record";
  premium.propertyForm.querySelector("button[type='submit']").textContent = "Save property";
  updateOperatorFieldsVisibility();
}

function propertyPayloadFromForm(existingProperty = null) {
  const displayName = document.querySelector("#propertyName").value.trim();
  const addressLine1 = document.querySelector("#propertyAddress1").value.trim();
  const addressLine2 = document.querySelector("#propertyAddress2").value.trim();
  const town = document.querySelector("#propertyTown").value.trim();
  const postcode = document.querySelector("#propertyPostcode").value.trim().toUpperCase();
  const ownershipModel = document.querySelector("#propertyOwnershipModel").value;
  const usesOperatorFields = ownershipModel !== "Owned";

  return normalizePropertyRecord({
    ...(existingProperty || {}),
    id: existingProperty?.id || createId("property"),
    name: displayName || propertyDisplayNameFromAddress(),
    addressLine1,
    addressLine2,
    town,
    postcode,
    region: document.querySelector("#propertyRegion").value,
    letType: document.querySelector("#propertyLetType").value,
    ownershipModel,
    landlordName: usesOperatorFields ? document.querySelector("#propertyLandlordName").value.trim() : existingProperty?.landlordName || "",
    guaranteedRent: usesOperatorFields ? Number(document.querySelector("#propertyGuaranteedRent").value) || 0 : 0,
    maintenanceModel: usesOperatorFields ? document.querySelector("#propertyMaintenanceModel").value : "Landlord charged for repairs",
    maintenanceFee: usesOperatorFields ? Number(document.querySelector("#propertyMaintenanceFee").value) || 0 : 0,
    purchaseDate: document.querySelector("#propertyPurchaseDate").value,
    purchasePrice: Number(document.querySelector("#propertyPurchasePrice").value) || 0,
    currentValue: Number(document.querySelector("#propertyCurrentValue").value) || 0,
    deposit: Number(document.querySelector("#propertyDeposit").value) || 0,
    mortgageBalance: Number(document.querySelector("#propertyMortgage").value) || 0,
    mortgageProductType: document.querySelector("#propertyMortgageProduct").value,
    rate: Number(document.querySelector("#propertyRate").value) || 0,
    mortgageExpiry: document.querySelector("#propertyMortgageExpiry").value,
    rent: Number(document.querySelector("#propertyRent").value) || 0,
    expenses: Number(document.querySelector("#propertyExpenses").value) || 0,
    tenantName: existingProperty?.tenantName || "",
    tenantContact: existingProperty?.tenantContact || "",
    rentDueDay: Math.min(Math.max(Number(document.querySelector("#propertyRentDueDay").value) || 1, 1), 31),
    rentReminder: document.querySelector("#propertyRentReminder").value,
    landlordRegistration: document.querySelector("#landlordRegistration").value,
    documents: existingProperty?.documents || "",
    tenancies: existingProperty?.tenancies || [],
    remortgages: existingProperty?.remortgages || [],
  });
}

function loadPropertyIntoForm(property) {
  editingPropertyId = property.id;
  document.querySelector("#propertyName").value = property.name || "";
  document.querySelector("#propertyAddress1").value = property.addressLine1 || "";
  document.querySelector("#propertyAddress2").value = property.addressLine2 || "";
  document.querySelector("#propertyTown").value = property.town || "";
  document.querySelector("#propertyPostcode").value = property.postcode || "";
  document.querySelector("#propertyRegion").value = property.region || "Scotland";
  document.querySelector("#propertyLetType").value = property.letType || "Long-term let";
  document.querySelector("#propertyOwnershipModel").value = property.ownershipModel || "Owned";
  document.querySelector("#propertyLandlordName").value = property.landlordName || "";
  document.querySelector("#propertyGuaranteedRent").value = property.guaranteedRent || "";
  document.querySelector("#propertyMaintenanceModel").value = property.maintenanceModel || "Landlord charged for repairs";
  document.querySelector("#propertyMaintenanceFee").value = property.maintenanceFee || "";
  document.querySelector("#propertyPurchaseDate").value = property.purchaseDate || "";
  document.querySelector("#propertyPurchasePrice").value = property.purchasePrice || "";
  document.querySelector("#propertyCurrentValue").value = property.currentValue || "";
  document.querySelector("#propertyDeposit").value = property.deposit || "";
  document.querySelector("#propertyMortgage").value = property.mortgageBalance || latestMortgageDeal(property).balance || "";
  document.querySelector("#propertyRate").value = property.rate || latestMortgageDeal(property).rate || "";
  document.querySelector("#propertyMortgageProduct").value = property.mortgageProductType || latestMortgageDeal(property).productType || "Fixed";
  document.querySelector("#propertyMortgageExpiry").value = property.mortgageExpiry || latestMortgageDeal(property).expiryDate || "";
  document.querySelector("#propertyRent").value = property.rent || "";
  document.querySelector("#propertyRentDueDay").value = property.rentDueDay || 1;
  document.querySelector("#propertyRentReminder").value = property.rentReminder || "On";
  document.querySelector("#propertyExpenses").value = property.expenses || "";
  document.querySelector("#landlordRegistration").value = property.landlordRegistration || "";
  document.querySelector("#propertyModal .eyebrow").textContent = "Edit property";
  document.querySelector("#propertyModalTitle").textContent = "Update portfolio record";
  premium.propertyForm.querySelector("button[type='submit']").textContent = "Update property";
  updateOperatorFieldsVisibility();
}

function openPropertyForm(property = null) {
  if (!property && isPremiumAtPropertyLimit()) {
    showProUpgrade(premiumLimitMessage());
    return;
  }

  resetPropertyForm();
  if (property) loadPropertyIntoForm(property);
  premium.propertyModal.hidden = false;
}

function updateDetailOperatorFieldsVisibility() {
  const showOperatorFields = premium.detailOwnershipModel?.value !== "Owned";
  premium.detailOperatorFields.forEach((field) => {
    field.hidden = !showOperatorFields;
  });
}

function tenantFromFormFields() {
  return normalizeTenantRecord({
    name: premium.detailTenantName.value.trim(),
    phone: premium.detailTenantPhone.value.trim(),
    email: premium.detailTenantEmail.value.trim(),
    previousAddress: premium.detailTenantPreviousAddress.value.trim(),
  });
}

function clearTenantFormFields() {
  premium.detailTenantName.value = "";
  premium.detailTenantPhone.value = "";
  premium.detailTenantEmail.value = "";
  premium.detailTenantPreviousAddress.value = "";
}

function renderTenantDrafts() {
  if (!premium.detailTenantList) return;

  if (!tenancyTenantDrafts.length) {
    premium.detailTenantList.innerHTML = '<p class="field-hint">No additional tenants added yet.</p>';
    return;
  }

  premium.detailTenantList.replaceChildren(
    ...tenancyTenantDrafts.map((tenant) => {
      const row = document.createElement("div");
      row.className = "tenant-chip";
      row.innerHTML = `
        <div>
          <strong>${escapeHtml(tenant.name || "Tenant")}</strong>
          <span>${escapeHtml([tenant.phone, tenant.email, tenant.previousAddress].filter(Boolean).join(" · ") || "No contact details")}</span>
        </div>
        <button class="secondary-button small-button danger-button" type="button" data-remove-tenant-draft="${escapeHtml(tenant.id)}">Remove</button>
      `;
      return row;
    }),
  );
}

function tenancyTenantsFromForm() {
  const typedTenant = tenantFromFormFields();
  const tenants = [...tenancyTenantDrafts];
  if (typedTenant.name || typedTenant.phone || typedTenant.email || typedTenant.previousAddress) {
    tenants.unshift(typedTenant);
  }
  return tenants.map(normalizeTenantRecord);
}

function resetTenancyForm() {
  editingTenancyId = null;
  tenancyTenantDrafts = [];
  premium.tenancyForm.reset();
  renderTenantDrafts();
  premium.tenancyForm.querySelector("button[type='submit']").textContent = "Save tenancy record";
}

function resetRemortgageForm() {
  editingRemortgageId = null;
  premium.remortgageForm.reset();
  document.querySelector("#detailMortgageEnd").dataset.autoCalculated = "";
  premium.remortgageForm.querySelector("button[type='submit']").textContent = "Save remortgage record";
}

function setButtonBusy(button, busy, busyText = "Saving...") {
  if (!button) return;
  if (busy) {
    button.dataset.originalText = button.textContent;
    button.textContent = busyText;
    button.disabled = true;
    return;
  }
  button.textContent = button.dataset.originalText || button.textContent;
  button.disabled = false;
  delete button.dataset.originalText;
}

function switchPropertyDetailTab(tabName) {
  const availableTabs = [...premium.propertyDetailTabButtons].map((button) => button.dataset.propertyDetailTab);
  if (!availableTabs.includes(tabName)) tabName = "overview";
  if (tabName === "landlord-report" && !hasProAccess()) {
    showProUpgrade("Landlord monthly reports are included in PropertyPanel Pro.");
    return;
  }

  switchSection(
    premium.propertyDetailTabButtons,
    premium.propertyDetailPanels,
    tabName,
    "propertyDetailTab",
    "propertyDetailPanel",
  );
  saveUiState({ viewId: "propertyDetailView", activePropertyId, propertyDetailTab: tabName });
}

function renderPropertyDetail() {
  const property = activeProperty();
  if (!property) return;
  ensurePropertyDetailFilterDefaults();

  const mortgageDeal = latestMortgageDeal(property);
  const latestTenancy = (property.tenancies || [])[0];
  const currentRent = Number(latestTenancy ? currentTenancyRent(latestTenancy) : property.rent || 0);
  premium.propertyDetailTitle.textContent = property.name;
  document.querySelector("#detailTenancyRent").value = property.rent || "";
  document.querySelector("#detailMortgageProduct").value = mortgageDeal.productType || "Fixed";
  document.querySelector("#detailMortgageRate").value = mortgageDeal.rate || "";
  document.querySelector("#detailMortgageBalance").value = mortgageDeal.balance || "";
  document.querySelector("#detailMortgageValuation").value = mortgageDeal.valuation || property.currentValue || "";
  document.querySelector("#detailMortgageEnd").value = mortgageDeal.expiryDate || "";
  premium.detailOwnershipModel.value = property.ownershipModel || "Owned";
  premium.detailLandlordName.value = property.landlordName || "";
  premium.detailGuaranteedRent.value = property.guaranteedRent || "";
  premium.detailMaintenanceModel.value = property.maintenanceModel || "Landlord charged for repairs";
  premium.detailMaintenanceFee.value = property.maintenanceFee || "";
  premium.detailRentDueDay.value = property.rentDueDay || 1;
  premium.detailRentReminder.value = property.rentReminder || "On";
  premium.propertyManagementMessage.textContent =
    property.ownershipModel === "Owned"
      ? "Owned property selected. Operator fields are hidden and landlord reports use rent and expense records."
      : "Managed/rent-to-rent setup is active. Landlord reports use guaranteed rent and maintenance rules.";
  updateDetailOperatorFieldsVisibility();
  premium.propertyRecordMetrics.innerHTML = `
    <article>
      <span>Total value</span>
      <strong>${money.format(property.currentValue)}</strong>
    </article>
    <article>
      <span>Mortgage debt</span>
      <strong>${money.format(mortgageDeal.balance)}</strong>
    </article>
    <article>
      <span>Latest mortgage rate</span>
      <strong>${Number(mortgageDeal.rate || 0).toFixed(2)}%</strong>
    </article>
    <article>
      <span>Current long-term rent</span>
      <strong>${money.format(currentRent)}</strong>
    </article>
  `;
  premium.propertyDetailSummary.innerHTML = `
    <div><span>Address</span><strong>${escapeHtml(propertyAddressLabel(property))}</strong></div>
    <div><span>Ownership</span><strong>${escapeHtml(property.ownershipModel || "Owned")}</strong></div>
    <div><span>Landlord</span><strong>${escapeHtml(property.landlordName || "-")}</strong></div>
    <div><span>Region</span><strong>${escapeHtml(property.region)}</strong></div>
    <div><span>Let type</span><strong>${escapeHtml(property.letType)}</strong></div>
    <div><span>Purchase price</span><strong>${money.format(property.purchasePrice)}</strong></div>
    <div><span>Current value</span><strong>${money.format(property.currentValue)}</strong></div>
    <div><span>Mortgage balance</span><strong>${money.format(mortgageDeal.balance)}</strong></div>
    <div><span>Mortgage product</span><strong>${escapeHtml(mortgageDeal.productType || "Fixed")}</strong></div>
    <div><span>Rate</span><strong>${Number(mortgageDeal.rate || 0).toFixed(2)}%</strong></div>
    <div><span>Expiry</span><strong>${mortgageDeal.expiryDate || "-"}</strong></div>
    <div><span>Rent due</span><strong>${property.rentReminder === "On" ? `${property.rentDueDay}${ordinalSuffix(property.rentDueDay)} monthly` : "Off"}</strong></div>
    <div><span>Guaranteed rent</span><strong>${property.guaranteedRent ? money.format(property.guaranteedRent) : "-"}</strong></div>
    <div><span>Maintenance</span><strong>${escapeHtml(property.maintenanceFee ? `${property.maintenanceModel} (${money.format(property.maintenanceFee)})` : property.maintenanceModel || "-")}</strong></div>
  `;

  premium.tenancyHistoryList.replaceChildren(
    ...((property.tenancies || []).map((tenancy) => {
      const row = document.createElement("div");
      row.className = "detail-row";
      const tenants = (tenancy.tenants || []).length ? tenancy.tenants : [primaryTenant(tenancy)];
      const tenantSummary = tenants
        .map((tenant) => `${tenant.name || "Tenant"}${contactFromTenant(tenant) ? ` (${contactFromTenant(tenant)})` : ""}`)
        .join(", ");
      const previousAddressSummary = tenants
        .map((tenant) => tenant.previousAddress)
        .filter(Boolean)
        .join(" / ");
      const guarantorSummary = tenancy.guarantor?.name
        ? `${tenancy.guarantor.name}${contactFromTenant(tenancy.guarantor) ? ` (${contactFromTenant(tenancy.guarantor)})` : ""}`
        : "-";
      const rentTransactions = tenancyRentTransactions(tenancy.id);
      const rentChangeHistory = (tenancy.rentChanges || []).length
        ? tenancy.rentChanges
          .map((change) => `
            <div class="rent-change-row">
              <span>From ${escapeHtml(formatDate(change.effectiveDate))}</span>
              <strong>${money.format(Number(change.rent || 0))}</strong>
              <button class="secondary-button small-button danger-button" type="button" data-delete-rent-change="${escapeHtml(change.id)}" data-tenancy-id="${escapeHtml(tenancy.id)}">Delete</button>
            </div>
          `)
          .join("")
        : `<p class="field-hint">No mid-tenancy rent changes recorded.</p>`;
      const rentSchedule = rentTransactions.length
        ? `
          <div class="tenancy-rent-schedule">
            <span>Rent payment schedule</span>
            ${rentTransactions
              .map(
                (transaction) => `
                  <div class="tenancy-rent-row">
                    <strong>${formatDate(transaction.date)}</strong>
                    <span>${money.format(transaction.amount)} · ${escapeHtml(transaction.status)}</span>
                    <div class="detail-actions">
                      ${transaction.status !== "approved" ? `<button class="tax-button small-button" type="button" data-approve-tenancy-rent="${transaction.id}">Mark paid</button>` : ""}
                      <button class="secondary-button small-button" type="button" data-edit-tenancy-rent="${transaction.id}">Edit</button>
                      <button class="secondary-button small-button danger-button" type="button" data-delete-tenancy-rent="${transaction.id}">Delete</button>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        `
        : `<div class="tenancy-rent-schedule"><span>Rent payment schedule</span><p class="field-hint">Save tenancy dates and monthly rent to create rent payment records.</p></div>`;
      row.innerHTML = `
        <div><span>Tenant(s)</span><strong>${escapeHtml(tenantSummary || "-")}</strong></div>
        <div><span>Previous address</span><strong>${escapeHtml(previousAddressSummary || "-")}</strong></div>
        <div><span>Guarantor</span><strong>${escapeHtml(guarantorSummary)}</strong></div>
        <div><span>Start</span><strong>${formatDate(tenancy.startDate)}</strong></div>
        <div><span>Move-out</span><strong>${formatDate(tenancy.endDate)}</strong></div>
        <div><span>Rent</span><strong>${money.format(Number(tenancy.rent || 0))}</strong></div>
        <div><span>Contracts</span><strong>${escapeHtml((tenancy.documents || []).join(", ") || "-")}</strong></div>
        <div class="detail-actions">
          <button class="secondary-button small-button" type="button" data-edit-tenancy="${tenancy.id}">Edit</button>
          <button class="secondary-button small-button danger-button" type="button" data-delete-tenancy="${tenancy.id}">Delete</button>
        </div>
        <form class="tenancy-rent-change-form" data-rent-change-form="${escapeHtml(tenancy.id)}">
          <div>
            <span>Change rent during tenancy</span>
            <p class="field-hint">New draft rent payments from this date will use the updated amount.</p>
          </div>
          <label>
            <span>Effective from</span>
            <input name="effectiveDate" type="date" min="${escapeHtml(tenancy.startDate || "")}" max="${escapeHtml(tenancy.endDate || "")}" required />
          </label>
          <label>
            <span>Monthly rent</span>
            <input name="monthlyRent" type="number" min="0" step="0.01" required />
          </label>
          <button class="secondary-button small-button" type="submit">Save rent change</button>
          <div class="rent-change-history">${rentChangeHistory}</div>
        </form>
        ${rentSchedule}
      `;
      return row;
    })),
  );

  if (!(property.tenancies || []).length) {
    premium.tenancyHistoryList.innerHTML = `<div class="detail-row muted-row">No tenancy records yet</div>`;
  }

  premium.remortgageHistoryList.replaceChildren(
    ...((property.remortgages || []).map((event) => {
      const row = document.createElement("div");
      row.className = "detail-row";
      row.innerHTML = `
        <div><span>Product</span><strong>${escapeHtml(event.productType || "-")}</strong></div>
        <div><span>Rate</span><strong>${Number(event.rate || 0).toFixed(2)}%</strong></div>
        <div><span>Balance</span><strong>${money.format(Number(event.balance || 0))}</strong></div>
        <div><span>New valuation</span><strong>${event.valuation ? money.format(Number(event.valuation || 0)) : "-"}</strong></div>
        <div><span>Length</span><strong>${event.termMonths || "-"} months</strong></div>
        <div><span>Start</span><strong>${formatDate(event.startDate)}</strong></div>
        <div><span>End</span><strong>${formatDate(event.expiryDate)}</strong></div>
        <div><span>Equity release</span><strong>${money.format(Number(event.equityRelease || 0))}</strong></div>
        <div><span>Notes</span><strong>${escapeHtml(event.notes || "-")}</strong></div>
        <div class="detail-actions">
          <button class="secondary-button small-button" type="button" data-edit-remortgage="${event.id}">Edit</button>
          <button class="secondary-button small-button danger-button" type="button" data-delete-remortgage="${event.id}">Delete</button>
        </div>
      `;
      return row;
    })),
  );

  if (!(property.remortgages || []).length) {
    premium.remortgageHistoryList.innerHTML = `<div class="detail-row muted-row">No remortgage records yet</div>`;
  }

  renderPropertyExpenses(property);
  renderDocuments();
  renderLandlordReport(property);
}

function openPropertyDetail(propertyId) {
  activePropertyId = propertyId;
  renderPropertyDetail();
  switchPropertyDetailTab(readUiState().activePropertyId === propertyId ? readUiState().propertyDetailTab || "overview" : "overview");
  premium.deletePropertyMessage.textContent = "Deleting a property removes it from your portfolio and lender export.";
  resetTenancyForm();
  resetRemortgageForm();
  premium.propertyDetailPanel.hidden = false;
  switchView("propertyDetailView");
  saveUiState({ viewId: "propertyDetailView", activePropertyId: propertyId });
}

async function deleteActiveProperty() {
  const property = activeProperty();
  if (!property) return;

  const confirmed = window.confirm(`Delete ${property.name}? This cannot be undone.`);
  if (!confirmed) return;

  if (supabaseClient && isPersistedProperty(property)) {
    const { error } = await supabaseClient.from("properties").delete().eq("id", property.id);
    if (error) {
      premium.deletePropertyMessage.textContent = error.message;
      return;
    }
  }

  properties = properties.filter((item) => item.id !== property.id);
  activePropertyId = null;
  premium.propertyDetailPanel.hidden = true;
  switchView("dashboardView");
  premium.dashboardPanel.hidden = false;
  switchDashboardTab("properties");
  renderPremiumDashboard();
}

function ordinalSuffix(day) {
  if ([11, 12, 13].includes(day % 100)) return "th";
  return day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th";
}

function nextRentDueDate(dayOfMonth) {
  const today = new Date();
  const safeDay = Math.min(Math.max(Number(dayOfMonth) || 1, 1), 31);
  const rentDateForMonth = (year, month) => {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, Math.min(safeDay, lastDay), 12);
  };

  let dueDate = rentDateForMonth(today.getFullYear(), today.getMonth());

  if (dueDate < new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12)) {
    dueDate = rentDateForMonth(today.getFullYear(), today.getMonth() + 1);
  }

  return dueDate;
}

function daysUntilDate(date) {
  const today = new Date();
  const todayMidday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  return Math.ceil((date - todayMidday) / 86400000);
}

function reminderStage(days) {
  if (!Number.isFinite(days)) return null;
  if (days < 0) return { key: "overdue", label: "Overdue", rank: 0 };
  if (days === 0) return { key: "due", label: "Due today", rank: 1 };
  if (days <= 7) return { key: "one-week", label: "1 week", rank: 2 };
  if (days <= 31) return { key: "one-month", label: "1 month", rank: 3 };
  if (days <= 93) return { key: "three-months", label: "3 months", rank: 4 };
  return null;
}

function duePhrase(days) {
  if (!Number.isFinite(days)) return "date not set";
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`;
  if (days === 0) return "due today";
  if (days === 1) return "due tomorrow";
  return `due in ${days} days`;
}

function addReminderRecord(reminders, { type, property, title, detail, dueDate, amount = null }) {
  const days = typeof dueDate === "string" ? daysUntil(dueDate) : daysUntilDate(dueDate);
  const stage = reminderStage(days);
  if (!stage) return;

  const dueDateString = typeof dueDate === "string" ? dueDate : dateInputValue(dueDate);
  reminders.push({
    type,
    stage: stage.key,
    stageLabel: stage.label,
    rank: stage.rank,
    days,
    propertyName: property?.name || "",
    title,
    detail,
    amount,
    dueDate: dueDateString,
  });
}

function renderReminderItem(reminder) {
  const item = document.createElement("li");
  item.className = `reminder-item reminder-${reminder.stage}`;
  const type = document.createElement("span");
  type.className = "reminder-type";
  type.textContent = reminder.type;

  const copy = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = reminder.title;
  const detail = document.createElement("small");
  detail.textContent = reminder.detail;
  const calendarButton = document.createElement("button");
  calendarButton.className = "inline-link reminder-calendar";
  calendarButton.type = "button";
  calendarButton.dataset.calendarReminder = reminder.id;
  calendarButton.textContent = "Add to calendar";
  copy.append(title, detail, calendarButton);

  const due = document.createElement("time");
  due.dateTime = reminder.dueDate;
  due.textContent = reminder.stageLabel;
  const dateLabel = document.createElement("small");
  dateLabel.textContent = formatDate(reminder.dueDate);
  due.append(dateLabel);

  item.append(type, copy, due);
  return item;
}

function upcomingReminders() {
  const reminders = [];

  properties.forEach((property) => {
    const mortgageDeal = latestMortgageDeal(property);
    addReminderRecord(reminders, {
      type: "Mortgage",
      property,
      title: `${property.name} mortgage product`,
      detail: `${duePhrase(daysUntil(mortgageDeal.expiryDate))}. Review remortgage options and lender notes.`,
      dueDate: mortgageDeal.expiryDate,
    });

    if (property.rentReminder === "On") {
      const dueDate = nextRentDueDate(property.rentDueDay);
      const rentDays = daysUntilDate(dueDate);
      reminders.push({
        type: "Rent",
        stage: rentDays <= 1 ? "due" : rentDays <= 7 ? "one-week" : "rent",
        stageLabel: rentDays <= 1 ? (rentDays === 0 ? "Due today" : "Tomorrow") : "Rent due",
        rank: rentDays <= 1 ? 1 : rentDays <= 7 ? 2 : 5,
        days: rentDays,
        propertyName: property.name,
        title: `${property.name} rent payment`,
        detail: `${duePhrase(rentDays)}. Check ${money.format(property.rent)} payment.`,
        amount: property.rent,
        dueDate: dateInputValue(dueDate),
      });
    }

    (property.tenancies || []).forEach((tenancy) => {
      addReminderRecord(reminders, {
        type: "Tenancy",
        property,
        title: `Tenancy ending${tenancy.tenantName ? `: ${tenancy.tenantName}` : ""}`,
        detail: `${duePhrase(daysUntil(tenancy.endDate))}. Review renewal, notice or move-out steps for ${property.name}.`,
        dueDate: tenancy.endDate,
      });
    });

    documents
      .filter((document) => document.propertyId === property.id && document.reminderEnabled)
      .forEach((document) => {
        addReminderRecord(reminders, {
          type: "Document",
          property,
          title: `${document.documentType} expiry`,
          detail: `${duePhrase(daysUntil(document.expiryDate))}. Upload a replacement or update the expiry date for ${property.name}.`,
          dueDate: document.expiryDate,
        });
      });
  });

  reminders.sort((a, b) => a.rank - b.rank || a.days - b.days || a.propertyName.localeCompare(b.propertyName));
  return reminders.map((reminder, index) => ({ ...reminder, id: `${reminder.type}-${reminder.dueDate}-${index}` }));
}

function updateNotificationPanel(reminders) {
  if (!premium.notificationList || !premium.notificationCount) return;
  premium.notificationCount.textContent = String(reminders.length);
  premium.notificationCount.hidden = !reminders.length;
  premium.notificationList.replaceChildren(...reminders.slice(0, 12).map(renderReminderItem));
  if (!reminders.length) {
    const item = document.createElement("li");
    item.textContent = hasProAccess()
      ? "No urgent reminders."
      : "Upgrade to Pro to enable reminders.";
    premium.notificationList.replaceChildren(item);
  }
}

function renderReminders() {
  if (!hasProAccess()) {
    const item = document.createElement("li");
    item.textContent = "Upgrade to Pro for mortgage expiry, rent due, tenancy and certificate reminders.";
    premium.reminderList.replaceChildren(item);
    updateNotificationPanel([]);
    return;
  }

  const reminders = upcomingReminders();

  premium.reminderList.replaceChildren(...reminders.slice(0, 10).map(renderReminderItem));
  updateNotificationPanel(reminders);

  if (!reminders.length) {
    const item = document.createElement("li");
    item.textContent = "No urgent reminders. Mortgage, rent, tenancy and certificate alerts will appear here when dates are close.";
    premium.reminderList.replaceChildren(item);
  }
}

function calendarDateValue(dateString) {
  return String(dateString || "").replaceAll("-", "");
}

function addCalendarDays(dateString, amount) {
  const date = dateFromInput(dateString);
  if (!date) return dateString;
  date.setDate(date.getDate() + amount);
  return dateInputValue(date);
}

function calendarText(value) {
  return String(value || "").replaceAll("\\", "\\\\").replaceAll("\n", "\\n").replaceAll(",", "\\,").replaceAll(";", "\\;");
}

function downloadReminderCalendar(reminder) {
  const eventDate = calendarDateValue(reminder.dueDate);
  if (!eventDate) return;
  const contents = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//PropertyPanel//Reminder//EN",
    "BEGIN:VEVENT",
    `UID:${calendarText(`${reminder.id}@propertypanel.co.uk`)}`,
    `DTSTAMP:${new Date().toISOString().replaceAll(/[-:]/g, "").replace(".000", "")}`,
    `DTSTART;VALUE=DATE:${eventDate}`,
    `DTEND;VALUE=DATE:${calendarDateValue(addCalendarDays(reminder.dueDate, 1))}`,
    `SUMMARY:${calendarText(`PropertyPanel: ${reminder.title}`)}`,
    `DESCRIPTION:${calendarText(reminder.detail)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  downloadText(contents, `propertypanel-${reminder.dueDate}-${reminder.type.toLowerCase()}.ics`, "text/calendar;charset=utf-8");
}

function switchView(viewId) {
  premium.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  premium.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
  saveUiState({ viewId });
}

function updateNavAuthButton(isSignedIn) {
  if (!premium.navAuthButton) return;
  premium.navAuthButton.textContent = isSignedIn ? "Log out" : "Sign in";
  premium.navAuthButton.dataset.authAction = isSignedIn ? "logout" : "signin";
  premium.navAuthButton.dataset.view = isSignedIn ? "" : "loginView";
}

function readUiState() {
  try {
    return JSON.parse(localStorage.getItem(UI_STATE_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUiState(nextState = {}) {
  const state = { ...readUiState(), ...nextState };
  localStorage.setItem(UI_STATE_STORAGE_KEY, JSON.stringify(state));
}

function openDashboard() {
  if (!hasPremiumAccess()) {
    showSubscriptionRequired();
    return;
  }

  premium.propertyDetailPanel.hidden = true;
  switchView("dashboardView");
  premium.dashboardPanel.hidden = false;
  switchDashboardTab("overview");
  renderPremiumDashboard();
}

function openPortfolioTarget(target = "overview") {
  if (!hasPremiumAccess()) {
    showSubscriptionRequired();
    return;
  }

  const activePropertyForTarget = activeProperty();
  if (["documents", "tenancies", "remortgages"].includes(target) && activePropertyForTarget) {
    renderPropertyDetail(activePropertyForTarget.id);
    switchPropertyDetailTab(target === "tenancies" ? "tenancies" : target);
    return;
  }

  openDashboard();
  switchDashboardTab(["overview", "properties", "transactions", "subscription", "account"].includes(target) ? target : "overview");
}

function restoreSavedLocation() {
  const state = readUiState();

  if (state.viewId === "propertyDetailView" && state.activePropertyId) {
    const propertyExists = properties.some((property) => property.id === state.activePropertyId);
    if (propertyExists) {
      activePropertyId = state.activePropertyId;
      renderPropertyDetail();
      switchPropertyDetailTab(state.propertyDetailTab || "overview");
      premium.propertyDetailPanel.hidden = false;
      switchView("propertyDetailView");
      return true;
    }
  }

  if (state.viewId === "dashboardView" || !state.viewId) {
    openDashboard();
    switchDashboardTab(state.dashboardTab || "overview");
    return true;
  }

  if (["homeView", "premiumView", "loginView", "adminView"].includes(state.viewId)) {
    premium.propertyDetailPanel.hidden = true;
    premium.dashboardPanel.hidden = true;
    switchView(state.viewId);
    if (state.viewId === "premiumView") refreshPlanContinueButton();
    return true;
  }

  openDashboard();
  switchDashboardTab(state.dashboardTab || "overview");
  return true;
}

function hasPremiumAccess() {
  return (
    isAdminUser ||
    promoAccess ||
    ACTIVE_SUBSCRIPTION_STATUSES.includes(currentSubscription?.status)
  );
}

function currentPlanCode() {
  if (isAdminUser) return "pro";
  if (promoAccess) return "pro";
  if (currentSubscription?.plan_code === "pro" || Number(currentSubscription?.amount_monthly_pence || 0) >= 999) {
    return "pro";
  }
  if (ACTIVE_SUBSCRIPTION_STATUSES.includes(currentSubscription?.status)) return "premium";
  return "none";
}

function hasProAccess() {
  return currentPlanCode() === "pro";
}

function isPremiumAtPropertyLimit() {
  return currentPlanCode() === "premium" && properties.length >= PREMIUM_PROPERTY_LIMIT;
}

function premiumLimitMessage() {
  return `Premium includes up to ${PREMIUM_PROPERTY_LIMIT} properties. Upgrade to Pro for unlimited properties, reminders, quarterly accountant packs and landlord reports.`;
}

function showProUpgrade(message = "This workflow is included in PropertyPanel Pro.") {
  premium.subscriptionNote.textContent = message;
  switchView("dashboardView");
  premium.dashboardPanel.hidden = false;
  premium.propertyDetailPanel.hidden = true;
  switchDashboardTab("subscription");
}

function clearPremiumDataForLockedAccount() {
  properties = [];
  transactions = [];
  documents = [];
  localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(properties));
  localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
  localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
}

function showSubscriptionRequired(message = "Sign in is working. Choose Premium or Pro to unlock the portfolio dashboard.") {
  premium.dashboardPanel.hidden = true;
  premium.propertyDetailPanel.hidden = true;
  premium.propertyModal.hidden = true;
  switchView("premiumView");
  document.querySelector("#selectedPlanCopy").textContent = message;
  premium.subscriptionNote.textContent = message;
  refreshPlanContinueButton();
}

function renderInvoices(invoices = []) {
  if (!premium.invoiceList) return;

  if (!invoices.length) {
    premium.invoiceList.innerHTML = `<div><span>No invoices yet</span><strong>Available after first payment</strong></div>`;
    return;
  }

  premium.invoiceList.replaceChildren(
    ...invoices.map((invoice) => {
      const row = document.createElement("div");
      const label = invoice.invoice_number || invoice.stripe_invoice_id || "Stripe invoice";
      const link = externalHttpUrl(invoice.hosted_invoice_url || invoice.invoice_pdf_url);
      row.innerHTML = link
        ? `<span>${escapeHtml(label)}</span><a class="inline-link" href="${escapeHtml(link)}" target="_blank" rel="noreferrer">${moneyFromPence(invoice.amount_pence)}</a>`
        : `<span>${escapeHtml(label)}</span><strong>${moneyFromPence(invoice.amount_pence)}</strong>`;
      return row;
    }),
  );
}

function selectedPlanLabel() {
  return selectedPlan === "pro" ? "Pro" : "Premium";
}

function selectedPlanPrice() {
  return selectedPlan === "pro" ? "£9.99/month" : "£4.99/month";
}

function selectedPlanDescription() {
  return selectedPlan === "pro"
    ? "Pro is selected at £9.99/month with unlimited properties, reminders, quarterly accountant packs and landlord reports."
    : `Premium is selected at £4.99/month with up to ${PREMIUM_PROPERTY_LIMIT} properties, rent payments, manual expenses, documents and CSV export.`;
}

function setSelectedPlan(plan) {
  selectedPlan = plan === "pro" ? "pro" : "premium";
  localStorage.setItem(SELECTED_PLAN_STORAGE_KEY, selectedPlan);

  const label = selectedPlanLabel();
  const price = selectedPlanPrice();
  document.querySelector("#selectedPlanTitle").textContent = `Start ${label}`;
  document.querySelector("#selectedPlanCopy").textContent = `${selectedPlanDescription()} Apply a promo code if you have one, then sign in to continue.`;

  if (!currentSubscription || currentSubscription.status === "canceled") {
    premium.manageBilling.textContent = `Subscribe to ${label} - ${price}`;
    premium.subscriptionNote.textContent = `${label} selected at ${price}. Checkout opens with this plan.`;
  }

  refreshPlanContinueButton();
}

function checkoutStatusFromUrl() {
  return new URLSearchParams(window.location.search).get("checkout");
}

function checkoutSessionIdFromUrl() {
  return new URLSearchParams(window.location.search).get("session_id") || "";
}

function cleanCheckoutUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("checkout");
  url.searchParams.delete("session_id");
  if (url.href !== window.location.href) {
    window.history.replaceState({}, "", url.toString());
  }
}

async function getCurrentSession() {
  if (!supabaseClient) return null;
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  return session;
}

async function refreshPlanContinueButton() {
  if (!premium.showLogin) return;
  const session = await getCurrentSession();
  premium.showLogin.textContent = session
    ? `Continue to ${selectedPlanLabel()} checkout`
    : "Continue to sign in";
}

function renderSubscriptionFallback() {
  currentSubscription = null;

  if (isAdminUser) {
    premium.subscriptionStatus.textContent = "Admin access";
    premium.subscriptionRenewal.textContent = "Not required";
    premium.subscriptionPaid.textContent = "£0";
    premium.subscriptionSince.textContent = "Admin";
    premium.subscriptionNote.textContent = "Admin accounts have complimentary premium access.";
    premium.manageBilling.textContent = "Billing not required";
    premium.manageBilling.disabled = true;
    return;
  }

  if (promoAccess) {
    premium.subscriptionStatus.textContent = "Complimentary";
    premium.subscriptionRenewal.textContent = "Lifetime";
    premium.subscriptionPaid.textContent = "£0";
    premium.subscriptionSince.textContent = "Early access";
    premium.subscriptionNote.textContent = "Private access code applied. Stripe billing will not be required for this account in the MVP.";
    premium.manageBilling.textContent = "Billing not required";
    premium.manageBilling.disabled = true;
    return;
  }

  premium.subscriptionStatus.textContent = "Not active";
  premium.subscriptionRenewal.textContent = "-";
  premium.subscriptionPaid.textContent = "£0";
  premium.subscriptionSince.textContent = "-";
  premium.subscriptionNote.textContent = `${selectedPlanLabel()} selected at ${selectedPlanPrice()}. Checkout opens with this plan.`;
  premium.manageBilling.textContent = `Subscribe to ${selectedPlanLabel()} - ${selectedPlanPrice()}`;
  premium.manageBilling.disabled = false;
}

async function loadSubscriptionSummary() {
  currentSubscription = null;
  promoAccess = false;
  renderSubscriptionFallback();
  renderInvoices();

  if (!supabaseClient) return;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  await loadAdminOverview();
  if (isAdminUser) {
    renderSubscriptionFallback();
  }

  const { data: redemptions } = await supabaseClient
    .from("promo_redemptions")
    .select("promo_codes(lifetime_access,code)")
    .eq("user_id", user.id)
    .limit(1);

  if (redemptions?.some((item) => item.promo_codes?.lifetime_access)) {
    promoAccess = true;
    localStorage.setItem(PROMO_STORAGE_KEY, "true");
    renderSubscriptionFallback();
  }

  const { data: subscriptions } = await supabaseClient
    .from("subscriptions")
    .select("status,current_period_start,current_period_end,created_at,plan_code,plan_name,amount_monthly_pence,currency,total_paid_pence,cancel_at_period_end")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  const subscription = subscriptions?.[0];
  if (!subscription || isAdminUser) return;
  currentSubscription = subscription;

  premium.subscriptionStatus.textContent = subscription.cancel_at_period_end
    ? `${subscription.status} - canceling`
    : subscription.status;
  premium.subscriptionRenewal.textContent = formatDate(subscription.current_period_end);
  premium.subscriptionPaid.textContent = moneyFromPence(subscription.total_paid_pence);
  premium.subscriptionSince.textContent = formatDate(subscription.created_at);
  const planLabel = currentPlanCode() === "pro" ? "PropertyPanel Pro" : "PropertyPanel Premium";
  premium.subscriptionNote.textContent = `${planLabel}: ${moneyFromPence(subscription.amount_monthly_pence || 499)} / month. Manage card details, invoices and cancellation in Stripe Customer Portal.`;
  premium.manageBilling.textContent = "Manage subscription";
  premium.manageBilling.disabled = false;

  const { data: payments } = await supabaseClient
    .from("payments")
    .select("stripe_invoice_id,invoice_number,amount_pence,hosted_invoice_url,invoice_pdf_url,paid_at")
    .eq("user_id", user.id)
    .order("paid_at", { ascending: false })
    .limit(8);

  renderInvoices(payments || []);
}

async function syncSubscriptionFromStripe(sessionId = "") {
  if (!supabaseClient) return false;

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) return false;

  const { data, error } = await supabaseClient.functions.invoke(SYNC_SUBSCRIPTION_FUNCTION, {
    body: { session_id: sessionId },
  });

  if (error || data?.error) {
    const context = error?.context;
    const responseText =
      context && typeof context.text === "function"
        ? await context.text().catch(() => "")
        : "";
    const message = data?.error || responseText || error?.message || "Could not sync Stripe subscription yet.";
    premium.subscriptionNote.textContent = `Payment completed, but subscription sync failed: ${message}`;
    return false;
  }

  return data?.synced === true;
}

async function startStripeCheckout(plan = selectedPlan) {
  if (isAdminUser) {
    premium.subscriptionNote.textContent = "Admin accounts do not need Stripe checkout.";
    return;
  }

  if (!supabaseClient) {
    premium.subscriptionNote.textContent = "Supabase is not configured yet, so Stripe Checkout cannot start.";
    return;
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    premium.subscriptionNote.textContent = "Sign in first, then start Stripe Checkout.";
    premium.emailLoginForm.hidden = false;
    premium.loginEmail.focus();
    return;
  }

  premium.manageBilling.disabled = true;
  const checkoutPlan = plan === "pro" ? "pro" : "premium";
  premium.subscriptionNote.textContent = `Opening Stripe Checkout for ${checkoutPlan === "pro" ? "Pro - £9.99/month" : "Premium - £4.99/month"}...`;

  const { data, error } = await supabaseClient.functions.invoke(CHECKOUT_FUNCTION, {
    body: { plan: checkoutPlan },
  });

  premium.manageBilling.disabled = false;

  if (error || !data?.url) {
    const context = error?.context;
    const responseText =
      context && typeof context.text === "function"
        ? await context.text().catch(() => "")
        : "";
    const message = responseText || error?.message || "No checkout URL returned.";
    premium.subscriptionNote.textContent = `Stripe Checkout error: ${message}`;
    return;
  }

  sessionStorage.setItem(CHECKOUT_PENDING_STORAGE_KEY, checkoutPlan);
  window.location.href = data.url;
}

async function openStripePortal() {
  if (isAdminUser) {
    premium.subscriptionNote.textContent = "Admin accounts do not need Stripe billing.";
    return;
  }

  if (!supabaseClient) {
    premium.subscriptionNote.textContent = "Supabase is not configured yet, so Stripe Customer Portal cannot start.";
    return;
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    premium.subscriptionNote.textContent = "Sign in first, then manage your subscription.";
    premium.emailLoginForm.hidden = false;
    premium.loginEmail.focus();
    return;
  }

  premium.manageBilling.disabled = true;
  premium.subscriptionNote.textContent = "Opening Stripe Customer Portal...";

  const { data, error } = await supabaseClient.functions.invoke(PORTAL_FUNCTION, {
    body: {},
  });

  premium.manageBilling.disabled = false;

  if (error || !data?.url) {
    premium.subscriptionNote.textContent =
      "Stripe Customer Portal is not ready yet. Check STRIPE_SECRET_KEY and Stripe portal settings.";
    return;
  }

  window.location.href = data.url;
}

function handleSubscriptionAction() {
  const portalStatuses = ["active", "trialing", "past_due", "unpaid", "incomplete"];
  const canManageSubscription = currentSubscription && portalStatuses.includes(currentSubscription.status);
  if (canManageSubscription) {
    openStripePortal();
    return;
  }

  startStripeCheckout();
}

function renderAdminTable(target, rows, columns) {
  if (!target) return;

  if (!rows?.length) {
    target.innerHTML = `<div class="admin-row muted-row">No data yet</div>`;
    return;
  }

  target.replaceChildren(
    ...rows.map((row) => {
      const item = document.createElement("div");
      item.className = "admin-row";
      item.innerHTML = columns
        .map(
          ([label, key]) =>
            `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(row[key] ?? "-")}</strong></div>`,
        )
        .join("");
      return item;
    }),
  );
}

function renderAdminPromos(promos = []) {
  if (!premium.adminPromoList) return;

  if (!promos.length) {
    premium.adminPromoList.innerHTML = `<div class="admin-row muted-row">No promo codes yet</div>`;
    return;
  }

  premium.adminPromoList.replaceChildren(
    ...promos.map((promo) => {
      const row = document.createElement("div");
      row.className = "admin-row promo-admin-row";
      row.innerHTML = `
        <div><span>Code</span><strong>${escapeHtml(promo.code)}</strong></div>
        <div><span>Used</span><strong>${promo.redeemed_count || 0}/${promo.max_redemptions || "unlimited"}</strong></div>
        <div><span>Access</span><strong>${promo.lifetime_access ? "Infinity" : `${promo.free_months || 0} months`}</strong></div>
        <div><span>Expires</span><strong>${promo.expires_at ? formatDate(promo.expires_at) : "No expiry"}</strong></div>
        <button class="secondary-button small-button promo-delete-button" type="button" data-promo-delete="${escapeHtml(promo.code)}">Deactivate</button>
      `;
      return row;
    }),
  );
}

async function loadAdminOverview() {
  if (!supabaseClient) return false;

  const { data, error } = await supabaseClient.functions.invoke("secure-actions", {
    body: { action: "admin-overview" },
  });
  if (error || !data) {
    isAdminUser = false;
    premium.adminNav.hidden = true;
    return false;
  }

  isAdminUser = true;
  premium.adminNav.hidden = false;
  premium.adminUsers.textContent = data.totals?.users ?? 0;
  premium.adminSubscriptions.textContent = data.totals?.active_subscriptions ?? 0;
  premium.adminMrr.textContent = moneyFromPence(data.totals?.mrr_pence);
  premium.adminProperties.textContent = data.totals?.properties ?? 0;
  premium.adminPageViews.textContent = data.events?.page_view ?? 0;
  premium.adminPremiumViews.textContent = data.events?.premium_viewed ?? 0;
  premium.adminPdfExports.textContent = data.events?.pdf_exported ?? 0;
  premium.adminPromos.textContent = data.totals?.promo_redemptions ?? 0;

  renderAdminTable(premium.adminUserList, data.recent_users, [
    ["Email", "email"],
    ["Status", "status"],
    ["Joined", "joined"],
    ["Paid", "paid"],
  ]);
  renderAdminTable(premium.adminEventList, data.recent_events, [
    ["Event", "event_type"],
    ["When", "created"],
    ["User", "email"],
  ]);
  renderAdminPromos(data.promo_codes || []);
  return true;
}

async function createAdminPromoCode() {
  if (!supabaseClient) {
    premium.adminPromoMessage.textContent = "Supabase is not configured.";
    return;
  }

  const duration = premium.adminPromoDuration.value;
  const code = premium.adminPromoCode.value.trim().toUpperCase();
  const maxRedemptions = Number(premium.adminPromoUses.value) || null;
  const expiresAt = premium.adminPromoExpiry.value
    ? new Date(`${premium.adminPromoExpiry.value}T23:59:59`).toISOString()
    : null;

  premium.adminPromoMessage.textContent = "Creating promo code...";

  const { data, error } = await supabaseClient.functions.invoke("secure-actions", {
    body: {
      action: "create-admin-promo",
      code,
      max_redemptions: maxRedemptions,
      expires_at: expiresAt,
      free_months: duration === "infinity" ? 0 : Number(duration),
      lifetime_access: duration === "infinity",
    },
  });

  if (error || !data?.success) {
    premium.adminPromoMessage.textContent = error?.message || data?.message || "Could not create promo code.";
    return;
  }

  premium.adminPromoMessage.textContent = `Promo code ${code} created.`;
  premium.adminPromoForm.reset();
  premium.adminPromoUses.value = 10;
  loadAdminOverview();
}

async function deactivateAdminPromoCode(code) {
  if (!supabaseClient || !code) return;

  premium.adminPromoMessage.textContent = `Deactivating ${code}...`;
  const { data, error } = await supabaseClient.functions.invoke("secure-actions", {
    body: { action: "deactivate-admin-promo", code },
  });

  if (error || !data?.success) {
    premium.adminPromoMessage.textContent = error?.message || data?.message || "Could not deactivate promo code.";
    return;
  }

  premium.adminPromoMessage.textContent = `Promo code ${code} deactivated.`;
  loadAdminOverview();
}

async function loadSupabaseProperties(userId) {
  if (!supabaseClient) return false;

  const { data, error } = await supabaseClient
    .from("properties")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    premium.authMessage.textContent = error.message;
    return false;
  }

  const propertyIds = (data || []).map((property) => property.id);
  const { data: tenancies } = propertyIds.length
    ? await supabaseClient
        .from("tenancy_periods")
        .select("*")
        .in("property_id", propertyIds)
        .order("tenancy_start_date", { ascending: false })
    : { data: [] };
  const { data: remortgages } = propertyIds.length
    ? await supabaseClient
        .from("remortgage_events")
        .select("*")
        .in("property_id", propertyIds)
        .order("start_date", { ascending: false })
    : { data: [] };
  const tenancyIds = (tenancies || []).map((tenancy) => tenancy.id);
  const { data: rentChanges } = tenancyIds.length
    ? await supabaseClient
        .from("tenancy_rent_changes")
        .select("*")
        .in("tenancy_id", tenancyIds)
        .order("effective_date", { ascending: true })
    : { data: [] };

  if (!data?.length) {
    properties = [];
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(properties));
    return true;
  }

  properties = data.map((property) => {
    const propertyNotes = parsePropertyNotes(property.notes);
    return {
      id: property.id,
      name: property.name,
      addressLine1: property.address_line_1 || "",
      addressLine2: property.address_line_2 || "",
      town: property.city || "",
      postcode: property.postcode || "",
      region: property.region === "scotland" ? "Scotland" : "England",
      letType: property.let_type === "short_term" ? "Short-term let" : "Long-term let",
      ownershipModel: property.ownership_model || "Owned",
      landlordName: propertyNotes.landlordName,
      guaranteedRent: Number(property.guaranteed_rent || 0),
      maintenanceModel: property.maintenance_model || "Landlord charged for repairs",
      maintenanceFee: Number(property.maintenance_fee || 0),
      purchaseDate: property.purchase_date,
      purchasePrice: Number(property.purchase_price),
      currentValue: Number(property.current_value),
      deposit: Number(property.deposit_paid),
      mortgageBalance: Number(property.mortgage_balance),
      mortgageProductType: property.mortgage_product_type || "Fixed",
      rate: Number(property.mortgage_rate),
      mortgageExpiry: property.mortgage_expiry_date,
      rent: Number(property.monthly_rent),
      expenses: Number(property.operating_expenses),
      tenantName: property.tenant_name,
      tenantContact: property.tenant_email || property.tenant_phone,
      rentDueDay: property.rent_due_day || 1,
      rentReminder: property.rent_reminder_enabled ? "On" : "Off",
      landlordRegistration: property.landlord_registration_number,
      documents: propertyNotes.documents,
      tenancies: (tenancies || [])
        .filter((tenancy) => tenancy.property_id === property.id)
        .map((tenancy) =>
          normalizeTenancyRecord({
            id: tenancy.id,
            tenantName: tenancy.tenant_name,
            tenantContact: tenancy.tenant_contact,
            startDate: tenancy.tenancy_start_date,
            endDate: tenancy.tenancy_end_date,
            rent: Number(tenancy.monthly_rent),
            rentChanges: (rentChanges || [])
              .filter((change) => change.tenancy_id === tenancy.id)
              .map((change) => ({
                id: change.id,
                effectiveDate: change.effective_date,
                rent: Number(change.monthly_rent),
              })),
            documents: tenancy.document_names || [],
          }),
        ),
      remortgages: (remortgages || [])
        .filter((event) => event.property_id === property.id)
        .map((event) =>
          normalizeRemortgageRecord({
            id: event.id,
            productType: event.product_type,
            rate: Number(event.rate),
            balance: Number(event.mortgage_balance),
            termMonths: event.term_months,
            startDate: event.start_date,
            expiryDate: event.expiry_date,
            equityRelease: Number(event.equity_released),
            notes: event.notes,
          }),
        ),
    };
  });

  return true;
}

async function loadSupabaseTransactions(userId) {
  if (!supabaseClient) return false;

  const { data, error } = await supabaseClient
    .from("property_transactions")
    .select("*")
    .eq("user_id", userId)
    .order("transaction_date", { ascending: false });

  if (error) return false;

  transactions = (data || []).map((transaction) =>
    normalizeTransactionRecord({
      id: transaction.id,
      propertyId: transaction.property_id || "",
      documentId: transaction.document_id || "",
      date: transaction.transaction_date,
      amount: transaction.amount,
      type: transaction.transaction_type,
      category: transaction.category,
      taxTreatment: transaction.tax_treatment,
      source: transaction.source,
      status: transaction.status,
      notes: transaction.notes,
    }),
  );
  localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
  return true;
}

async function loadSupabaseDocuments(userId) {
  if (!supabaseClient) return false;

  const { data, error } = await supabaseClient
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return false;

  documents = (data || []).map((document) =>
    normalizeDocumentRecord({
      id: document.id,
      propertyId: document.property_id || "",
      label: document.label,
      documentType: document.document_type,
      storagePath: document.storage_path,
      fileName: document.file_name,
      fileSize: document.file_size,
      mimeType: document.mime_type,
      expiryDate: document.expiry_date,
      reminderEnabled: document.reminder_enabled,
      pageCount: document.page_count,
      aiStatus: document.ai_status,
      aiResult: document.ai_result,
      paymentStatus: document.ai_result?.paymentStatus,
      aiError: document.ai_error,
      aiScannedAt: document.ai_scanned_at,
      createdAt: document.created_at,
    }),
  );
  localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
  return true;
}

async function savePropertyToSupabase(property) {
  if (!supabaseClient) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("properties")
    .insert({
      user_id: user.id,
      name: property.name,
      address_line_1: property.addressLine1 || null,
      address_line_2: property.addressLine2 || null,
      city: property.town || null,
      postcode: property.postcode || null,
      region: property.region.toLowerCase(),
      let_type: property.letType === "Short-term let" ? "short_term" : "long_term",
      ownership_model: property.ownershipModel,
      guaranteed_rent: property.guaranteedRent,
      maintenance_model: property.maintenanceModel,
      maintenance_fee: property.maintenanceFee,
      purchase_date: property.purchaseDate || null,
      purchase_price: property.purchasePrice,
      current_value: property.currentValue,
      deposit_paid: property.deposit,
      mortgage_balance: property.mortgageBalance,
      mortgage_product_type: property.mortgageProductType,
      mortgage_rate: property.rate,
      mortgage_expiry_date: property.mortgageExpiry || null,
      monthly_rent: property.rent,
      operating_expenses: property.expenses,
      rent_due_day: property.rentDueDay,
      rent_reminder_enabled: property.rentReminder === "On",
      tenant_name: property.tenantName || null,
      tenant_email: property.tenantContact?.includes("@") ? property.tenantContact : null,
      tenant_phone: property.tenantContact?.includes("@") ? null : property.tenantContact || null,
      landlord_registration_number: property.landlordRegistration || null,
      notes: propertyNotesPayload(property),
    })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
}

async function saveTransactionToSupabase(transaction) {
  if (!supabaseClient) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("property_transactions")
    .insert({
      user_id: user.id,
      property_id: isPersistedProperty({ id: transaction.propertyId }) ? transaction.propertyId : null,
      document_id: isPersistedProperty({ id: transaction.documentId }) ? transaction.documentId : null,
      transaction_date: transaction.date,
      amount: transaction.amount,
      transaction_type: transaction.type,
      category: transaction.category,
      tax_treatment: transaction.taxTreatment,
      source: transaction.source,
      status: transaction.status,
      notes: transaction.notes || null,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
}

async function updateTransactionInSupabase(transaction) {
  if (!supabaseClient || !isPersistedProperty(transaction)) return;

  const { error } = await supabaseClient
    .from("property_transactions")
    .update({
      property_id: isPersistedProperty({ id: transaction.propertyId }) ? transaction.propertyId : null,
      document_id: isPersistedProperty({ id: transaction.documentId }) ? transaction.documentId : null,
      transaction_date: transaction.date,
      amount: transaction.amount,
      transaction_type: transaction.type,
      category: transaction.category,
      tax_treatment: transaction.taxTreatment,
      source: transaction.source,
      status: transaction.status,
      notes: transaction.notes || null,
    })
    .eq("id", transaction.id);
  if (error) throw error;
}

async function deleteTransactionFromSupabase(transactionId) {
  if (!supabaseClient || !isPersistedProperty({ id: transactionId })) return;
  const { error } = await supabaseClient.from("property_transactions").delete().eq("id", transactionId);
  if (error) throw error;
}

function safeStorageFileName(fileName) {
  return fileName.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "document";
}

async function saveDocumentToSupabase(document, file) {
  if (!supabaseClient || !file) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const storagePath = `${user.id}/${document.propertyId}/${Date.now()}-${safeStorageFileName(file.name)}`;
  const { error: uploadError } = await supabaseClient.storage
    .from("property-documents")
    .upload(storagePath, file, { contentType: file.type || "application/octet-stream" });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error } = await supabaseClient
    .from("documents")
    .insert({
      user_id: user.id,
      property_id: document.propertyId,
      label: document.label,
      document_type: document.documentType,
      storage_path: storagePath,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type || "application/octet-stream",
      expiry_date: document.expiryDate || null,
      reminder_enabled: document.reminderEnabled,
      page_count: document.pageCount,
      ai_result: { paymentStatus: document.paymentStatus || "not_applicable" },
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return normalizeDocumentRecord({
    id: data.id,
    propertyId: data.property_id,
    label: data.label,
    documentType: data.document_type,
    storagePath: data.storage_path,
    fileName: data.file_name,
    fileSize: data.file_size,
    mimeType: data.mime_type,
    expiryDate: data.expiry_date,
    reminderEnabled: data.reminder_enabled,
    pageCount: data.page_count,
    aiStatus: data.ai_status,
    aiResult: data.ai_result,
    paymentStatus: data.ai_result?.paymentStatus,
    aiError: data.ai_error,
    aiScannedAt: data.ai_scanned_at,
    createdAt: data.created_at,
  });
}

function propertyDocumentPayloadFromControls(source) {
  if (source === "expenses") {
    return {
      label: premium.expenseDocumentLabel.value.trim(),
      documentType: premium.expenseDocumentType.value,
      paymentStatus: premium.expenseDocumentPaymentStatus.value,
      expiryDate: "",
      expenseDate: premium.expenseDocumentDate.value,
      amount: Number(premium.expenseDocumentAmount.value) || 0,
      category: premium.expenseDocumentCategory.value.trim(),
      notes: premium.expenseDocumentNotes.value.trim(),
      file: premium.expenseDocumentFile.files?.[0] || null,
      message: premium.expenseDocumentMessage,
      form: premium.expenseDocumentForm,
    };
  }

  return {
    label: premium.documentLabel.value.trim(),
    documentType: premium.documentType.value,
    paymentStatus: premium.documentPaymentStatus.value,
    expiryDate: premium.documentExpiry.value,
    expenseDate: premium.documentExpenseDate.value,
    amount: Number(premium.documentExpenseAmount.value) || 0,
    category: premium.documentExpenseCategory.value.trim(),
    notes: premium.documentExpenseNotes.value.trim(),
    file: premium.documentFile.files?.[0] || null,
    message: premium.documentMessage,
    form: premium.documentForm,
  };
}

async function savePropertyDocumentOrExpense(source = "documents") {
  if (!hasPremiumAccess()) {
    showSubscriptionRequired();
    return;
  }

  const property = activeProperty();
  const payload = propertyDocumentPayloadFromControls(source);
  if (!property) {
    payload.message.textContent = "Open a property record before saving documents or expenses.";
    return;
  }

  if (!payload.file && !payload.amount) {
    payload.message.textContent = "Add a file, an expense amount, or both.";
    return;
  }

  const submitButton = payload.form.querySelector("button[type='submit']");
  setButtonBusy(submitButton, true, "Saving...");
  payload.message.textContent = "Saving...";

  try {
    let savedDocument = null;
    let savedExpense = false;
    if (payload.file) {
      savedDocument = await saveDocumentToSupabase(
        normalizeDocumentRecord({
          propertyId: property.id,
          label: payload.label || payload.category || payload.file.name,
          documentType: payload.documentType,
          expiryDate: payload.expiryDate,
          reminderEnabled: source === "documents" ? premium.documentReminder?.checked || false : false,
          paymentStatus: payload.paymentStatus,
          pageCount: 1,
        }),
        payload.file,
      );
      if (savedDocument) documents = [savedDocument, ...documents.filter((item) => item.id !== savedDocument.id)];
      if (!savedDocument) throw new Error("Could not save document.");
    }

    if (payload.amount) {
      const transaction = normalizeTransactionRecord({
        propertyId: property.id,
        documentId: savedDocument?.id || "",
        date: payload.expenseDate || new Date().toISOString().slice(0, 10),
        amount: payload.amount,
        type: "expense",
        category: payload.category || payload.label || payload.documentType || "Expense",
        taxTreatment: "revenue",
        source: savedDocument ? "pdf" : "manual",
        status: payload.paymentStatus === "paid" ? "approved" : "draft",
        notes: payload.notes || (savedDocument ? `Linked document: ${savedDocument.label}` : ""),
      });
      const savedId = await saveTransactionToSupabase(transaction);
      if (savedId) transaction.id = savedId;
      transactions = [transaction, ...transactions];
      savedExpense = true;
    }

    payload.form.reset();
    if (premium.documentReminder && !hasProAccess()) premium.documentReminder.checked = false;
    const successMessage = payload.file && savedExpense
      ? "Document and expense saved."
      : payload.file
        ? "Document saved."
        : "Expense saved.";
    renderTransactions();
    renderDocuments();
    renderPropertyDetail();
    switchPropertyDetailTab(source === "expenses" ? "expenses" : "documents");
    payload.message.textContent = successMessage;
  } catch (error) {
    payload.message.textContent = error?.message || "Could not save document or expense.";
  } finally {
    setButtonBusy(submitButton, false);
  }
}

async function deleteDocumentFromSupabase(document) {
  if (!supabaseClient || !isPersistedProperty(document)) return;
  if (document.storagePath) {
    const { error: storageError } = await supabaseClient.storage.from("property-documents").remove([document.storagePath]);
    if (storageError) throw storageError;
  }
  const { error } = await supabaseClient.from("documents").delete().eq("id", document.id);
  if (error) throw error;
}

async function openDocument(documentRecord, popupWindow = null) {
  if (!supabaseClient || !documentRecord.storagePath) {
    if (popupWindow && !popupWindow.closed) popupWindow.close();
    return;
  }
  premium.documentMessage.textContent = "Opening document...";
  const { data, error } = await supabaseClient.storage
    .from("property-documents")
    .createSignedUrl(documentRecord.storagePath, 300);
  if (error || !data?.signedUrl) {
    if (popupWindow && !popupWindow.closed) popupWindow.close();
    premium.documentMessage.textContent = error?.message || "Could not open document.";
    return;
  }

  const showOpenLink = (message) => {
    premium.documentMessage.replaceChildren();
    premium.documentMessage.append(`${message} `);
    const fallbackLink = document.createElement("a");
    fallbackLink.className = "inline-link";
    fallbackLink.href = data.signedUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noreferrer";
    fallbackLink.textContent = "Open file";
    premium.documentMessage.append(fallbackLink);
  };

  if (popupWindow && !popupWindow.closed) {
    try {
      popupWindow.location.replace(data.signedUrl);
      showOpenLink("Document opened in a new tab. If it stays blank,");
      return;
    } catch (error) {
      popupWindow.close();
    }
  }

  const openedWindow = window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  showOpenLink(openedWindow ? "Document opened in a new tab. If it stays blank," : "Document ready:");
}

async function saveTenancyToSupabase(property, tenancy) {
  if (!supabaseClient || !isPersistedProperty(property)) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("tenancy_periods")
    .insert({
      user_id: user.id,
      property_id: property.id,
      tenant_name: tenancy.tenantName || null,
      tenant_contact: tenancy.tenantContact || null,
      tenancy_start_date: tenancy.startDate || null,
      tenancy_end_date: tenancy.endDate || null,
      monthly_rent: tenancy.rent || 0,
      document_names: tenancyDocumentsPayload(tenancy),
    })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
}

async function updateTenancyInSupabase(property, tenancy) {
  if (!supabaseClient || !isPersistedProperty(property) || !isPersistedProperty(tenancy)) return;

  const { error } = await supabaseClient
    .from("tenancy_periods")
    .update({
      tenant_name: tenancy.tenantName || null,
      tenant_contact: tenancy.tenantContact || null,
      tenancy_start_date: tenancy.startDate || null,
      tenancy_end_date: tenancy.endDate || null,
      monthly_rent: tenancy.rent || 0,
      document_names: tenancyDocumentsPayload(tenancy),
    })
    .eq("id", tenancy.id);
  if (error) throw error;
}

async function deleteTenancyFromSupabase(property, tenancyId) {
  if (!supabaseClient || !isPersistedProperty(property) || !isPersistedProperty({ id: tenancyId })) return;
  const { error } = await supabaseClient.from("tenancy_periods").delete().eq("id", tenancyId);
  if (error) throw error;
}

async function saveTenancyRentChangeToSupabase(property, tenancy, rentChange) {
  if (!supabaseClient || !isPersistedProperty(property) || !isPersistedProperty(tenancy)) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("tenancy_rent_changes")
    .upsert({
      user_id: user.id,
      property_id: property.id,
      tenancy_id: tenancy.id,
      effective_date: rentChange.effectiveDate,
      monthly_rent: rentChange.rent,
    }, { onConflict: "tenancy_id,effective_date" })
    .select("id,effective_date,monthly_rent")
    .single();
  if (error) throw error;
  return {
    id: data.id,
    effectiveDate: data.effective_date,
    rent: Number(data.monthly_rent),
  };
}

async function deleteTenancyRentChangeFromSupabase(rentChangeId) {
  if (!supabaseClient || !isPersistedProperty({ id: rentChangeId })) return;
  const { error } = await supabaseClient.from("tenancy_rent_changes").delete().eq("id", rentChangeId);
  if (error) throw error;
}

async function saveRemortgageToSupabase(property, remortgage) {
  if (!supabaseClient || !isPersistedProperty(property)) return null;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("remortgage_events")
    .insert({
      user_id: user.id,
      property_id: property.id,
      product_type: remortgage.productType,
      rate: remortgage.rate || 0,
      mortgage_balance: remortgage.balance || 0,
      term_months: remortgage.termMonths || null,
      start_date: remortgage.startDate || null,
      expiry_date: remortgage.expiryDate || null,
      equity_released: remortgage.equityRelease || 0,
      notes: remortgageNotesPayload(remortgage),
    })
    .select("id")
    .single();

  if (error) throw error;
  return data?.id || null;
}

async function updateRemortgageInSupabase(property, remortgage) {
  if (!supabaseClient || !isPersistedProperty(property) || !isPersistedProperty(remortgage)) return;

  const { error } = await supabaseClient
    .from("remortgage_events")
    .update({
      product_type: remortgage.productType,
      rate: remortgage.rate || 0,
      mortgage_balance: remortgage.balance || 0,
      term_months: remortgage.termMonths || null,
      start_date: remortgage.startDate || null,
      expiry_date: remortgage.expiryDate || null,
      equity_released: remortgage.equityRelease || 0,
      notes: remortgageNotesPayload(remortgage),
    })
    .eq("id", remortgage.id);
  if (error) throw error;
}

async function deleteRemortgageFromSupabase(property, remortgageId) {
  if (!supabaseClient || !isPersistedProperty(property) || !isPersistedProperty({ id: remortgageId })) return;
  const { error } = await supabaseClient.from("remortgage_events").delete().eq("id", remortgageId);
  if (error) throw error;
}

async function updateSupabasePropertySnapshot(property) {
  if (!supabaseClient || !isPersistedProperty(property)) return;

  const mortgageDeal = latestMortgageDeal(property);
  const { error } = await supabaseClient
    .from("properties")
    .update({
      name: property.name,
      address_line_1: property.addressLine1 || null,
      address_line_2: property.addressLine2 || null,
      city: property.town || null,
      postcode: property.postcode || null,
      region: property.region.toLowerCase(),
      let_type: property.letType === "Short-term let" ? "short_term" : "long_term",
      purchase_date: property.purchaseDate || null,
      purchase_price: property.purchasePrice,
      current_value: property.currentValue,
      deposit_paid: property.deposit,
      monthly_rent: property.rent,
      operating_expenses: property.expenses,
      ownership_model: property.ownershipModel,
      guaranteed_rent: property.guaranteedRent,
      maintenance_model: property.maintenanceModel,
      maintenance_fee: property.maintenanceFee,
      rent_due_day: property.rentDueDay,
      rent_reminder_enabled: property.rentReminder === "On",
      mortgage_balance: mortgageDeal.balance,
      mortgage_product_type: mortgageDeal.productType,
      mortgage_rate: mortgageDeal.rate,
      mortgage_expiry_date: mortgageDeal.expiryDate || null,
      landlord_registration_number: property.landlordRegistration || null,
      notes: propertyNotesPayload(property),
    })
    .eq("id", property.id);
  if (error) throw error;
}

function getAuthRedirectUrl() {
  if (window.location.protocol === "file:") return window.location.href.split("#")[0];
  return `${window.location.origin}${window.location.pathname}`;
}

function isPasswordRecoveryUrl() {
  return (
    passwordRecoveryPending ||
    window.location.hash.includes("type=recovery") ||
    window.location.search.includes("type=recovery")
  );
}

function showPasswordRecoveryForm() {
  switchView("loginView");
  premium.loginPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  premium.emailLoginForm.hidden = true;
  premium.passwordResetForm.hidden = false;
  premium.resetMessage.textContent = "Set a new password for this account.";
  premium.newPassword.focus();
}

function setAuthMode(mode) {
  authMode = mode;
  premium.emailLoginForm.hidden = false;
  premium.authModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });

  const needsPassword = mode !== "forgot";
  premium.loginPasswordWrap.hidden = !needsPassword;
  premium.loginPassword.required = needsPassword;
  premium.loginPassword.autocomplete = mode === "signup" ? "new-password" : "current-password";
  if (mode === "signup") {
    premium.loginPassword.setAttribute("pattern", "(?=.*[A-Za-z])(?=.*\\d).{8,}");
  } else {
    premium.loginPassword.removeAttribute("pattern");
  }

  if (mode === "signup") {
    premium.emailAuthSubmit.textContent = "Create account";
    premium.authMessage.textContent = "Use at least 8 characters, including a letter and a number.";
  } else if (mode === "signin") {
    premium.emailAuthSubmit.textContent = "Sign in";
    premium.authMessage.textContent = "Sign in with your email and password.";
  } else {
    premium.emailAuthSubmit.textContent = "Send reset link";
    premium.authMessage.textContent = "Enter your email and PropertyPanel will send a secure password reset link.";
  }
}

async function handleEmailAuth() {
  if (!supabaseClient) {
    premium.authMessage.textContent = "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY to config.js.";
    return;
  }

  const email = premium.loginEmail.value.trim();
  const password = premium.loginPassword.value;
  premium.emailAuthSubmit.disabled = true;

  if (authMode === "signup") {
    if (!passwordMeetsRequirements(password)) {
      premium.emailAuthSubmit.disabled = false;
      premium.authMessage.textContent = PASSWORD_REQUIREMENTS;
      return;
    }

    premium.authMessage.textContent = "Creating account...";
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAuthRedirectUrl(),
      },
    });

    premium.emailAuthSubmit.disabled = false;
    if (error) {
      premium.authMessage.textContent = error.message;
      return;
    }

    if (data.session) {
      premium.authMessage.textContent = "Account created. Opening your dashboard...";
      await initAuth();
      return;
    }

    premium.authMessage.textContent = "Account created. Check your email to confirm it, then sign in.";
    return;
  }

  if (authMode === "signin") {
    premium.authMessage.textContent = "Signing in...";
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

    premium.emailAuthSubmit.disabled = false;
    if (error) {
      premium.authMessage.textContent = error.message;
      return;
    }

    premium.authMessage.textContent = "Signed in. Opening your dashboard...";
    await initAuth();
    return;
  }

  premium.authMessage.textContent = "Sending password reset link...";
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: getAuthRedirectUrl(),
  });

  premium.emailAuthSubmit.disabled = false;
  premium.authMessage.textContent = error
    ? error.message
    : "Password reset email sent. Open the link and set a new password here.";
}

async function updatePassword(password, messageTarget, buttonTarget) {
  if (!supabaseClient) {
    messageTarget.textContent = "Supabase is not configured.";
    return false;
  }

  if (!passwordMeetsRequirements(password)) {
    messageTarget.textContent = PASSWORD_REQUIREMENTS;
    return false;
  }

  buttonTarget.disabled = true;
  messageTarget.textContent = "Updating password...";
  const { error } = await supabaseClient.auth.updateUser({ password });
  buttonTarget.disabled = false;

  if (error) {
    messageTarget.textContent = error.message;
    return false;
  }

  passwordRecoveryPending = false;
  window.history.replaceState({}, document.title, getAuthRedirectUrl());
  messageTarget.textContent = "Password updated.";
  return true;
}

async function updateRecoveredPassword() {
  const updated = await updatePassword(
    premium.newPassword.value,
    premium.resetMessage,
    premium.resetPasswordSubmit,
  );

  if (!updated) {
    return;
  }

  premium.passwordResetForm.hidden = true;
  setAuthMode("signin");
  premium.authMessage.textContent = "Password updated. You can now sign in with the new password.";
}

async function updateDashboardPassword() {
  const updated = await updatePassword(
    premium.accountPassword.value,
    premium.accountPasswordMessage,
    premium.accountPasswordForm.querySelector("button"),
  );

  if (updated) {
    premium.accountPassword.value = "";
  }
}

function buildAccountExportPayload(userId = null) {
  return {
    exportedAt: new Date().toISOString(),
    account: {
      userId,
      subscription: currentSubscription
        ? {
            plan: currentPlanCode(),
            status: currentSubscription.status || "unknown",
            nextRenewal: currentSubscription.current_period_end || currentSubscription.currentPeriodEnd || null,
          }
        : null,
    },
    properties,
    transactions,
    documents: documents.map((documentRecord) => ({
      id: documentRecord.id,
      propertyId: documentRecord.propertyId,
      label: documentRecord.label,
      documentType: documentRecord.documentType,
      fileName: documentRecord.fileName,
      fileSize: documentRecord.fileSize,
      mimeType: documentRecord.mimeType,
      expiryDate: documentRecord.expiryDate,
      reminderEnabled: documentRecord.reminderEnabled,
      paymentStatus: documentRecord.paymentStatus,
      createdAt: documentRecord.createdAt,
    })),
  };
}

async function exportAccountData() {
  const {
    data: { user },
  } = supabaseClient ? await supabaseClient.auth.getUser() : { data: { user: null } };

  downloadJson(buildAccountExportPayload(user?.id || null), `propertypanel-data-${new Date().toISOString().slice(0, 10)}.json`);
  premium.privacyMessage.textContent = "Portfolio data export downloaded.";
}

async function deletePortfolioData() {
  const firstConfirm = window.confirm(
    "Delete all portfolio data for this account? This removes properties, documents and transactions, but keeps billing records.",
  );
  if (!firstConfirm) return;

  const secondConfirm = window.confirm("This cannot be undone. Do you want to permanently delete the portfolio data?");
  if (!secondConfirm) return;

  const button = premium.deletePortfolioData;
  setButtonBusy(button, true, "Deleting...");
  premium.privacyMessage.textContent = "Deleting portfolio data...";

  try {
    const {
      data: { user },
    } = supabaseClient ? await supabaseClient.auth.getUser() : { data: { user: null } };

    if (supabaseClient && user) {
      const storagePaths = documents
        .map((documentRecord) => documentRecord.storagePath)
        .filter(Boolean);
      if (storagePaths.length) {
        const { error: storageError } = await supabaseClient.storage.from("property-documents").remove(storagePaths);
        if (storageError) throw storageError;
      }

      const { error: transactionDeleteError } = await supabaseClient.from("property_transactions").delete().eq("user_id", user.id);
      if (transactionDeleteError) throw transactionDeleteError;

      const { error: documentDeleteError } = await supabaseClient.from("documents").delete().eq("user_id", user.id);
      if (documentDeleteError) throw documentDeleteError;

      const { error: propertyDeleteError } = await supabaseClient.from("properties").delete().eq("user_id", user.id);
      if (propertyDeleteError) throw propertyDeleteError;
    }

    properties = [];
    transactions = [];
    documents = [];
    activePropertyId = null;
    localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(properties));
    localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
    localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(documents));
    localStorage.removeItem(ACTIVE_PROPERTY_STORAGE_KEY);
    premium.propertyDetailPanel.hidden = true;
    premium.propertyModal.hidden = true;
    switchView("dashboardView");
    premium.dashboardPanel.hidden = false;
    switchDashboardTab("overview");
    saveUiState({ viewId: "dashboardView", dashboardTab: "overview", activePropertyId: null, propertyDetailTab: "overview" });
    renderPremiumDashboard();
    premium.privacyMessage.textContent = "Portfolio data deleted. Billing and login details were not removed.";
  } catch (error) {
    premium.privacyMessage.textContent = error?.message || "Could not delete portfolio data.";
  } finally {
    setButtonBusy(button, false);
  }
}

function switchSection(buttons, panels, activeKey, buttonAttr, panelAttr) {
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset[buttonAttr] === activeKey);
  });

  panels.forEach((panel) => {
    panel.hidden = panel.dataset[panelAttr] !== activeKey;
  });
}

function switchDashboardTab(tabName) {
  const availableTabs = [...premium.dashboardTabButtons].map((button) => button.dataset.dashboardTab);
  if (!availableTabs.includes(tabName)) tabName = "overview";

  switchSection(
    premium.dashboardTabButtons,
    premium.dashboardPanels,
    tabName,
    "dashboardTab",
    "dashboardPanel",
  );
  saveUiState({ viewId: "dashboardView", dashboardTab: tabName });
}

function switchAdminTab(tabName) {
  switchSection(premium.adminTabButtons, premium.adminPanels, tabName, "adminTab", "adminPanel");
}

async function logoutUser() {
  promoAccess = false;
  isAdminUser = false;
  currentUser = null;
  localStorage.removeItem(PROMO_STORAGE_KEY);
  localStorage.removeItem(UI_STATE_STORAGE_KEY);

  if (supabaseClient) {
    await supabaseClient.auth.signOut();
  }

  premium.dashboardPanel.hidden = true;
  premium.adminNav.hidden = true;
  premium.emailLoginForm.hidden = false;
  premium.passwordResetForm.hidden = true;
  premium.authMessage.textContent = "Signed out.";
  setAuthMode("signin");
  updateNavAuthButton(false);
  switchView("homeView");
}

async function initAuth() {
  if (!supabaseClient) {
    premium.authMessage.textContent = "Supabase key is not configured in app.js yet.";
    return;
  }

  if (!authListenerAttached) {
    authListenerAttached = true;
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        passwordRecoveryPending = true;
        showPasswordRecoveryForm();
      }
    });
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const checkoutStatus = checkoutStatusFromUrl();
  const checkoutSessionId = checkoutSessionIdFromUrl();

  if (isPasswordRecoveryUrl()) {
    showPasswordRecoveryForm();
    return;
  }

  if (session?.user) {
    currentUser = session.user;
    updateNavAuthButton(true);
    if (checkoutStatus === "success") {
      premium.subscriptionNote.textContent = "Payment completed. Syncing your subscription...";
      await syncSubscriptionFromStripe(checkoutSessionId);
    }

    await loadSubscriptionSummary();
    if (!hasPremiumAccess() && !subscriptionSyncAttempted) {
      subscriptionSyncAttempted = true;
      await syncSubscriptionFromStripe(checkoutSessionId);
      await loadSubscriptionSummary();
    }

    if (checkoutStatus === "success") {
      premium.subscriptionNote.textContent = "Payment completed. Refreshing your subscription status...";
      setTimeout(() => loadSubscriptionSummary(), 2500);
    } else if (checkoutStatus === "cancelled") {
      premium.subscriptionNote.textContent = "Checkout cancelled. You can choose a plan again when ready.";
    }
    await loadAdminOverview();
    await refreshPlanContinueButton();

    if (!hasPremiumAccess()) {
      clearPremiumDataForLockedAccount();
      showSubscriptionRequired(
        checkoutStatus === "success"
          ? "Payment completed, but Stripe has not confirmed an active subscription yet. Try refresh in a moment or check the Stripe webhook."
          : "Your account is signed in, but the portfolio dashboard needs an active Premium or Pro subscription.",
      );
      if (checkoutStatus === "success") {
        setTimeout(async () => {
          await syncSubscriptionFromStripe(checkoutSessionId);
          await loadSubscriptionSummary();
          if (hasPremiumAccess()) {
            await loadSupabaseProperties(session.user.id);
            await loadSupabaseTransactions(session.user.id);
            await loadSupabaseDocuments(session.user.id);
            restoreSavedLocation();
            switchDashboardTab("subscription");
          }
        }, 3000);
      }
      if (checkoutStatus) {
        sessionStorage.removeItem(CHECKOUT_PENDING_STORAGE_KEY);
        cleanCheckoutUrl();
      }
      return;
    }

    await loadSupabaseProperties(session.user.id);
    await loadSupabaseTransactions(session.user.id);
    await loadSupabaseDocuments(session.user.id);
    restoreSavedLocation();
    if (checkoutStatus) {
      switchDashboardTab("subscription");
      sessionStorage.removeItem(CHECKOUT_PENDING_STORAGE_KEY);
      cleanCheckoutUrl();
    }
    return;
  }

  currentUser = null;
  updateNavAuthButton(false);

  if (checkoutStatus === "success") {
    const pendingPlan = sessionStorage.getItem(CHECKOUT_PENDING_STORAGE_KEY);
    if (pendingPlan) setSelectedPlan(pendingPlan);
    switchView("loginView");
    setAuthMode("signin");
    premium.authMessage.textContent =
      "Payment completed, but this browser session needs you to sign in again to reopen your dashboard.";
    premium.loginEmail.focus();
    cleanCheckoutUrl();
  } else if (checkoutStatus === "cancelled") {
    switchView("premiumView");
    document.querySelector("#purchasePanel").scrollIntoView({ behavior: "smooth", block: "center" });
    cleanCheckoutUrl();
  }
}

async function trackEvent(eventType, metadata = {}) {
  if (!supabaseClient) return;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  await supabaseClient.from("analytics_events").insert({
    user_id: user?.id || null,
    event_type: eventType,
    metadata,
  });
}

async function redeemPromoCode(code, messageTarget = premium.promoMessage) {
  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) {
    messageTarget.textContent = "Enter a promo code.";
    return;
  }

  if (!supabaseClient) {
    messageTarget.textContent = "Promo codes are checked securely online. Try again after the app is connected.";
    return;
  }

  const { data, error } = await supabaseClient.functions.invoke("secure-actions", {
    body: { action: "redeem-promo", code: normalizedCode },
  });

  if (error || !data?.accepted) {
    messageTarget.textContent = data?.message || "Promo not recognised.";
    return;
  }

  promoAccess = true;
  localStorage.setItem(PROMO_STORAGE_KEY, "true");
  messageTarget.textContent = "Promo accepted. Premium access unlocked.";
  await trackEvent("promo_redeemed", { code: normalizedCode, mode: "supabase" });
  loadSubscriptionSummary();
  openDashboard();
}

function selectedTaxBand() {
  return taxBands[taxResidence].find((band) => band.id === inputs.taxBand.value) || taxBands[taxResidence][1];
}

function renderTaxBands(preferredBand = "higher") {
  const bands = taxBands[taxResidence];
  const nextBand = bands.some((band) => band.id === preferredBand) ? preferredBand : "higher";

  inputs.taxBand.replaceChildren(
    ...bands.map((band) => {
      const option = document.createElement("option");
      option.value = band.id;
      option.textContent = band.label;
      option.selected = band.id === nextBand;
      return option;
    }),
  );
}

function calculateBandedTax(price, bands) {
  let duty = 0;
  let previous = 0;

  for (const band of bands) {
    if (price > previous) {
      duty += (Math.min(price, band.threshold) - previous) * band.rate;
    }
    previous = band.threshold;
    if (price <= band.threshold) break;
  }

  return duty;
}

function calculateResidentialLbtt(price) {
  return calculateBandedTax(price, [
    { threshold: 145000, rate: 0 },
    { threshold: 250000, rate: 0.02 },
    { threshold: 325000, rate: 0.05 },
    { threshold: 750000, rate: 0.1 },
    { threshold: Infinity, rate: 0.12 },
  ]);
}

function calculateEnglandNonResidentialTax(price) {
  return calculateBandedTax(price, [
    { threshold: 150000, rate: 0 },
    { threshold: 250000, rate: 0.02 },
    { threshold: Infinity, rate: 0.05 },
  ]);
}

function calculateScotlandNonResidentialTax(price) {
  return calculateBandedTax(price, [
    { threshold: 150000, rate: 0 },
    { threshold: 250000, rate: 0.01 },
    { threshold: Infinity, rate: 0.05 },
  ]);
}

function calculateCommercialTax(price) {
  if (region === "scotland") {
    return {
      baseTax: calculateScotlandNonResidentialTax(price),
      supplement: 0,
      total: calculateScotlandNonResidentialTax(price),
      label: "Commercial LBTT",
      basis:
        "Scotland non-residential LBTT: 0% up to £150k, 1% from £150,001 to £250k, then 5% above £250k. This applies to commercial, mixed-use and certain non-residential property.",
    };
  }

  return {
    baseTax: calculateEnglandNonResidentialTax(price),
    supplement: 0,
    total: calculateEnglandNonResidentialTax(price),
    label: "Commercial SDLT",
    basis:
      "England non-residential/mixed SDLT: 0% up to £150k, 2% from £150,001 to £250k, then 5% above £250k. Non-residential includes commercial property and 6 or more residential properties bought in one transaction.",
  };
}

function calculateBulkTax(price, dwellings) {
  if (region === "england") {
    if (dwellings >= 6) {
      const tax = calculateEnglandNonResidentialTax(price);
      return {
        baseTax: tax,
        supplement: 0,
        total: tax,
        label: "6+ SDLT",
        basis:
          "England: Multiple Dwellings Relief was abolished for SDLT transactions completing or substantially performing on or after 1 June 2024. However, 6 or more residential properties bought in one transaction are treated as non-residential for SDLT, so PropertyPanel applies non-residential rates here.",
      };
    }

    return {
      ...calculatePurchaseTax(price, 1, "residential"),
      basis:
        "England: Multiple Dwellings Relief was abolished from 1 June 2024. For fewer than 6 dwellings, PropertyPanel uses residential additional dwelling SDLT rates; confirm linked transaction treatment with a solicitor or tax adviser.",
    };
  }

  const residentialNoRelief = calculateResidentialLbtt(price);
  const averageDwellingPrice = dwellings ? price / dwellings : price;
  const mdrResidential = calculateResidentialLbtt(averageDwellingPrice) * dwellings;
  const minimumPrescribedAmount = residentialNoRelief * 0.25;
  const mdrBase = Math.max(mdrResidential, minimumPrescribedAmount);
  const ads = dwellings >= 6 ? 0 : price >= 40000 ? price * 0.08 : 0;
  const total = mdrBase + ads;

  return {
    baseTax: mdrBase,
    supplement: ads,
    total,
    label: "LBTT MDR",
    basis:
      `Scotland: MDR may apply to purchases of 2+ dwellings in one transaction or linked transactions. This estimate uses average dwelling value (${money.format(averageDwellingPrice)}) x ${dwellings}, then applies the 25% minimum prescribed amount. ADS is ${dwellings >= 6 ? "not applied because 6+ dwellings are treated as non-residential/ADS relieved" : "shown at 8% where applicable"}.`,
  };
}

function calculatePurchaseTax(price, dwellings = 1, mode = propertyType) {
  if (mode === "commercial") {
    return calculateCommercialTax(price);
  }

  if (mode === "bulk") {
    return calculateBulkTax(price, dwellings);
  }

  if (region === "scotland") {
    const lbtt = calculateResidentialLbtt(price);
    const ads = price >= 40000 ? price * 0.08 : 0;
    return {
      baseTax: lbtt,
      supplement: ads,
      total: lbtt + ads,
      label: "LBTT + ADS",
      basis:
        "Scotland: LBTT bands are 0% to £145k, 2% to £250k, 5% to £325k, 10% to £750k, then 12%. ADS is 8% of the purchase price for additional dwellings of £40k or more.",
    };
  }

  if (price < 40000) {
    return {
      baseTax: 0,
      supplement: 0,
      total: 0,
      label: "SDLT",
      basis:
        "England: additional dwelling SDLT higher rates generally start at £40k. Above that, rates are 5% to £125k, 7% to £250k, 10% to £925k, 15% to £1.5m, then 17%.",
    };
  }

  const sdlt = calculateBandedTax(price, [
    { threshold: 125000, rate: 0.05 },
    { threshold: 250000, rate: 0.07 },
    { threshold: 925000, rate: 0.1 },
    { threshold: 1500000, rate: 0.15 },
    { threshold: Infinity, rate: 0.17 },
  ]);
  return {
    baseTax: sdlt,
    supplement: 0,
    total: sdlt,
    label: "SDLT",
    basis:
      "England: additional dwelling SDLT higher rates are 5% to £125k, 7% to £250k, 10% to £925k, 15% to £1.5m, then 17%. The higher-rate rules generally start at £40k.",
  };
}

function interestOnlyPayment(loan, annualRate) {
  return loan * (annualRate / 100 / 12);
}

function monthlyMortgagePayment(loan, annualRate, years) {
  if (!loan || !years) return 0;

  const monthlyRate = annualRate / 100 / 12;

  if (mortgageType === "interestOnly") {
    return interestOnlyPayment(loan, annualRate);
  }

  const payments = years * 12;

  if (monthlyRate === 0) {
    return loan / payments;
  }

  return (loan * monthlyRate * (1 + monthlyRate) ** payments) / ((1 + monthlyRate) ** payments - 1);
}

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

function formatPercent(number) {
  return `${Math.abs(number) < 0.05 ? "0.0" : number.toFixed(1)}%`;
}

function buildInsights(metrics) {
  const insights = [];
  const taxNote =
    investorType === "ltd"
      ? "Ltd view: mortgage interest is treated more favourably in this simplified model, but corporation tax and accounting costs still matter."
      : "Individual view: this simplified model focuses on cashflow before personal income tax, so higher-rate tax can materially reduce the real return.";

  if (metrics.monthlyCashflow >= 250) {
    insights.push(`Cashflow looks healthy at ${money.format(metrics.monthlyCashflow)} per month before tax.`);
  } else if (metrics.monthlyCashflow >= 0) {
    insights.push(`Cashflow is positive but thin at ${money.format(metrics.monthlyCashflow)} per month. A small rate rise or repair bill could wipe this out.`);
  } else {
    insights.push(`This deal is cashflow negative by ${money.format(Math.abs(metrics.monthlyCashflow))} per month before tax.`);
  }

  if (metrics.roi >= 8) {
    insights.push(`ROI is strong at ${formatPercent(metrics.roi)}, assuming your rent and cost inputs are realistic.`);
  } else if (metrics.roi >= 4) {
    insights.push(`ROI is workable at ${formatPercent(metrics.roi)}, but negotiation, rent uplift, or lower refurb costs would make it more attractive.`);
  } else {
    insights.push(`ROI is weak at ${formatPercent(metrics.roi)}. The capital tied up may be too high for the income produced.`);
  }

  if (metrics.netYield < 4.5) {
    insights.push(`Net yield is below 4.5%, so this may rely more on capital growth than monthly income.`);
  }

  if (propertyType === "commercial") {
    insights.push("Commercial mode uses non-residential/mixed SDLT or LBTT rates. Leasehold premium and rent/NPV rules are not modelled yet.");
  }

  if (propertyType === "bulk") {
    insights.push(
      region === "england"
        ? "Bulk mode: England SDLT MDR is abolished for current transactions, but 6+ residential properties in one transaction can be treated as non-residential."
        : `Bulk mode: Scotland MDR estimate is based on ${metrics.dwellingCount} dwellings and average dwelling value. Confirm eligibility before relying on it.`,
    );
  }

  insights.push(
    `Estimated ${metrics.purchaseTax.label} is ${money.format(metrics.purchaseTax.total)} and total cash needed is ${money.format(metrics.cashNeeded)}.`,
  );
  insights.push(
    `ICR coverage is ${formatPercent(metrics.icrCoverage)} against a required rent of ${money.format(metrics.requiredRent)} at your selected factor.`,
  );
  insights.push(taxNote);

  return insights;
}

function scoreDeal(metrics) {
  let score = 50;

  score += clamp((metrics.monthlyCashflow - 100) / 10, -25, 25);
  score += clamp((metrics.roi - 5) * 4, -20, 24);
  score += clamp((metrics.netYield - 4.5) * 5, -16, 16);
  score -= metrics.loanToValue > 80 ? 8 : 0;

  return Math.round(clamp(score, 0, 100));
}

function calculateRentalTax(metrics) {
  const annualRent = metrics.rent * 12;
  const annualOperatingExpenses = metrics.expenses * 12;
  const annualMortgageInterest = metrics.interestOnlyCost * 12;
  const band = selectedTaxBand();

  if (investorType === "ltd") {
    const taxableProfit = Math.max(annualRent - annualOperatingExpenses - annualMortgageInterest, 0);
    const corporationTaxRate = taxableProfit <= 50000 ? 0.19 : 0.25;
    const annualTax = taxableProfit * corporationTaxRate;

    return {
      annualRent,
      annualOperatingExpenses,
      annualMortgageInterest,
      taxableProfit,
      relief: annualMortgageInterest,
      reliefLabel: "Mortgage interest deducted",
      annualTax,
      monthlyTax: annualTax / 12,
      note:
        "Ltd view: this simplified estimate deducts mortgage interest and operating expenses before Corporation Tax. GOV.UK lists 19% small profits rate up to £50k and 25% main rate above £250k; marginal relief can apply between those limits. Capital improvements are not normal repair expenses and are usually considered on sale for capital gains/corporation tax on chargeable gains.",
    };
  }

  const taxableProfit = Math.max(annualRent - annualOperatingExpenses, 0);
  const taxBeforeRelief = taxableProfit * band.rate;
  const financeCostTaxCredit = annualMortgageInterest * 0.2;
  const annualTax = Math.max(taxBeforeRelief - financeCostTaxCredit, 0);
  const residenceLabel = taxResidence === "scotland" ? "Scottish" : "England/Wales/NI";

  return {
    annualRent,
    annualOperatingExpenses,
    annualMortgageInterest,
    taxableProfit,
    relief: financeCostTaxCredit,
    reliefLabel: "20% finance cost credit",
    annualTax,
    monthlyTax: annualTax / 12,
    note:
      `Individual ${residenceLabel} view: this simplified estimate taxes rental profit at your selected marginal band (${band.label}). Residential mortgage interest is not deducted from rental profit; finance cost relief is shown as a 20% tax credit. Operating expenses such as genuine repairs are normally deductible, but capital improvements are not deducted from rent and may be considered later when calculating CGT on sale.`,
  };
}

function updateTaxModal(metrics) {
  const tax = calculateRentalTax(metrics);
  const monthlyAfterTaxCashflow = metrics.monthlyCashflow - tax.monthlyTax;

  outputs.monthlyTax.textContent = money.format(tax.monthlyTax);
  outputs.annualTax.textContent = money.format(tax.annualTax);
  outputs.afterTaxCashflow.textContent = money.format(monthlyAfterTaxCashflow);
  outputs.taxRent.textContent = `${money.format(metrics.rent)} / ${money.format(tax.annualRent)}`;
  outputs.taxExpenses.textContent = `${money.format(metrics.expenses)} / ${money.format(tax.annualOperatingExpenses)}`;
  outputs.taxMortgageInterest.textContent = `${money.format(metrics.interestOnlyCost)} / ${money.format(tax.annualMortgageInterest)}`;
  outputs.taxReliefLabel.textContent = tax.reliefLabel;
  outputs.taxRelief.textContent = money.format(tax.relief);
  outputs.taxableProfit.textContent = money.format(tax.taxableProfit);
  outputs.taxNote.textContent = tax.note;
}

function update() {
  const purchasePrice = valueOf(inputs.purchasePrice);
  if (depositEditedBy === "percent") {
    inputs.deposit.value = Math.round((purchasePrice * valueOf(inputs.depositPercent)) / 100);
  } else {
    inputs.depositPercent.value = purchasePrice ? ((valueOf(inputs.deposit) * 100) / purchasePrice).toFixed(1) : 0;
  }

  const deposit = valueOf(inputs.deposit);
  const mortgageRate = valueOf(inputs.mortgageRate);
  const mortgageTerm = valueOf(inputs.mortgageTerm);
  const rent = valueOf(inputs.rent);
  const expenses = valueOf(inputs.expenses);
  const icrFactor = valueOf(inputs.icrFactor) / 100;
  const refurbCost = valueOf(inputs.refurbCost);
  const fees = valueOf(inputs.fees);
  const dwellingCount = Math.max(Math.round(valueOf(inputs.dwellingCount)), 1);

  const loan = Math.max(purchasePrice - deposit, 0);
  const purchaseTax = calculatePurchaseTax(purchasePrice, dwellingCount);
  const interestOnlyCost = interestOnlyPayment(loan, mortgageRate);
  const mortgagePayment = monthlyMortgagePayment(loan, mortgageRate, mortgageTerm);
  const monthlyCashflow = rent - expenses - mortgagePayment;
  const annualCashflow = monthlyCashflow * 12;
  const cashNeeded = deposit + purchaseTax.total + refurbCost + fees;
  const grossYield = purchasePrice ? (rent * 12 * 100) / purchasePrice : 0;
  const netYield = purchasePrice ? ((rent - expenses) * 12 * 100) / purchasePrice : 0;
  const roi = cashNeeded ? (annualCashflow * 100) / cashNeeded : 0;
  const loanToValue = purchasePrice ? (loan * 100) / purchasePrice : 0;
  const requiredRent = interestOnlyCost * icrFactor;
  const icrCoverage = requiredRent ? (rent * 100) / requiredRent : 0;

  const metrics = {
    rent,
    expenses,
    monthlyCashflow,
    annualCashflow,
    cashNeeded,
    grossYield,
    netYield,
    roi,
    purchaseTax,
    dwellingCount,
    interestOnlyCost,
    requiredRent,
    icrCoverage,
    loanToValue,
  };
  latestMetrics = metrics;

  const score = scoreDeal(metrics);
  const scoreColor = score >= 70 ? "var(--green)" : score >= 45 ? "var(--amber)" : "var(--red)";

  outputs.dealScore.textContent = score;
  outputs.scoreMeter.style.width = `${score}%`;
  outputs.scoreMeter.style.background = scoreColor;
  outputs.scoreLabel.textContent = score >= 70 ? "Strong deal" : score >= 45 ? "Needs review" : "High risk";
  outputs.monthlyCashflow.textContent = money.format(monthlyCashflow);
  outputs.roi.textContent = formatPercent(roi);
  outputs.grossYield.textContent = formatPercent(grossYield);
  outputs.netYield.textContent = formatPercent(netYield);
  inputs.interestOnlyCost.value = money.format(interestOnlyCost);
  outputs.mortgagePayment.textContent = money.format(mortgagePayment);
  outputs.purchaseTaxLabel.textContent = purchaseTax.label;
  outputs.purchaseTax.textContent = money.format(purchaseTax.total);
  outputs.cashNeeded.textContent = money.format(cashNeeded);
  outputs.icrCoverage.textContent = formatPercent(icrCoverage);
  outputs.taxBasisText.textContent = purchaseTax.basis;

  outputs.insightList.replaceChildren(
    ...buildInsights({ ...metrics, mortgagePayment }).map((insight) => {
      const item = document.createElement("li");
      item.textContent = insight;
      return item;
    }),
  );
  updateTaxModal(metrics);
}

document.querySelectorAll(".toggle-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.investor) {
      investorType = button.dataset.investor;
      document.querySelectorAll("[data-investor]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    }

    if (button.dataset.mortgage) {
      mortgageType = button.dataset.mortgage;
      if (mortgageType === "interestOnly" && depositEditedBy === "percent") {
        inputs.depositPercent.value = 25;
      }
      document.querySelectorAll("[data-mortgage]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    }

    if (button.dataset.region) {
      region = button.dataset.region;
      document.querySelectorAll("[data-region]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    }

    if (button.dataset.propertyType) {
      propertyType = button.dataset.propertyType;
      document.body.classList.toggle("bulk-mode", propertyType === "bulk");
      document.querySelectorAll("[data-property-type]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    }

    if (button.dataset.taxResidence) {
      const currentBand = inputs.taxBand.value || "higher";
      taxResidence = button.dataset.taxResidence;
      renderTaxBands(currentBand);
      document.querySelectorAll("[data-tax-residence]").forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
    }

    update();
  });
});

inputs.deposit.addEventListener("input", () => {
  depositEditedBy = "amount";
  update();
});

inputs.depositPercent.addEventListener("input", () => {
  depositEditedBy = "percent";
  update();
});

Object.values(inputs).forEach((input) => {
  if (input === inputs.deposit || input === inputs.depositPercent || input === inputs.interestOnlyCost) return;
  input.addEventListener("input", update);
});

outputs.openTaxModal.addEventListener("click", () => {
  if (latestMetrics) updateTaxModal(latestMetrics);
  trackEvent("tax_modal_opened");
  outputs.taxModal.hidden = false;
});

outputs.closeTaxModal.addEventListener("click", () => {
  outputs.taxModal.hidden = true;
});

outputs.taxModal.addEventListener("click", (event) => {
  if (event.target === outputs.taxModal) {
    outputs.taxModal.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    outputs.taxModal.hidden = true;
    premium.propertyModal.hidden = true;
  }
});

premium.navButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    if (button.dataset.authAction === "logout") {
      await logoutUser();
      return;
    }
    if (button.dataset.navAction === "portfolio") {
      const session = await getCurrentSession();
      if (!session) {
        switchView("loginView");
        setAuthMode("signin");
        premium.authMessage.textContent = "Sign in to open your portfolio.";
        premium.loginEmail.focus();
        return;
      }
      if (!hasPremiumAccess()) {
        showSubscriptionRequired();
        return;
      }
      openDashboard();
      switchDashboardTab(readUiState().dashboardTab || "properties");
      return;
    }
    if (!button.dataset.view) return;
    switchView(button.dataset.view);
    if (button.dataset.view === "premiumView") {
      refreshPlanContinueButton();
      trackEvent("premium_viewed");
    }
  });
});

premium.sidebarItems.forEach((button) => {
  button.addEventListener("click", async () => {
    premium.sidebarItems.forEach((item) => item.classList.toggle("active", item === button));
    const session = await getCurrentSession();
    if (!session) {
      switchView("loginView");
      setAuthMode("signin");
      premium.authMessage.textContent = "Sign in to open this portfolio section.";
      premium.loginEmail.focus();
      return;
    }
    openPortfolioTarget(button.dataset.sidebarTarget);
  });
});

premium.showLogin.addEventListener("click", async () => {
  const session = await getCurrentSession();
  if (session) {
    openDashboard();
    switchDashboardTab("subscription");
    await startStripeCheckout(selectedPlan);
    return;
  }

  switchView("loginView");
  premium.loginEmail.focus();
});

premium.themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

document.querySelectorAll("[data-plan]").forEach((button) => {
  button.addEventListener("click", async () => {
    setSelectedPlan(button.dataset.plan);
    document.querySelector("#purchasePanel").scrollIntoView({ behavior: "smooth", block: "center" });
    await refreshPlanContinueButton();
    trackEvent("plan_selected", { plan: selectedPlan });
  });
});

premium.promoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await redeemPromoCode(premium.promoCode.value);
});

premium.dashboardPromoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await redeemPromoCode(premium.dashboardPromoCode.value, premium.dashboardPromoMessage);
  premium.dashboardPromoCode.value = "";
});

premium.manageBilling.addEventListener("click", () => {
  handleSubscriptionAction();
});

premium.logoutButton?.addEventListener("click", () => {
  logoutUser();
});

premium.refreshAdmin.addEventListener("click", () => {
  loadAdminOverview();
});

premium.adminPromoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createAdminPromoCode();
});

premium.adminPromoList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-promo-delete]");
  if (!button) return;
  deactivateAdminPromoCode(button.dataset.promoDelete);
});

premium.dashboardTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchDashboardTab(button.dataset.dashboardTab);
  });
});

premium.transactionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!hasPremiumAccess()) {
    showSubscriptionRequired();
    return;
  }

  const existingTransaction = editingTransactionId
    ? transactions.find((item) => item.id === editingTransactionId)
    : null;
  const transaction = normalizeTransactionRecord({
    id: editingTransactionId || createId("transaction"),
    propertyId: premium.transactionProperty.value,
    documentId: existingTransaction?.documentId || "",
    tenancyId: existingTransaction ? transactionTenancyId(existingTransaction) : "",
    date: premium.transactionDate.value,
    amount: Number(premium.transactionAmount.value) || 0,
    type: premium.transactionType.value,
    category: premium.transactionCategory.value.trim(),
    taxTreatment: premium.transactionTaxTreatment.value,
    source: existingTransaction?.source || "manual",
    status: premium.transactionStatus.value,
    notes: premium.transactionNotes.value.trim(),
  });

  if (editingTransactionId) {
    const index = transactions.findIndex((item) => item.id === editingTransactionId);
    if (index >= 0) {
      transactions[index] = transaction;
      await updateTransactionInSupabase(transaction);
    }
  } else {
    const savedId = await saveTransactionToSupabase(transaction);
    if (savedId) transaction.id = savedId;
    transactions = [transaction, ...transactions];
  }

  resetTransactionForm();
  renderTransactions();
  if (activePropertyId) renderPropertyDetail();
});

premium.transactionList.addEventListener("click", async (event) => {
  const approveButton = event.target.closest("[data-approve-transaction]");
  if (approveButton) {
    const transaction = transactions.find((item) => item.id === approveButton.dataset.approveTransaction);
    if (!transaction) return;
    transaction.status = "approved";
    await updateTransactionInSupabase(transaction);
    renderTransactions();
    if (activePropertyId) renderPropertyDetail();
    return;
  }

  const editButton = event.target.closest("[data-edit-transaction]");
  if (editButton) {
    const transaction = transactions.find((item) => item.id === editButton.dataset.editTransaction);
    if (!transaction) return;
    loadTransactionIntoForm(transaction);
    switchDashboardTab("transactions");
    premium.transactionForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const deleteButton = event.target.closest("[data-delete-transaction]");
  if (!deleteButton) return;

  await deleteTransactionFromSupabase(deleteButton.dataset.deleteTransaction);
  transactions = transactions.filter((transaction) => transaction.id !== deleteButton.dataset.deleteTransaction);
  if (editingTransactionId === deleteButton.dataset.deleteTransaction) resetTransactionForm();
  renderTransactions();
  if (activePropertyId) renderPropertyDetail();
});

premium.transactionFilters.addEventListener("input", renderTransactions);
premium.transactionFilters.addEventListener("change", renderTransactions);
premium.resetTransactionFilters.addEventListener("click", () => {
  premium.transactionSearch.value = "";
  premium.transactionFilterProperty.value = "all";
  premium.transactionFilterType.value = "all";
  premium.transactionFilterStatus.value = "all";
  renderTransactions();
});

premium.exportQuarterPack.addEventListener("click", () => {
  if (!hasProAccess()) {
    showProUpgrade("Quarterly accountant packs are included in PropertyPanel Pro.");
    return;
  }

  exportQuarterPackCsv();
});

premium.documentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await savePropertyDocumentOrExpense("documents");
});

premium.expenseDocumentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await savePropertyDocumentOrExpense("expenses");
});

async function handleDocumentActionClick(event) {
  const downloadButton = event.target.closest("[data-download-document]");
  if (downloadButton) {
    event.preventDefault();
    const documentRecord = documents.find((item) => item.id === downloadButton.dataset.downloadDocument);
    if (documentRecord) await openDocument(documentRecord);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-document]");
  if (!deleteButton) return;
  event.preventDefault();

  const documentRecord = documents.find((item) => item.id === deleteButton.dataset.deleteDocument);
  if (!documentRecord) return;
  const confirmed = window.confirm(`Delete ${documentRecord.label}? This removes the file from the vault.`);
  if (!confirmed) return;

  setButtonBusy(deleteButton, true, "Deleting...");
  premium.documentMessage.textContent = "Deleting document...";

  try {
    await deleteDocumentFromSupabase(documentRecord);
    documents = documents.filter((item) => item.id !== documentRecord.id);
    transactions = transactions.map((transaction) =>
      transaction.documentId === documentRecord.id
        ? { ...transaction, documentId: "" }
        : transaction,
    );
    localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(transactions));
    renderDocuments();
    renderPropertyDetail();
    premium.documentMessage.textContent = "Document deleted. Linked expense records were kept.";
  } catch (error) {
    premium.documentMessage.textContent = error?.message || "Could not delete document.";
  } finally {
    setButtonBusy(deleteButton, false);
  }
}

premium.documentList.addEventListener("click", handleDocumentActionClick);
premium.documentActionBar.addEventListener("click", handleDocumentActionClick);

premium.adminTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchAdminTab(button.dataset.adminTab);
  });
});

premium.authModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setAuthMode(button.dataset.authMode);
  });
});

premium.emailLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleEmailAuth();
});

premium.passwordResetForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await updateRecoveredPassword();
});

premium.accountPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await updateDashboardPassword();
});

premium.exportAccountData.addEventListener("click", exportAccountData);
premium.deletePortfolioData.addEventListener("click", deletePortfolioData);

premium.openPropertyModal.addEventListener("click", () => {
  openPropertyForm();
});

premium.closePropertyModal.addEventListener("click", () => {
  premium.propertyModal.hidden = true;
  resetPropertyForm();
});

premium.propertyModal.addEventListener("click", (event) => {
  if (event.target === premium.propertyModal) {
    premium.propertyModal.hidden = true;
    resetPropertyForm();
  }
});

premium.detailAddProperty.addEventListener("click", () => {
  openPropertyForm();
});

premium.propertySearch?.addEventListener("input", renderPremiumDashboard);

premium.propertyList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-property-id]");
  if (!card) return;
  openPropertyDetail(card.dataset.propertyId);
});

premium.propertyList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-property-id]");
  if (!card) return;
  event.preventDefault();
  openPropertyDetail(card.dataset.propertyId);
});

premium.backToProperties.addEventListener("click", () => {
  premium.propertyDetailPanel.hidden = true;
  switchView("dashboardView");
  premium.dashboardPanel.hidden = false;
  switchDashboardTab("properties");
  renderPremiumDashboard();
});

premium.propertyDetailTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switchPropertyDetailTab(button.dataset.propertyDetailTab);
  });
});

premium.propertyOwnershipModel.addEventListener("change", updateOperatorFieldsVisibility);
premium.detailOwnershipModel.addEventListener("change", updateDetailOperatorFieldsVisibility);
document.querySelector("#detailMortgageTermMonths").addEventListener("input", () => updateMortgageEndFromTerm());
document.querySelector("#detailMortgageStart").addEventListener("change", () => updateMortgageEndFromTerm());
document.querySelector("#detailMortgageEnd").addEventListener("input", () => {
  document.querySelector("#detailMortgageEnd").dataset.autoCalculated = "false";
});

premium.propertyManagementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const property = activeProperty();
  if (!property) return;
  const submitButton = premium.propertyManagementForm.querySelector("button[type='submit']");

  const ownershipModel = premium.detailOwnershipModel.value;
  if (ownershipModel !== "Owned" && !hasProAccess()) {
    premium.propertyManagementMessage.textContent = "Rent-to-rent and managed property workflows are included in PropertyPanel Pro.";
    return;
  }

  setButtonBusy(submitButton, true, "Saving...");
  premium.propertyManagementMessage.textContent = "Saving management setup...";

  try {
    const usesOperatorFields = ownershipModel !== "Owned";
    property.ownershipModel = ownershipModel;
    property.landlordName = usesOperatorFields ? premium.detailLandlordName.value.trim() : property.landlordName || "";
    property.guaranteedRent = usesOperatorFields ? Number(premium.detailGuaranteedRent.value) || 0 : 0;
    property.maintenanceModel = usesOperatorFields
      ? premium.detailMaintenanceModel.value
      : "Landlord charged for repairs";
    property.maintenanceFee = usesOperatorFields ? Number(premium.detailMaintenanceFee.value) || 0 : 0;
    property.rentDueDay = Math.min(Math.max(Number(premium.detailRentDueDay.value) || 1, 1), 31);
    property.rentReminder = premium.detailRentReminder.value;

    await updateSupabasePropertySnapshot(property);
    renderPremiumDashboard();
    renderPropertyDetail();
    switchPropertyDetailTab("management");
    premium.propertyManagementMessage.textContent = "Management setup saved and refreshed.";
  } catch (error) {
    premium.propertyManagementMessage.textContent = error?.message || "Could not save management setup.";
  } finally {
    setButtonBusy(submitButton, false);
  }
});

premium.propertyExpenseFilters.addEventListener("input", () => {
  const property = activeProperty();
  if (property) renderPropertyExpenses(property);
});

premium.propertyExpenseFilters.addEventListener("change", () => {
  const property = activeProperty();
  if (property) renderPropertyExpenses(property);
});

premium.approvePropertyDrafts.addEventListener("click", async () => {
  const property = activeProperty();
  if (!property) return;
  const draftTransactions = filteredPropertyTransactions(property).filter(
    (transaction) => transaction.status !== "approved",
  );
  if (!draftTransactions.length) return;
  const confirmed = window.confirm(`Approve ${draftTransactions.length} visible draft transaction${draftTransactions.length === 1 ? "" : "s"}?`);
  if (!confirmed) return;

  for (const transaction of draftTransactions) {
    transaction.status = "approved";
    await updateTransactionInSupabase(transaction);
  }
  renderTransactions();
  renderPropertyDetail();
  switchPropertyDetailTab("expenses");
});

premium.exportPropertyTransactions.addEventListener("click", () => {
  const property = activeProperty();
  if (property) exportPropertyTransactionsCsv(property);
});

premium.propertyExpenseList.addEventListener("click", async (event) => {
  const property = activeProperty();
  if (!property) return;

  const approveButton = event.target.closest("[data-approve-property-transaction]");
  if (approveButton) {
    const transaction = transactions.find((item) => item.id === approveButton.dataset.approvePropertyTransaction);
    if (!transaction) return;
    transaction.status = "approved";
    transaction.taxTreatment = transaction.taxTreatment || "review";
    await updateTransactionInSupabase(transaction);
    renderTransactions();
    renderPropertyDetail();
    return;
  }

  const editButton = event.target.closest("[data-edit-property-transaction]");
  if (editButton) {
    const transaction = transactions.find((item) => item.id === editButton.dataset.editPropertyTransaction);
    if (!transaction) return;
    loadTransactionIntoForm(transaction);
    premium.propertyDetailPanel.hidden = true;
    switchView("dashboardView");
    premium.dashboardPanel.hidden = false;
    switchDashboardTab("transactions");
    premium.transactionForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const deleteButton = event.target.closest("[data-delete-property-transaction]");
  if (!deleteButton) return;
  const transaction = transactions.find((item) => item.id === deleteButton.dataset.deletePropertyTransaction);
  if (!transaction) return;
  const confirmed = window.confirm(`Delete ${transaction.category} transaction?`);
  if (!confirmed) return;
  await deleteTransactionFromSupabase(transaction.id);
  transactions = transactions.filter((item) => item.id !== transaction.id);
  if (editingTransactionId === transaction.id) resetTransactionForm();
  renderTransactions();
  renderPropertyDetail();
});

premium.propertyReportFilters.addEventListener("input", () => {
  const property = activeProperty();
  if (property) renderLandlordReport(property);
});

premium.propertyReportFilters.addEventListener("change", () => {
  const property = activeProperty();
  if (property) renderLandlordReport(property);
});

premium.addTenantToTenancy.addEventListener("click", () => {
  const tenant = tenantFromFormFields();
  if (!tenant.name && !tenant.phone && !tenant.email && !tenant.previousAddress) {
    premium.tenancyMessage.textContent = "Add tenant name, phone, email or previous address first.";
    return;
  }

  tenancyTenantDrafts = [...tenancyTenantDrafts, tenant];
  clearTenantFormFields();
  renderTenantDrafts();
  premium.tenancyMessage.textContent = "Tenant added to this tenancy. Save the tenancy record to keep it.";
});

premium.detailTenantList.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-tenant-draft]");
  if (!removeButton) return;
  tenancyTenantDrafts = tenancyTenantDrafts.filter((tenant) => tenant.id !== removeButton.dataset.removeTenantDraft);
  renderTenantDrafts();
});

premium.tenancyHistoryList.addEventListener("click", async (event) => {
  const property = activeProperty();
  if (!property) return;

  const deleteRentChangeButton = event.target.closest("[data-delete-rent-change]");
  if (deleteRentChangeButton) {
    const tenancy = (property.tenancies || []).find((item) => item.id === deleteRentChangeButton.dataset.tenancyId);
    if (!tenancy) return;
    const confirmed = window.confirm("Delete this rent change and refresh future draft payments?");
    if (!confirmed) return;
    setButtonBusy(deleteRentChangeButton, true, "Deleting...");
    try {
      await deleteTenancyRentChangeFromSupabase(deleteRentChangeButton.dataset.deleteRentChange);
      tenancy.rentChanges = (tenancy.rentChanges || []).filter(
        (change) => change.id !== deleteRentChangeButton.dataset.deleteRentChange,
      );
      await syncTenancyRentSchedule(property, tenancy);
      renderTransactions();
      renderPropertyDetail();
      switchPropertyDetailTab("tenancies");
      premium.tenancyMessage.textContent = "Rent change deleted. Future draft payments were refreshed.";
    } catch (error) {
      premium.tenancyMessage.textContent = error?.message || "Could not delete the rent change.";
      setButtonBusy(deleteRentChangeButton, false);
    }
    return;
  }

  const editButton = event.target.closest("[data-edit-tenancy]");
  if (editButton) {
    const tenancy = (property.tenancies || []).find((item) => item.id === editButton.dataset.editTenancy);
    if (!tenancy) return;
    editingTenancyId = tenancy.id;
    const tenants = (tenancy.tenants || []).length ? tenancy.tenants : [primaryTenant(tenancy)];
    const leadTenant = tenants[0] || normalizeTenantRecord();
    tenancyTenantDrafts = tenants.slice(1).map(normalizeTenantRecord);
    premium.detailTenantName.value = leadTenant.name || "";
    premium.detailTenantPhone.value = leadTenant.phone || "";
    premium.detailTenantEmail.value = leadTenant.email || "";
    premium.detailTenantPreviousAddress.value = leadTenant.previousAddress || "";
    premium.detailGuarantorName.value = tenancy.guarantor?.name || "";
    premium.detailGuarantorPhone.value = tenancy.guarantor?.phone || "";
    premium.detailGuarantorEmail.value = tenancy.guarantor?.email || "";
    document.querySelector("#detailTenancyStart").value = tenancy.startDate || "";
    document.querySelector("#detailTenancyEnd").value = tenancy.endDate || "";
    document.querySelector("#detailTenancyRent").value = tenancy.rent || "";
    renderTenantDrafts();
    premium.tenancyMessage.textContent = `Editing tenancy for ${tenancy.tenantName || property.name}.`;
    premium.tenancyForm.querySelector("button[type='submit']").textContent = "Update tenancy record";
    return;
  }

  const deleteButton = event.target.closest("[data-delete-tenancy]");
  if (deleteButton) {
    setButtonBusy(deleteButton, true, "Deleting...");
    premium.tenancyMessage.textContent = "Deleting tenancy and linked rent payments...";
    try {
      await deleteTenancyFromSupabase(property, deleteButton.dataset.deleteTenancy);
      await deleteTenancyRentSchedule(deleteButton.dataset.deleteTenancy);
      property.tenancies = (property.tenancies || []).filter((item) => item.id !== deleteButton.dataset.deleteTenancy);
      resetTenancyForm();
      renderTransactions();
      renderPremiumDashboard();
      renderPropertyDetail();
      switchPropertyDetailTab("tenancies");
      premium.tenancyMessage.textContent = "Tenancy deleted. Linked future rent payments were removed.";
      await updateSupabasePropertySnapshot(property);
    } catch (error) {
      premium.tenancyMessage.textContent = error?.message || "Could not delete tenancy record.";
      setButtonBusy(deleteButton, false);
    }
    return;
  }

  const approveRentButton = event.target.closest("[data-approve-tenancy-rent]");
  if (approveRentButton) {
    setButtonBusy(approveRentButton, true, "Saving...");
    const transaction = transactions.find((item) => item.id === approveRentButton.dataset.approveTenancyRent);
    if (!transaction) return;
    transaction.status = "approved";
    transaction.taxTreatment = "revenue";
    await updateTransactionInSupabase(transaction);
    renderTransactions();
    renderPropertyDetail();
    switchPropertyDetailTab("tenancies");
    premium.tenancyMessage.textContent = `Rent payment for ${formatDate(transaction.date)} marked as paid.`;
    return;
  }

  const editRentButton = event.target.closest("[data-edit-tenancy-rent]");
  if (editRentButton) {
    const transaction = transactions.find((item) => item.id === editRentButton.dataset.editTenancyRent);
    if (!transaction) return;
    loadTransactionIntoForm(transaction);
    premium.propertyDetailPanel.hidden = true;
    switchView("dashboardView");
    premium.dashboardPanel.hidden = false;
    switchDashboardTab("transactions");
    premium.transactionForm.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  const deleteRentButton = event.target.closest("[data-delete-tenancy-rent]");
  if (!deleteRentButton) return;
  const transaction = transactions.find((item) => item.id === deleteRentButton.dataset.deleteTenancyRent);
  if (!transaction) return;
  const confirmed = window.confirm(`Delete rent payment for ${formatDate(transaction.date)}?`);
  if (!confirmed) return;
  setButtonBusy(deleteRentButton, true, "Deleting...");
  premium.tenancyMessage.textContent = "Deleting rent payment...";
  try {
    await deleteTransactionFromSupabase(transaction.id);
    transactions = transactions.filter((item) => item.id !== transaction.id);
    if (editingTransactionId === transaction.id) resetTransactionForm();
    renderTransactions();
    renderPropertyDetail();
    switchPropertyDetailTab("tenancies");
    premium.tenancyMessage.textContent = "Rent payment deleted.";
  } catch (error) {
    premium.tenancyMessage.textContent = error?.message || "Could not delete rent payment.";
    setButtonBusy(deleteRentButton, false);
  }
});

premium.tenancyHistoryList.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-rent-change-form]");
  if (!form) return;
  event.preventDefault();
  const property = activeProperty();
  const tenancy = (property?.tenancies || []).find((item) => item.id === form.dataset.rentChangeForm);
  if (!property || !tenancy) return;

  const effectiveDate = form.elements.effectiveDate.value;
  const rent = Number(form.elements.monthlyRent.value) || 0;
  if (!effectiveDate || !rent) {
    premium.tenancyMessage.textContent = "Choose the effective date and enter the new monthly rent.";
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  setButtonBusy(submitButton, true, "Saving...");
  premium.tenancyMessage.textContent = "Saving rent change and refreshing future draft payments...";
  try {
    const savedChange = await saveTenancyRentChangeToSupabase(property, tenancy, { effectiveDate, rent }) || {
      id: createId("rent-change"),
      effectiveDate,
      rent,
    };
    tenancy.rentChanges = [
      ...(tenancy.rentChanges || []).filter((change) => change.effectiveDate !== effectiveDate),
      savedChange,
    ].sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate));
    await syncTenancyRentSchedule(property, tenancy);
    property.rent = currentTenancyRent(tenancy);
    await updateSupabasePropertySnapshot(property);
    renderTransactions();
    renderPremiumDashboard();
    renderPropertyDetail();
    switchPropertyDetailTab("tenancies");
    premium.tenancyMessage.textContent = "Rent change saved. Future draft payments use the new amount.";
  } catch (error) {
    premium.tenancyMessage.textContent = error?.message || "Could not save the rent change.";
    setButtonBusy(submitButton, false);
  }
});

premium.remortgageHistoryList.addEventListener("click", async (event) => {
  const property = activeProperty();
  if (!property) return;

  const editButton = event.target.closest("[data-edit-remortgage]");
  if (editButton) {
    const remortgage = (property.remortgages || []).find((item) => item.id === editButton.dataset.editRemortgage);
    if (!remortgage) return;
    editingRemortgageId = remortgage.id;
    document.querySelector("#detailMortgageProduct").value = remortgage.productType || "Fixed";
    document.querySelector("#detailMortgageRate").value = remortgage.rate || "";
    document.querySelector("#detailMortgageBalance").value = remortgage.balance || "";
    document.querySelector("#detailMortgageValuation").value = remortgage.valuation || "";
    document.querySelector("#detailMortgageTermMonths").value = remortgage.termMonths || "";
    document.querySelector("#detailMortgageStart").value = remortgage.startDate || "";
    document.querySelector("#detailMortgageEnd").value = remortgage.expiryDate || "";
    document.querySelector("#detailMortgageEnd").dataset.autoCalculated = "false";
    document.querySelector("#detailEquityRelease").value = remortgage.equityRelease || "";
    document.querySelector("#detailMortgageNotes").value = remortgage.notes || "";
    premium.remortgageMessage.textContent = "Editing remortgage record.";
    premium.remortgageForm.querySelector("button[type='submit']").textContent = "Update remortgage record";
    return;
  }

  const deleteButton = event.target.closest("[data-delete-remortgage]");
  if (!deleteButton) return;
  const confirmed = window.confirm("Are you sure you want to delete this remortgage record?");
  if (!confirmed) return;
  setButtonBusy(deleteButton, true, "Deleting...");
  premium.remortgageMessage.textContent = "Deleting remortgage record...";
  try {
    await deleteRemortgageFromSupabase(property, deleteButton.dataset.deleteRemortgage);
    property.remortgages = (property.remortgages || []).filter((item) => item.id !== deleteButton.dataset.deleteRemortgage);
    resetRemortgageForm();
    renderPremiumDashboard();
    renderPropertyDetail();
    switchPropertyDetailTab("remortgages");
    premium.remortgageMessage.textContent = "Remortgage record deleted.";
    await updateSupabasePropertySnapshot(property);
  } catch (error) {
    premium.remortgageMessage.textContent = error?.message || "Could not delete remortgage record.";
    setButtonBusy(deleteButton, false);
  }
});

premium.printLandlordReport.addEventListener("click", () => {
  if (!hasProAccess()) {
    showProUpgrade("Landlord monthly reports are included in PropertyPanel Pro.");
    return;
  }

  trackEvent("landlord_report_printed", { property_id: activePropertyId });
  printActiveLandlordReport();
});

window.addEventListener("afterprint", () => {
  document.body.classList.remove("print-landlord-report");
  delete document.body.dataset.printPropertyName;
  document.querySelector("#printDocumentAppendix")?.remove();
});

premium.deletePropertyButton.addEventListener("click", () => {
  deleteActiveProperty();
});

premium.editPropertyButton.addEventListener("click", () => {
  const property = activeProperty();
  if (property) openPropertyForm(property);
});

premium.tenancyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const property = activeProperty();
  if (!property) return;
  const submitButton = premium.tenancyForm.querySelector("button[type='submit']");
  setButtonBusy(submitButton, true, editingTenancyId ? "Updating..." : "Saving...");
  premium.tenancyMessage.textContent = editingTenancyId
    ? "Updating tenancy and rent payment schedule..."
    : "Saving tenancy and creating rent payment schedule...";

  try {
    const files = Array.from(document.querySelector("#detailTenancyFiles").files || []).map((file) => file.name);
    const tenants = tenancyTenantsFromForm();
    const leadTenant = tenants[0] || normalizeTenantRecord();
    let tenancy = {
      id: editingTenancyId || createId("tenancy"),
      tenantName: leadTenant.name,
      tenantContact: contactFromTenant(leadTenant),
      tenants,
      guarantor: {
        name: premium.detailGuarantorName.value.trim(),
        phone: premium.detailGuarantorPhone.value.trim(),
        email: premium.detailGuarantorEmail.value.trim(),
      },
      startDate: document.querySelector("#detailTenancyStart").value,
      endDate: document.querySelector("#detailTenancyEnd").value,
      rent: Number(document.querySelector("#detailTenancyRent").value) || 0,
      documents: files,
    };
    tenancy = normalizeTenancyRecord(tenancy);

    if (editingTenancyId) {
      const index = (property.tenancies || []).findIndex((item) => item.id === editingTenancyId);
      if (index >= 0) {
        tenancy.documents = files.length ? files : property.tenancies[index].documents || [];
        tenancy.rentChanges = property.tenancies[index].rentChanges || [];
        tenancy = normalizeTenancyRecord(tenancy);
        property.tenancies[index] = tenancy;
        await updateTenancyInSupabase(property, tenancy);
      }
    } else {
      const savedId = await saveTenancyToSupabase(property, tenancy);
      if (savedId) tenancy.id = savedId;
      property.tenancies = [tenancy, ...(property.tenancies || [])];
    }
    if (tenancy.rent) property.rent = currentTenancyRent(tenancy);
    renderPremiumDashboard();
    renderPropertyDetail();
    switchPropertyDetailTab("tenancies");
    resetTenancyForm();
    delete submitButton.dataset.originalText;
    setButtonBusy(submitButton, false);
    premium.tenancyMessage.textContent = `Tenancy saved for ${tenancy.tenantName || property.name}. Refreshing rent payment schedule...`;
    try {
      await syncTenancyRentSchedule(property, tenancy);
      await updateSupabasePropertySnapshot(property);
      renderTransactions();
      renderPremiumDashboard();
      renderPropertyDetail();
      switchPropertyDetailTab("tenancies");
      premium.tenancyMessage.textContent = `Tenancy saved. Rent payment schedule refreshed for ${tenancy.tenantName || property.name}.`;
    } catch (scheduleError) {
      premium.tenancyMessage.textContent =
        scheduleError?.message || "Tenancy saved, but rent payment schedule could not be refreshed.";
    }
  } catch (error) {
    premium.tenancyMessage.textContent = error?.message || "Could not save tenancy record.";
  } finally {
    setButtonBusy(submitButton, false);
  }
});

premium.remortgageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const property = activeProperty();
  if (!property) return;
  const submitButton = premium.remortgageForm.querySelector("button[type='submit']");
  setButtonBusy(submitButton, true, editingRemortgageId ? "Updating..." : "Saving...");
  premium.remortgageMessage.textContent = editingRemortgageId
    ? "Updating remortgage record..."
    : "Saving remortgage record...";
  updateMortgageEndFromTerm({ force: !document.querySelector("#detailMortgageEnd").value });

  try {
    const remortgage = {
      id: editingRemortgageId || createId("remortgage"),
      productType: document.querySelector("#detailMortgageProduct").value,
      rate: Number(document.querySelector("#detailMortgageRate").value) || 0,
      balance: Number(document.querySelector("#detailMortgageBalance").value) || 0,
      valuation: Number(document.querySelector("#detailMortgageValuation").value) || 0,
      termMonths: Number(document.querySelector("#detailMortgageTermMonths").value) || null,
      startDate: document.querySelector("#detailMortgageStart").value,
      expiryDate: document.querySelector("#detailMortgageEnd").value,
      equityRelease: Number(document.querySelector("#detailEquityRelease").value) || 0,
      notes: document.querySelector("#detailMortgageNotes").value,
    };

    if (editingRemortgageId) {
      const index = (property.remortgages || []).findIndex((item) => item.id === editingRemortgageId);
      if (index >= 0) {
        property.remortgages[index] = remortgage;
        await updateRemortgageInSupabase(property, remortgage);
      }
    } else {
      const savedId = await saveRemortgageToSupabase(property, remortgage);
      if (savedId) remortgage.id = savedId;
      property.remortgages = [remortgage, ...(property.remortgages || [])];
    }
    if (remortgage.valuation) property.currentValue = remortgage.valuation;
    await updateSupabasePropertySnapshot(property);
    renderPremiumDashboard();
    renderPropertyDetail();
    switchPropertyDetailTab("remortgages");
    resetRemortgageForm();
    delete submitButton.dataset.originalText;
    premium.remortgageMessage.textContent = "Remortgage record saved and mortgage history refreshed.";
  } catch (error) {
    premium.remortgageMessage.textContent = error?.message || "Could not save remortgage record.";
  } finally {
    setButtonBusy(submitButton, false);
  }
});

premium.propertyForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = premium.propertyForm.querySelector("button[type='submit']");
  const existingProperty = editingPropertyId ? properties.find((item) => item.id === editingPropertyId) : null;

  if (!existingProperty && isPremiumAtPropertyLimit()) {
    showProUpgrade(premiumLimitMessage());
    return;
  }

  const property = propertyPayloadFromForm(existingProperty);

  if (property.ownershipModel !== "Owned" && !hasProAccess()) {
    showProUpgrade("Rent-to-rent and managed property workflows are included in PropertyPanel Pro.");
    return;
  }

  setButtonBusy(submitButton, true, existingProperty ? "Updating..." : "Saving...");

  if (existingProperty) {
    try {
      const index = properties.findIndex((item) => item.id === existingProperty.id);
      if (index >= 0) properties[index] = property;
      await updateSupabasePropertySnapshot(property);
      trackEvent("property_updated", { property_name: property.name, region: property.region });
      activePropertyId = property.id;
      premium.propertyModal.hidden = true;
      resetPropertyForm();
      renderPremiumDashboard();
      premium.propertyDetailPanel.hidden = false;
      switchView("propertyDetailView");
      renderPropertyDetail();
      switchPropertyDetailTab("overview");
      premium.deletePropertyMessage.textContent = "Property saved and refreshed.";
    } catch (error) {
      premium.deletePropertyMessage.textContent = error?.message || "Could not save property.";
    } finally {
      setButtonBusy(submitButton, false);
    }
    return;
  }

  if (property.mortgageBalance || property.rate || property.mortgageExpiry) {
    property.remortgages.push({
      id: createId("remortgage"),
      productType: document.querySelector("#propertyMortgageProduct").value,
      rate: property.rate,
      balance: property.mortgageBalance,
      valuation: property.currentValue,
      termMonths: null,
      startDate: property.purchaseDate,
      expiryDate: property.mortgageExpiry,
      equityRelease: 0,
      notes: "Initial mortgage deal",
    });
  }

  try {
    const savedId = await savePropertyToSupabase(property);
    if (savedId) property.id = savedId;
    const initialMortgage = property.remortgages[0];
    if (initialMortgage) {
      const savedMortgageId = await saveRemortgageToSupabase(property, initialMortgage);
      if (savedMortgageId) initialMortgage.id = savedMortgageId;
    }

    properties = [property, ...properties];
    trackEvent("property_added", { property_name: property.name, region: property.region });
    premium.propertyModal.hidden = true;
    resetPropertyForm();
    renderPremiumDashboard();
  } catch (error) {
    premium.deletePropertyMessage.textContent = error?.message || "Could not save property.";
  } finally {
    setButtonBusy(submitButton, false);
  }
});

premium.exportPortfolio.addEventListener("click", () => {
  const includeDocuments = confirmIncludePropertyDocuments();
  renderPrintDocumentAppendix(includeDocuments ? properties : []);
  trackEvent("pdf_exported", { property_count: properties.length });
  window.print();
});

premium.notificationButton?.addEventListener("click", () => {
  const nextHidden = !premium.notificationPanel.hidden;
  if (!nextHidden) updateNotificationPanel(hasProAccess() ? upcomingReminders() : []);
  premium.notificationPanel.hidden = nextHidden;
  premium.notificationButton.setAttribute("aria-expanded", String(!nextHidden));
});

premium.closeNotificationPanel?.addEventListener("click", () => {
  premium.notificationPanel.hidden = true;
  premium.notificationButton.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (event) => {
  const calendarButton = event.target.closest("[data-calendar-reminder]");
  if (!calendarButton) return;
  const reminder = upcomingReminders().find((item) => item.id === calendarButton.dataset.calendarReminder);
  if (reminder) downloadReminderCalendar(reminder);
});

renderTaxBands("higher");
initTheme();
switchSection(premium.dashboardTabButtons, premium.dashboardPanels, "overview", "dashboardTab", "dashboardPanel");
switchAdminTab("overview");
setSelectedPlan(selectedPlan);
trackEvent("page_view", { path: window.location.pathname });
initAuth();
update();
