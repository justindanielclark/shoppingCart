import { formatPrice, formatPriceWithDiscount } from "../priceFormatter";
describe("formatPrice", () => {
  it("Converts 0 to '$0.00'", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });
  it("Converts 1 to '$1.00'", () => {
    expect(formatPrice(1)).toBe("$1.00");
  });
  it("Converts 1.544 to '$1.54'", () => {
    expect(formatPrice(1.544)).toBe("$1.54");
  });
});
describe("formatPriceWithDiscount", () => {
  it("Accurately Applies Discounts (Test1): Price: 100, Discount: 20, Result: 80", () => {
    expect(formatPriceWithDiscount(100, 20)).toBe("$80.00");
  });
  it("Accurately Applies Discounts (Test2): Price: 45, Discount: 0, Result: 45", () => {
    expect(formatPriceWithDiscount(45, 0)).toBe("$45.00");
  });
  it("Accurately Applies Discounts (Test3): Price: 45, Discount: 15.6, Result: 37.98", () => {
    expect(formatPriceWithDiscount(45, 15.6)).toBe("$37.98");
  });
});
