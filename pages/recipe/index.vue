<script setup>
definePageMeta({
  layout: "content",
});
import { ref } from "vue";
import recipeData from "@/data/recipe.json";
const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Ресепты",
  },
  {
    label: "Супы",
  },
  {
    label: recipeData.title,
  },
];
const ingredients = ref(recipeData.ingredients);
const products = ref(recipeData.products);
const instructions = ref(recipeData.instructions);
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
