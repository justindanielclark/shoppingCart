module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        priceRatingsGrid: "repeat(auto-fit, minmax(6rem, 1fr))",
        categoryProductsGrid: "repeat(auto-fit, minmax(22rem, 1fr))",
        // productCardGrid: "200px 1fr",
      },
    },
  },
  plugins: [],
};
