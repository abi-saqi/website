/**
 * Locale is runtime config, never a fork: the same component renders
 * ₹2.89 Cr for an Indian tenant and $347K for a US one from this module.
 */
export interface TenantLocale {
  locale: string; // e.g. "en-IN", "en-US"
  currency: string; // ISO 4217, e.g. "INR", "USD"
  timeZone: string; // IANA zone, e.g. "Asia/Kolkata"
}

export function formatCurrency(amount: number, tenant: TenantLocale): string {
  return new Intl.NumberFormat(tenant.locale, {
    style: "currency",
    currency: tenant.currency,
    notation: "compact",
  }).format(amount);
}

export function formatDateTime(date: Date, tenant: TenantLocale): string {
  return new Intl.DateTimeFormat(tenant.locale, {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: tenant.timeZone,
  }).format(date);
}
