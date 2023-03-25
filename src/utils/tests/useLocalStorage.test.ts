import useLocalStorage from "../useLocalStorage";
import products from "../../data/products";
import ProductData from "../../types/ProductData";
import categories from "../../data/categories";
import { findAllInRenderedTree } from "react-dom/test-utils";

const productArr = products.products;
const exampleCategories = [
  { name: "Groceries", products: [1, 2, 3, 4] },
  { name: "Home Wares", products: [5, 6, 7, 8] },
  { name: "Linens", products: [9, 10, 11, 12] },
  { name: "Boots", products: [13, 14, 15, 16] },
];

const _localStorage = useLocalStorage();
beforeEach(() => localStorage.clear());

test("able to add products and retrieve them", () => {
  productArr.forEach((product) => {
    _localStorage.setProduct(product, new Date());
  });
  productArr.forEach((product) => {
    const lsProduct = _localStorage.getProduct(product.id);
    if (lsProduct) {
      const { fetched, ...obj } = lsProduct;
      expect(obj).toMatchObject(product);
    } else {
      fail("Never Retreived Object from LocalStorage");
    }
  });
});
test("able to add and retrieve all categories as well as individual categories", () => {
  //SETUP
  const categoryNames = exampleCategories.map((categories) => categories.name);
  _localStorage.setCategories(categoryNames, new Date());
  exampleCategories.forEach((category) => {
    _localStorage.setCategory(category.name, category.products, new Date());
  });
  //RETREIVAL
  const LSCategories = _localStorage.getCategories();
  if (LSCategories) {
    const { fetched, categories } = LSCategories;
    expect(categories).toMatchObject(categoryNames);
  } else {
    fail("Never Retreived Object from LocalStorage");
  }
  exampleCategories.forEach((category) => {
    const LSCategory = _localStorage.getCategory(category.name);
    if (LSCategory) {
      const { fetched, ...obj } = LSCategory;
      expect(obj).toMatchObject(category);
    } else {
      fail("Never Retrieved Object from LocalStorage");
    }
  });
});
