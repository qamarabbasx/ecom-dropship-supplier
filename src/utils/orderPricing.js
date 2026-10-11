export const ORDER_TAX_RATE = 0.056;
// Orders placed before taxRate was stored per order were all taxed at 4%.
export const LEGACY_ORDER_TAX_RATE = 0.04;

// Orders store the rate they were placed with (order.taxRate). A missing rate
// means the order predates that column, so it was taxed at the legacy rate.
export function resolveTaxRate(taxRate) {
  const rate = Number(taxRate);
  return taxRate != null && taxRate !== "" && Number.isFinite(rate) && rate >= 0
    ? rate
    : LEGACY_ORDER_TAX_RATE;
}

export function formatTaxRate(taxRate) {
  return `${Number((resolveTaxRate(taxRate) * 100).toFixed(2))}%`;
}

export function splitTotalIntoSubtotalAndTax(totalAmount, taxRate) {
  const total = Number(totalAmount || 0);
  const subtotal = Number((total / (1 + resolveTaxRate(taxRate))).toFixed(2));
  const tax = Number((total - subtotal).toFixed(2));
  return { subtotal, tax, total };
}
