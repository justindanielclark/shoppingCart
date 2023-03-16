interface FetchedCollectionData {
  limit: number;
  skip: number;
  total: number;
}

interface CategoryData extends FetchedCollectionData {
  products: Array<ProductData>;
}

interface ProductData {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export type { CategoryData, ProductData };
