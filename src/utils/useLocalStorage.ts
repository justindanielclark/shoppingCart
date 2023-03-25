import ProductData from "../types/ProductData";

interface JSONFetched {
  fetched: string;
}
interface Fetched {
  fetched: Date;
}

type JSONProduct_LS = JSONFetched & ProductData;
type Product_LS = Fetched & ProductData;
type CategoryInfo = {
  name: string;
  products: Array<number>;
};
type JSONCategory_LS = CategoryInfo & JSONFetched;
type Category_LS = CategoryInfo & Fetched;

type CategoriesInfo = {
  categories: Array<string>;
};
type JSONCategories_LS = CategoriesInfo & JSONFetched;
type Categories_LS = CategoriesInfo & Fetched;

export default function useLocalStorage() {
  //Category
  function getCategory(categoryName: string): Category_LS | null {
    const categoryLS = localStorage.getItem(`category_${categoryName}`);
    if (categoryLS) {
      const JSONCategory = JSON.parse(categoryLS) as JSONCategory_LS;
      return {
        ...JSONCategory,
        fetched: new Date(JSONCategory.fetched),
      };
    }
    return null;
  }
  function setCategory(
    categoryName: string,
    productIDs: Array<number>,
    fetched: Date
  ): void {
    localStorage.setItem(
      `category_${categoryName}`,
      JSON.stringify({
        name: categoryName,
        products: productIDs,
        fetched,
      })
    );
  }
  //Categories
  function getCategories(): Categories_LS | null {
    const categoriesLS = localStorage.getItem("categories");
    if (categoriesLS) {
      const JSONCategories = JSON.parse(categoriesLS) as JSONCategories_LS;
      return {
        ...JSONCategories,
        fetched: new Date(JSONCategories.fetched),
      };
    }
    return null;
  }
  function setCategories(categories: Array<string>, fetched: Date): void {
    localStorage.setItem(
      "categories",
      JSON.stringify({
        categories,
        fetched,
      })
    );
  }
  //Product
  function getProduct(productID: number): Product_LS | null {
    const productLS = localStorage.getItem(`product_${productID}`);
    if (productLS) {
      const JSONProduct = JSON.parse(productLS) as JSONProduct_LS;
      return {
        ...JSONProduct,
        fetched: new Date(JSONProduct.fetched),
      };
    }
    return null;
  }
  function setProduct(product: ProductData, fetched: Date): void {
    localStorage.setItem(
      `product_${product.id}`,
      JSON.stringify({ ...product, fetched })
    );
  }
  return {
    getCategory,
    setCategory,
    getCategories,
    setCategories,
    getProduct,
    setProduct,
  };
}
