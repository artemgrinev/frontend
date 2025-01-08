<script setup lang="ts">
import { computed, ref } from "vue";

import { calcProducts } from "~/utils/recipe/calculatePrice";

import type { Recipe } from "~/interfaces/recipe/Recipe";
import type { Instruction } from "~/interfaces/recipe/Instruction";
import type { Ingredient } from "~/interfaces/recipe/Ingredient";
import type { ReplacementProduct } from "~/interfaces/product/Replacement";

definePageMeta({
  layout: "content",
});

const recipe = ref<Recipe | null>(null);
const ingredients = ref<Ingredient[]>([]);
let instructions: Instruction[] = [];

const { data, error } = await useFetch("/api/recipes/1");

if (!error.value && data.value) {
  recipe.value = data.value as Recipe;
  ingredients.value = recipe.value.ingredients;
  instructions = recipe.value.instructions;
  console.log("recipe:", recipe.value.title);
}

const links = computed(() => [
  { label: "Главная", to: "/" },
  { label: "Рецепты", to: "/recipes" },
  { label: "Супы", to: "/recipes/soups" },
  { label: recipe.value?.title || "Без названия", to: "#" },
]);

const products = computed(() =>
  ingredients.value.map((ingredient) => ingredient.mainProduct)
);

const handleProductUpdate = (productReplacementIds: ReplacementProduct) => {
  ingredients.value = ingredients.value.map((ingredient) => {
    if (productReplacementIds.currentProductId === ingredient.mainProductId) {
      console.log(`Обновляем продукт: ${ingredient.title}`);

      const updatedIngredient = {
        ...ingredient,
        mainProductId: productReplacementIds.newProductId.id,
        mainProduct: productReplacementIds.newProductId,
      };

      console.log("Обновленный ингредиент:", updatedIngredient);
      return updatedIngredient;
    }
    return ingredient;
  });

  console.log("Ингредиенты после обновления:", ingredients.value);
};

const productsPrice = computed(() => {
  return calcProducts(ingredients.value);
});
</script>

<template>
  <UBreadcrumb
    class="max-md:hidden"
    :links="links"
    :ui="{ li: 'text-gray-500' }"
  />
  <RecipeDetailTop
    :title="recipe?.title"
    :image="recipe?.image"
    :description="recipe?.description"
    :cook-time-minutes="recipe?.cookTimeMinutes"
    :prep-time-minutes="recipe?.prepTimeMinutes"
    :difficulty="recipe?.difficulty"
    :preliminary-preparation="recipe?.preliminaryPreparation"
    :view-count="recipe?.viewCount"
    :review-count="recipe?.reviewCount"
    :date-published="recipe?.datePublished"
  />
  <RecipeDetailRows :steps-items="instructions">
    <template v-slot:product-header>
      <RecipeProductHeader :productsPrice="productsPrice" />
    </template>
    <template v-slot:swiper>
      <SwiperProductsRB
        :items="products"
        @productUpdated="handleProductUpdate"
      />
    </template>

    <template v-slot:ingredients>
      <RecipeDetailIngredients :items="ingredients" :portion="1" />
    </template>
  </RecipeDetailRows>
</template>
