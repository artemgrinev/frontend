import type { Ingredient } from "./Ingredient";
import type { Instruction } from "./Instruction";
import type { Tag } from "./Tag";
import type { Category } from "./Category";
import type { Cuisine } from "./Cusine";

export interface Recipe {
  id: number;
  url: string;
  title: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  preliminaryPreparation: string;
  servings: number;
  difficulty: string;
  image: string;
  caloriesPerServing?: number | null;
  rating?: number;
  reviewCount?: number;
  viewCount: number;
  datePublished: string;

  categoryId: number;
  cuisineId: number;

  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: Tag[];

  category: Category;

  cuisine: Cuisine;
}
