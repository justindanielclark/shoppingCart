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

interface CartProductData extends ProductData {
  quantity: number;
}

export default ProductData;
export type { ProductData, CartProductData };
