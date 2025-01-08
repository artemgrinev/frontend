import type { Product } from "../product/Product";

export interface Ingredient {
  id: number;
  title: string;
  count: number;
  amount: string;
  recipeId: number;
  mainProductId: number;
  mainProduct: Product;
}
