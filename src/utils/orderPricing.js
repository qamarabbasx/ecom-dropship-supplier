export const ORDER_TAX_RATE = 0.04;

export function splitTotalIntoSubtotalAndTax(totalAmount) {
  const total = Number(totalAmount || 0);
  const subtotal = Number((total / (1 + ORDER_TAX_RATE)).toFixed(2));
  const tax = Number((total - subtotal).toFixed(2));
  return { subtotal, tax, total };
}
