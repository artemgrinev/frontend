<script setup>
const props = defineProps({
  stepsItems: {
    type: Array,
    required: true,
    default: [],
  },
});
const stepsCount = computed(() => props.stepsItems.length);
</script>
<template>
  <div class="Recipe__Rows">
    <div class="Recipe__Col _product-swiper">
      <slot name="product-header"></slot>
      <slot name="swiper"></slot>
    </div>
    <div class="Recipe__Col _ingredients bg-zinc-100">
      <slot name="ingredients"></slot>
    </div>
    <ul class="Recipe__Col _steps mt-6 md:pr-0">
      <RecipeStep
        v-for="(item, idx) in stepsItems"
        :key="idx"
        :title="item.title"
        :img="item.image"
        :count-steps="stepsCount"
        :step="idx"
      />
    </ul>
  </div>
</template>

<style>
.Recipe__Rows {
  display: grid;
  grid-template-columns: 71% 29%;
  padding-top: 40px;
}

.Recipe__Col {
  width: 100%;
  padding-right: 45px; /* Общий отступ для колонок */
}

.Recipe__Col._ingredients {
  border-radius: 20px;
  padding: 24px;
  height: 100%;
}

.Recipe__Col._steps {
  margin-bottom: 16px; /* Отступ между шагами */
}

.Step {
  height: 40px;
  margin-top: 5px;
}

@media (max-width: 1023px) {
  .Recipe__Rows {
    display: block;
    padding-top: 20;
  }

  .Recipe__Col {
    padding-right: 0; /* Убираем отступ для мобильных */
  }
}

@media (min-width: 1024px) {
  .Recipe__Col._ingredients {
    position: sticky;
    top: 0;
  }
}
</style>
