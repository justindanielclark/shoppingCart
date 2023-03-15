import ProductData from "./ProductData";

interface FetchedData {
  limit: number;
  skip: number;
  total: number;
}

interface CategoryData extends FetchedData {
  products: Array<ProductData>;
}

export default CategoryData;
