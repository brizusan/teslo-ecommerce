export const formatCurrency = (currency: number) => {
  return currency.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
