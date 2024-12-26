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
}

export interface Ingredient {
  id: number;
  title: string;
  count: number;
  amount: string;
  recipeId: number;
  mainProductId: number;
  mainProduct: Product;
}
