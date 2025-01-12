<script setup lang="ts">
import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

import { calcProducts } from "~/utils/recipe/calculatePrice";
import type { Recipe } from "~/interfaces/recipe/Recipe";
import type { Ingredient } from "~/interfaces/recipe/Ingredient";
import type { ReplacementProduct } from "~/interfaces/product/Replacement";

definePageMeta({
  layout: "content",
});

const recipeId = 1;
const recipe = ref<Recipe>();
const ingredients = ref<Ingredient[]>([]);

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["user-profile", { userId: recipeId }],
  queryFn: () => getRecipeAPI(recipeId),
  enabled: !!recipeId,
});
if (data.value) {
  recipe.value = data.value;
  ingredients.value = recipe.value.ingredients || [];
}

const links = computed(() => [
  { label: "Главная", to: "/" },
  { label: "Рецепты", to: "/recipe" },
  { label: "Супы", to: "/recipe/soups" },
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
  <div v-if="isLoading">
    <SkeletonRecipePage />
  </div>
  <div v-else>
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
    <RecipeDetailRows :steps-items="recipe?.instructions">
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
  </div>
</template>
