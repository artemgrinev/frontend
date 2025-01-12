// https://medium.com/@imanmalekian31/how-to-use-tanstack-vue-query-with-usefetch-in-nuxt-3-9e90da3fcac1
import type { Recipe } from "~/interfaces/recipe/Recipe";
import { fetcher } from "./fetcher";

export function getRecipeAPI(id: number) {
  return fetcher<Recipe>(`/api/recipes/${id}/`);
}
