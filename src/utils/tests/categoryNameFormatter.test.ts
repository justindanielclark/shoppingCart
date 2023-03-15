import {
  sidebarCategoryNameFormatter,
  categoryNameFormatter,
} from "../categoryNameFormatter";

describe("categoryNameFormatter", () => {
  it("Converts smartphones into Smartphones", () => {
    expect(categoryNameFormatter("smartphones")).toBe("Smartphones");
  });
  it("Converts home-decoration into Home Decoration", () => {
    expect(categoryNameFormatter("home-decoration")).toBe("Home Decoration");
  });
  it("Converts womens-dresses into Women's Dresses", () => {
    expect(categoryNameFormatter("womens-dresses")).toBe("Women's Dresses");
  });
  it("Converts '' into ''", () => {
    expect(categoryNameFormatter("")).toBe("");
  });
});

describe("sidebarCategoryNameFormatter", () => {
  it("Converts smartphones into Smartphones", () => {
    expect(sidebarCategoryNameFormatter("smartphones")).toBe("Smartphones");
  });
  it("Converts home-decoration into Home Decoration", () => {
    expect(sidebarCategoryNameFormatter("home-decoration")).toBe(
      "Home Decoration"
    );
  });
  it("Converts womens-dresses into Dresses", () => {
    expect(sidebarCategoryNameFormatter("womens-dresses")).toBe("Dresses");
  });
  it("Converts '' into ''", () => {
    expect(sidebarCategoryNameFormatter("")).toBe("");
  });
});
