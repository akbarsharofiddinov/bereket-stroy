export function formatCurrency(number: number) {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    maximumSignificantDigits: 3,
  }).format(number);
  return formatted + " so‘m";
}
