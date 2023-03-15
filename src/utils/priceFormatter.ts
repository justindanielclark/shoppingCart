function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

function formatPriceWithDiscount(
  price: number,
  discountPercentage: number
): string {
  return `$${(price - price * (discountPercentage / 100)).toFixed(2)}`;
}

export { formatPrice, formatPriceWithDiscount };
