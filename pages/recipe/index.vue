<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "content",
});

const { data: recipeData } = await useFetch("/api/recipes/1");

const links = computed(() => [
  { label: "Главная", to: "/" },
  { label: "Рецепты", to: "/recipes" },
  { label: "Супы", to: "/recipes/soups" },
  { label: recipeData.value?.title },
]);

const { ingredients, products, instructions } = recipeData.value || {};
</script>

<template>
  <UBreadcrumb
    class="max-md:hidden"
    :links="links"
    :ui="{ li: 'text-gray-500' }"
  />
  <RecipeDetailTop
    :title="recipeData.title"
    :image="recipeData.image"
    :description="recipeData.description"
    :cook-time-minutes="recipeData.cookTimeMinutes"
    :prep-time-minutes="recipeData.prepTimeMinutes"
    :difficulty="recipeData.difficulty"
    :preliminary-preparation="recipeData.preliminaryPreparation"
    :view-count="recipeData.viewCount"
    :review-count="recipeData.reviewCount"
    :date-published="recipeData.datePublished"
  />
  <RecipeDetailRows :steps-items="instructions">
    <template v-slot:product-header>
      <RecipeProductHeader />
    </template>
    <template v-slot:swiper>
      <SwiperProductsRB :items="products" />
    </template>

    <template v-slot:ingredients>
      <RecipeDetailIngredients :items="ingredients" :portion="1" />
    </template>
  </RecipeDetailRows>
</template>
