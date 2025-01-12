import type { Recipe } from "~/interfaces/recipe/Recipe";
import { useQuery } from "@tanstack/vue-query";

const defaultValue: { recipe: Recipe; error: boolean } = {
  recipe: {
    id: 0,
    url: "",
    title: "",
    description: "",
    prepTimeMinutes: 0,
    cookTimeMinutes: 0,
    preliminaryPreparation: "",
    servings: 0,
    difficulty: "",
    image: "",
    caloriesPerServing: null,
    rating: 0,
    reviewCount: 0,
    viewCount: 0,
    datePublished: "",

    categoryId: 0,
    cuisineId: 0,

    ingredients: [],
    instructions: [],
    tags: [],

    category: {
      id: 0,
      name: "",
    },

    cuisine: {
      id: 0,
      name: "",
    },
  },
  error: false,
};

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});

export const useRecipeStore = defineStore("recipe", {
  state: () => defaultValue,

  actions: {
    async set(id: number) {
      this.error = false;
      try {
        const { data, isLoading, isError, error } = useQuery({
          queryKey: ["user-profile", { userId: id }],
          queryFn: () => getRecipeAPI(id),
          enabled: !!id,
        });

        if (error) {
          this.error = true;
          console.error("Ошибка при получении рецепта:", error);
          return;
        }

        this.$patch({ recipe: data.value });
      } catch (err) {
        this.error = true;
        console.error("Ошибка при выполнении запроса:", err);
      }
    },
  },
});
