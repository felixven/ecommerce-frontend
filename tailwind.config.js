/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        customBlue: "rgba(28, 100, 242, 1)",
        banner: {
          color1: "#FDC200",//這四色都是banner那邊有結果 但不確定顯示上有沒有真的用到
          color2: "#FF2C2C",
          color3: "#21AD61",
          color4: "#723DA6",
        },
      },
      backgroundImage: {
       "custom-gradient": "linear-gradient(to right, #FDE6C9, #FBD7A1)", // 奶茶漸層（舉例）
        "button-gradient": "linear-gradient(to right, #7e22ce, #ef4444)",//無結果
        "custom-gradient2": "linear-gradient(135deg, #f5f5f5, #eae7dc)",//無結果
      },
    },
  },
  plugins: [],
};
