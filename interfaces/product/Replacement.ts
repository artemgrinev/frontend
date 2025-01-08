import type { Product } from "./Product";

export interface ReplacementProduct {
  currentProductId: number;
  newProductId: Product;
}
