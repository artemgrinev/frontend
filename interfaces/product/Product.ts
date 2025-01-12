import type { SimilarProduct } from "./SimilarProduct";

export interface Product {
  id: number;
  url: string;
  title: string;
  price: number;
  discountPercentage: number;
  weight: number;
  amount: string;
  minimumOrderQuantity: number;
  pack: boolean;
  rating: number;
  thumbnail: string;
  shopId: number;
  similarProducts: SimilarProduct[];
}
