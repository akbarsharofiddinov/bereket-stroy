export function calculateDiscounts(cart: ICart[]) {
  if (cart) {
    const discountedProducts = cart.filter(
      (item) => item.product.discount && item
    );

    const discountedPrices = discountedProducts.reduce(
      (acc, product) =>
        product.isSelected
          ? acc + product.quantity * product.product.discount
          : acc,
      0
    );

    return discountedPrices;
  }
}
