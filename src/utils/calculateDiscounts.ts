export function calculateDiscounts(
  cart: { product: IProduct; quantity: number }[]
) {
  if (cart) {
    const discountedProducts = cart.filter((item) => item.product.discount);

    const discountedPrices = discountedProducts.reduce(
      (acc, product) =>
        acc + product.quantity * parseFloat(product.product.discounted_price),
      0
    );

    return discountedPrices;
  }
}
