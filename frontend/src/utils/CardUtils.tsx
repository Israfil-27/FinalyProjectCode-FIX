export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: any) => {
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: any, item: any) => acc + item.price * item.qty,
      0
    )
  );
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
  state.taxPrice = addDecimals(
    Number((0.15 * Number(state.itemsPrice)).toFixed(2))
  );
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  state.count = 0;
  localStorage.setItem("cart", JSON.stringify(state));
};
