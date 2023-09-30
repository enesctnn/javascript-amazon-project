export function formatPrice(priceCents) {
  return Number((priceCents / 100).toFixed(2));
}

export function calculateTaxFromPriceCents(priceCents) {
  return Number(((priceCents + 499) / 1000).toFixed(2));
}

export function calculateTotalFromPriceCents(priceCents) {
  const plusShipping = (priceCents + 499);
  const plusShippingTax = plusShipping / 10;
  return (((plusShipping + plusShippingTax) / 100).toFixed(2));
}