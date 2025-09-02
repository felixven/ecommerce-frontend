export const formatPrice = (amount) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
  }).format(amount);
};

export const formatPriceCalculation = (quantity, price) => {
  return (Number(quantity) * Number(price)).toFixed(0); 
};