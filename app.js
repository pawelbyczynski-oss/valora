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
  premiumHero: document.querySelector(".premium-hero"),
  showLogin: document.querySelector("#showLogin"),
  loginPanel: document.querySelector("#loginPanel"),
  promoForm: document.querySelector("#promoForm"),
  promoCode: document.querySelector("#promoCode"),
  promoMessage: document.querySelector("#promoMessage"),
  adminNav: document.querySelector(".admin-nav"),
  demoUserLogin: document.querySelector("#demoUserLogin"),
  emailLoginForm: document.querySelector("#emailLoginForm"),
  loginEmail: document.querySelector("#loginEmail"),
  authMessage: document.querySelector("#authMessage"),
  dashboardPanel: document.querySelector("#dashboardPanel"),
  providerButtons: document.querySelectorAll("[data-login-provider]"),
  openPropertyModal: document.querySelector("#openPropertyModal"),
  closePropertyModal: document.querySelector("#closePropertyModal"),
  propertyModal: document.querySelector("#propertyModal"),
  propertyForm: document.querySelector("#propertyForm"),
  propertyList: document.querySelector("#propertyList"),
  reminderList: document.querySelector("#reminderList"),
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
};

const SUPABASE_URL = window.VALORA_CONFIG?.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = window.VALORA_CONFIG?.SUPABASE_ANON_KEY || "";
const APP_BASE_URL = window.location.origin;
const STRIPE_PRICE_LABEL = "£4.99/month";
const CHECKOUT_FUNCTION = "create-checkout-session";
const supabaseClient =
  window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

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

const defaultProperties = [
  {
    name: "Flat 4, Glasgow",
    region: "Scotland",
    letType: "Long-term let",
    purchaseDate: "2024-06-10",
    purchasePrice: 245000,
    currentValue: 265000,
    deposit: 61250,
    mortgageBalance: 183750,
    rate: 5.35,
    mortgageExpiry: "2026-09-30",
    rent: 1350,
    expenses: 220,
    tenantName: "Jamie Fraser",
    tenantContact: "jamie@example.com",
    rentDueDay: 10,
    rentReminder: "On",
    landlordRegistration: "123456/260/12340",
    documents: "Tenancy agreement, mortgage offer, gas safety",
  },
  {
    name: "Terrace House, Leeds",
    region: "England",
    letType: "Long-term let",
    purchaseDate: "2022-03-18",
    purchasePrice: 210000,
    currentValue: 238000,
    deposit: 52500,
    mortgageBalance: 157500,
    rate: 4.89,
    mortgageExpiry: "2027-01-15",
    rent: 1250,
    expenses: 180,
    tenantName: "Aisha Patel",
    tenantContact: "aisha@example.com",
    rentDueDay: 1,
    rentReminder: "On",
    landlordRegistration: "",
    documents: "Tenancy agreement, insurance",
  },
];

let properties = JSON.parse(localStorage.getItem("valora-properties") || "null") || defaultProperties;
let promoAccess = localStorage.getItem("valora-promo-access") === "true";
let demoUserMode = localStorage.getItem("valora-demo-user") === "true";

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

function propertyCashflow(property) {
  const mortgageInterest = property.mortgageBalance * (property.rate / 100 / 12);
  return property.rent - property.expenses - mortgageInterest;
}

function renderPremiumDashboard() {
  localStorage.setItem("valora-properties", JSON.stringify(properties));
  const totalValue = properties.reduce((sum, property) => sum + Number(property.currentValue || 0), 0);
  const totalDebt = properties.reduce((sum, property) => sum + Number(property.mortgageBalance || 0), 0);
  const totalCashflow = properties.reduce((sum, property) => sum + propertyCashflow(property), 0);

  premium.portfolioCount.textContent = properties.length;
  premium.portfolioValue.textContent = money.format(totalValue);
  premium.portfolioDebt.textContent = money.format(totalDebt);
  premium.portfolioCashflow.textContent = money.format(totalCashflow);

  premium.propertyList.replaceChildren(
    ...properties.map((property) => {
      const card = document.createElement("article");
      card.className = "property-card";
      const mortgageInterest = property.mortgageBalance * (property.rate / 100 / 12);
      const cashflow = propertyCashflow(property);
      const expiryDays = daysUntil(property.mortgageExpiry);

      card.innerHTML = `
        <div class="property-card-head">
          <div>
            <h3>${property.name}</h3>
            <span class="field-hint">${property.region} · ${property.letType}</span>
          </div>
          <span class="pill">${expiryDays <= 120 ? "Remortgage soon" : "Tracked"}</span>
        </div>
        <div class="property-meta">
          <div><span>Purchase price</span><strong>${money.format(property.purchasePrice)}</strong></div>
          <div><span>Value</span><strong>${money.format(property.currentValue)}</strong></div>
          <div><span>Mortgage</span><strong>${money.format(property.mortgageBalance)}</strong></div>
          <div><span>Rate</span><strong>${property.rate.toFixed(2)}%</strong></div>
          <div><span>Rent</span><strong>${money.format(property.rent)}</strong></div>
          <div><span>Expenses</span><strong>${money.format(property.expenses)}</strong></div>
          <div><span>Cashflow</span><strong>${money.format(cashflow)}</strong></div>
          <div><span>Mortgage interest</span><strong>${money.format(mortgageInterest)}</strong></div>
        </div>
        <div class="property-expiry"><span>Expiry</span><strong>${property.mortgageExpiry}</strong></div>
      `;
      return card;
    }),
  );

  renderReminders();
}

function ordinalSuffix(day) {
  if ([11, 12, 13].includes(day % 100)) return "th";
  return day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th";
}

function renderReminders() {
  const reminders = [];

  properties.forEach((property) => {
    const expiryDays = daysUntil(property.mortgageExpiry);
    if (expiryDays <= 180) {
      reminders.push(`Mortgage deal for ${property.name} expires in ${expiryDays} days. Prepare remortgage options.`);
    }
    if (property.rentReminder === "On") {
      reminders.push(`On the ${property.rentDueDay}${ordinalSuffix(property.rentDueDay)}: check if ${property.tenantName || "your tenant"} paid ${money.format(property.rent)} for ${property.name}.`);
    }
    if (property.region === "Scotland" && property.letType === "Long-term let") {
      reminders.push(`Scottish tenancy pack ready for ${property.name}: landlord registration, deposit scheme and tenant details can feed the official agreement checklist.`);
    }
  });

  premium.reminderList.replaceChildren(
    ...reminders.slice(0, 6).map((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      return item;
    }),
  );
}

function switchView(viewId) {
  premium.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  premium.navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewId));
}

function openDashboard() {
  premium.premiumHero.hidden = true;
  premium.loginPanel.hidden = true;
  premium.dashboardPanel.hidden = false;
  renderPremiumDashboard();
}

function renderInvoices(invoices = []) {
  if (!premium.invoiceList) return;

  if (!invoices.length) {
    premium.invoiceList.innerHTML = `<div><span>No invoices yet</span><strong>Stripe pending</strong></div>`;
    return;
  }

  premium.invoiceList.replaceChildren(
    ...invoices.map((invoice) => {
      const row = document.createElement("div");
      const label = invoice.invoice_number || invoice.stripe_invoice_id || "Stripe invoice";
      const link = invoice.hosted_invoice_url || invoice.invoice_pdf_url;
      row.innerHTML = link
        ? `<span>${label}</span><a class="inline-link" href="${link}" target="_blank" rel="noreferrer">${moneyFromPence(invoice.amount_pence)}</a>`
        : `<span>${label}</span><strong>${moneyFromPence(invoice.amount_pence)}</strong>`;
      return row;
    }),
  );
}

function enterDemoUserMode() {
  demoUserMode = true;
  localStorage.setItem("valora-demo-user", "true");
  properties = defaultProperties;
  premium.adminNav.hidden = true;
  renderSubscriptionFallback();
  premium.subscriptionStatus.textContent = "Demo user";
  premium.subscriptionRenewal.textContent = formatDate(new Date(Date.now() + 30 * 86400000).toISOString());
  premium.subscriptionPaid.textContent = "£4.99";
  premium.subscriptionSince.textContent = formatDate(new Date().toISOString());
  premium.subscriptionNote.textContent = "Demo user view. Use this to inspect the normal customer dashboard without sending magic links.";
  renderInvoices([
    {
      invoice_number: "DEMO-0001",
      amount_pence: 499,
      hosted_invoice_url: "",
    },
  ]);
  openDashboard();
}

function renderSubscriptionFallback() {
  if (promoAccess) {
    premium.subscriptionStatus.textContent = "Complimentary";
    premium.subscriptionRenewal.textContent = "Lifetime";
    premium.subscriptionPaid.textContent = "£0";
    premium.subscriptionSince.textContent = "Early access";
    premium.subscriptionNote.textContent = "Private access code applied. Stripe billing will not be required for this account in the MVP.";
    return;
  }

  premium.subscriptionStatus.textContent = "Not active";
  premium.subscriptionRenewal.textContent = "-";
  premium.subscriptionPaid.textContent = "£0";
  premium.subscriptionSince.textContent = "-";
  premium.subscriptionNote.textContent = `Premium will use Stripe Checkout at ${STRIPE_PRICE_LABEL} once Stripe keys are connected.`;
  premium.manageBilling.textContent = "Subscribe with Stripe";
}

async function loadSubscriptionSummary() {
  renderSubscriptionFallback();
  renderInvoices();

  if (demoUserMode) {
    enterDemoUserMode();
    return;
  }

  if (!supabaseClient) return;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  const { data: redemptions } = await supabaseClient
    .from("promo_redemptions")
    .select("promo_codes(lifetime_access,code)")
    .eq("user_id", user.id)
    .limit(1);

  if (redemptions?.some((item) => item.promo_codes?.lifetime_access)) {
    promoAccess = true;
    localStorage.setItem("valora-promo-access", "true");
    renderSubscriptionFallback();
  }

  const { data: subscriptions } = await supabaseClient
    .from("subscriptions")
    .select("status,current_period_start,current_period_end,created_at,amount_monthly_pence,currency,total_paid_pence,cancel_at_period_end")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  const subscription = subscriptions?.[0];
  if (!subscription) return;

  premium.subscriptionStatus.textContent = subscription.cancel_at_period_end
    ? `${subscription.status} - canceling`
    : subscription.status;
  premium.subscriptionRenewal.textContent = formatDate(subscription.current_period_end);
  premium.subscriptionPaid.textContent = moneyFromPence(subscription.total_paid_pence);
  premium.subscriptionSince.textContent = formatDate(subscription.created_at);
  premium.subscriptionNote.textContent = `Plan: ${moneyFromPence(subscription.amount_monthly_pence || 499)} / month. Stripe billing portal will open here once connected.`;
  premium.manageBilling.textContent = "Manage billing";

  const { data: payments } = await supabaseClient
    .from("payments")
    .select("stripe_invoice_id,invoice_number,amount_pence,hosted_invoice_url,invoice_pdf_url,paid_at")
    .eq("user_id", user.id)
    .order("paid_at", { ascending: false })
    .limit(8);

  renderInvoices(payments || []);
}

async function startStripeCheckout() {
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
  premium.subscriptionNote.textContent = "Opening Stripe Checkout...";

  const { data, error } = await supabaseClient.functions.invoke(CHECKOUT_FUNCTION, {
    body: {},
  });

  premium.manageBilling.disabled = false;

  if (error || !data?.url) {
    premium.subscriptionNote.textContent =
      "Stripe Checkout is not ready yet. Check Supabase Edge Function secrets and STRIPE_PRICE_ID_MONTHLY.";
    return;
  }

  window.location.href = data.url;
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
            `<div><span>${label}</span><strong>${row[key] ?? "-"}</strong></div>`,
        )
        .join("");
      return item;
    }),
  );
}

function renderAdminPromos(promos = []) {
  renderAdminTable(
    premium.adminPromoList,
    promos.map((promo) => ({
      code: promo.code,
      usage: `${promo.redeemed_count || 0}/${promo.max_redemptions || "unlimited"}`,
      access: promo.lifetime_access ? "Infinity" : `${promo.free_months || 0} months`,
      expiry: promo.expires_at ? formatDate(promo.expires_at) : "No expiry",
    })),
    [
      ["Code", "code"],
      ["Used", "usage"],
      ["Access", "access"],
      ["Expires", "expiry"],
    ],
  );
}

async function loadAdminOverview() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient.rpc("get_admin_overview");
  if (error || !data) {
    premium.adminNav.hidden = true;
    return;
  }

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

  const { data, error } = await supabaseClient.rpc("create_admin_promo_code", {
    input_code: code,
    input_max_redemptions: maxRedemptions,
    input_expires_at: expiresAt,
    input_free_months: duration === "infinity" ? 0 : Number(duration),
    input_lifetime_access: duration === "infinity",
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

  if (data?.length) {
    properties = data.map((property) => ({
      id: property.id,
      name: property.name,
      region: property.region === "scotland" ? "Scotland" : "England",
      letType: property.let_type === "short_term" ? "Short-term let" : "Long-term let",
      purchaseDate: property.purchase_date,
      purchasePrice: Number(property.purchase_price),
      currentValue: Number(property.current_value),
      deposit: Number(property.deposit_paid),
      mortgageBalance: Number(property.mortgage_balance),
      rate: Number(property.mortgage_rate),
      mortgageExpiry: property.mortgage_expiry_date,
      rent: Number(property.monthly_rent),
      expenses: Number(property.operating_expenses),
      tenantName: property.tenant_name,
      tenantContact: property.tenant_email || property.tenant_phone,
      rentDueDay: property.rent_due_day || 1,
      rentReminder: property.rent_reminder_enabled ? "On" : "Off",
      landlordRegistration: property.landlord_registration_number,
      documents: "",
    }));
  }

  return true;
}

async function savePropertyToSupabase(property) {
  if (!supabaseClient) return;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) return;

  await supabaseClient.from("properties").insert({
    user_id: user.id,
    name: property.name,
    region: property.region.toLowerCase(),
    let_type: property.letType === "Short-term let" ? "short_term" : "long_term",
    purchase_date: property.purchaseDate || null,
    purchase_price: property.purchasePrice,
    current_value: property.currentValue,
    deposit_paid: property.deposit,
    mortgage_balance: property.mortgageBalance,
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
    notes: property.documents || null,
  });
}

async function initAuth() {
  if (!supabaseClient) {
    premium.authMessage.textContent = "Supabase key is not configured in app.js yet.";
    return;
  }

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session?.user) {
    await loadSupabaseProperties(session.user.id);
    await loadSubscriptionSummary();
    await loadAdminOverview();
    openDashboard();
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

async function redeemPromoCode(code) {
  const normalizedCode = code.trim().toUpperCase();
  if (!normalizedCode) {
    premium.promoMessage.textContent = "Enter a promo code.";
    return;
  }

  if (!supabaseClient) {
    premium.promoMessage.textContent = "Promo codes are checked securely online. Try again after the app is connected.";
    return;
  }

  const { data, error } = await supabaseClient.rpc("redeem_promo_code", {
    input_code: normalizedCode,
  });

  if (error || !data?.accepted) {
    premium.promoMessage.textContent = data?.message || "Promo not recognised.";
    return;
  }

  promoAccess = true;
  localStorage.setItem("valora-promo-access", "true");
  premium.promoMessage.textContent = "Promo accepted. Premium access unlocked.";
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
          "England: Multiple Dwellings Relief was abolished for SDLT transactions completing or substantially performing on or after 1 June 2024. However, 6 or more residential properties bought in one transaction are treated as non-residential for SDLT, so Valora applies non-residential rates here.",
      };
    }

    return {
      ...calculatePurchaseTax(price, 1, "residential"),
      basis:
        "England: Multiple Dwellings Relief was abolished from 1 June 2024. For fewer than 6 dwellings, Valora uses residential additional dwelling SDLT rates; confirm linked transaction treatment with a solicitor or tax adviser.",
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
  button.addEventListener("click", () => {
    switchView(button.dataset.view);
    if (button.dataset.view === "premiumView") trackEvent("premium_viewed");
  });
});

premium.showLogin.addEventListener("click", () => {
  premium.loginPanel.scrollIntoView({ behavior: "smooth", block: "center" });
});

premium.providerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    trackEvent("login_started", { provider: button.dataset.loginProvider });
    if (button.dataset.loginProvider === "Email") {
      premium.emailLoginForm.hidden = false;
      premium.authMessage.textContent = supabaseClient
        ? "Enter your email and Valora will send a secure magic link."
        : "Supabase is not configured yet. Add your public Supabase URL and publishable key to config.js.";
      premium.loginEmail.focus();
      return;
    }

    premium.emailLoginForm.hidden = false;
    premium.authMessage.textContent = `${button.dataset.loginProvider} sign-in is coming later. Use email magic link for the MVP.`;
  });
});

premium.demoUserLogin.addEventListener("click", () => {
  enterDemoUserMode();
});

premium.promoForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await redeemPromoCode(premium.promoCode.value);
});

premium.manageBilling.addEventListener("click", () => {
  startStripeCheckout();
});

premium.refreshAdmin.addEventListener("click", () => {
  loadAdminOverview();
});

premium.adminPromoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createAdminPromoCode();
});

premium.emailLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supabaseClient) {
    premium.authMessage.textContent = "Supabase is not configured yet. Add SUPABASE_URL and SUPABASE_ANON_KEY to config.js.";
    return;
  }

  premium.authMessage.textContent = "Sending magic link...";
  const { error } = await supabaseClient.auth.signInWithOtp({
    email: premium.loginEmail.value,
    options: {
      emailRedirectTo: APP_BASE_URL,
    },
  });

  premium.authMessage.textContent = error
    ? error.message
    : "Magic link sent. Check your email, then return to Valora.";
});

premium.openPropertyModal.addEventListener("click", () => {
  premium.propertyModal.hidden = false;
});

premium.closePropertyModal.addEventListener("click", () => {
  premium.propertyModal.hidden = true;
});

premium.propertyModal.addEventListener("click", (event) => {
  if (event.target === premium.propertyModal) {
    premium.propertyModal.hidden = true;
  }
});

premium.propertyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const property = {
    name: document.querySelector("#propertyName").value,
    region: document.querySelector("#propertyRegion").value,
    letType: document.querySelector("#propertyLetType").value,
    purchaseDate: document.querySelector("#propertyPurchaseDate").value,
    purchasePrice: Number(document.querySelector("#propertyPurchasePrice").value) || 0,
    currentValue: Number(document.querySelector("#propertyCurrentValue").value) || 0,
    deposit: Number(document.querySelector("#propertyDeposit").value) || 0,
    mortgageBalance: Number(document.querySelector("#propertyMortgage").value) || 0,
    rate: Number(document.querySelector("#propertyRate").value) || 0,
    mortgageExpiry: document.querySelector("#propertyMortgageExpiry").value,
    rent: Number(document.querySelector("#propertyRent").value) || 0,
    expenses: Number(document.querySelector("#propertyExpenses").value) || 0,
    tenantName: document.querySelector("#tenantName").value,
    tenantContact: document.querySelector("#tenantContact").value,
    rentDueDay: Number(document.querySelector("#rentDueDay").value) || 1,
    rentReminder: document.querySelector("#rentReminder").value,
    landlordRegistration: document.querySelector("#landlordRegistration").value,
    documents: document.querySelector("#propertyDocuments").value,
  };

  properties = [property, ...properties];
  savePropertyToSupabase(property);
  trackEvent("property_added", { property_name: property.name, region: property.region });
  premium.propertyModal.hidden = true;
  renderPremiumDashboard();
});

premium.exportPortfolio.addEventListener("click", () => {
  trackEvent("pdf_exported", { property_count: properties.length });
  window.print();
});

renderTaxBands("higher");
renderPremiumDashboard();
renderSubscriptionFallback();
trackEvent("page_view", { path: window.location.pathname });
initAuth();
update();
