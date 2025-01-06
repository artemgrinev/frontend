<script setup>
import { computed } from "vue";

definePageMeta({
  layout: "content",
});

const { data: recipeData, status } = await useFetch("/api/recipes/1");
const links = computed(() => [
  { label: "Главная", to: "/" },
  { label: "Рецепты", to: "/recipes" },
  { label: "Супы", to: "/recipes/soups" },
  { label: recipeData.value?.title },
]);

const { ingredients, instructions } = recipeData.value || {};

const products = ingredients.map((ingredient) => ingredient.mainProduct);
// в методе ниже нужно будет добавить обработку события, так что бы при изменение продукта
// изменялся и масив с ингредиентами или создать новый реактивный масив в который буду добавлять  уже измененное состояние
const handleProductUpdate = (productReplacementIds) => {
  console.log("вызов");
  let test = ingredients.map((ingredient) => {
    if (productReplacementIds.currentProductId === ingredient.mainProductId) {
      console.log(ingredient.title);
    } else {
      console.log(productReplacementIds.currentProductId);
    }
  });
};
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
      <RecipeProductHeader :ingredients="ingredients" />
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
