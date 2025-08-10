// export const formatPrice=(amount)=>{
//     return new Intl.NumberFormat("en-US",{
//         style:"currency",
//         currency:"USD",
//     }).format(amount);
// }

// export const formatPriceCalculation = (quantity, price) => {
//     return (Number(quantity) * Number(price)).toFixed(2);
//    }
export const formatPrice = (amount) => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
  }).format(amount);
};

export const formatPriceCalculation = (quantity, price) => {
  return (Number(quantity) * Number(price)).toFixed(0); // 台幣一般不用小數點
};