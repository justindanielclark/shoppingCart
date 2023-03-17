import ProductData from "./ProductData";

interface ProductsInCategoryData {
  products: Array<ProductData>;
  limit: number;
  skip: number;
  total: number;
}

export default ProductsInCategoryData;
