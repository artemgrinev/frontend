<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
    default: [],
  },
  portion: {
    type: Number,
    required: true,
    default: 1,
  },
});
</script>

<template>
  <div class="Ingredients__list">
    <h2 class="text-2xl font-semibold mb-4">
      Ингредиенты на {{ portion }} порцию
    </h2>
    <ul v-for="(item, idx) in items" :key="idx">
      <li>
        <div class="text-lg _name">
          {{ item.title }}
        </div>
        <div class="text-lg font-medium _value">
          {{ item.count }} {{ item.amount }}
        </div>
      </li>
      <UDivider class="my-2 text-black" type="dashed" size="xs" />
    </ul>
  </div>
</template>

<style>
.Ingredients__list {
  display: block;
  height: auto;
}
.Ingredients__list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.Ingredients__list li {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
</style>
