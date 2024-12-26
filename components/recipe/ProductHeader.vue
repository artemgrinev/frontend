<script setup lang="ts">
import { calcProducts } from "~/utils/recipe/calculatePrice";
import type { Ingredient } from "~/utils/recipe/schemas";
const props = defineProps({
  ingredients: {
    type: Array as () => Ingredient[],
    required: true,
  },
});
let productsPrice = calcProducts(props.ingredients);
const people = [
  {
    id: "benjamincanac",
    label: "Перекрёсток",
    href: "https://github.com/benjamincanac",
    target: "_blank",
    avatar: {
      src: "https://storage.yandexcloud.net/blutce/perekrestok-logo.png",
    },
  },
  {
    id: "Atinux",
    label: "Пятёрочка",
    href: "https://github.com/Atinux",
    target: "_blank",
    avatar: { src: "https://storage.yandexcloud.net/blutce/5k-logo.png" },
  },
  {
    id: "smarroufin",
    label: "Магнит",
    href: "https://github.com/smarroufin",
    target: "_blank",
    avatar: { src: "https://storage.yandexcloud.net/blutce/magnit-logo.jpg" },
  },
  {
    id: "nobody",
    label: "Все магазины",
    icon: "i-heroicons-user-circle",
  },
];

const selected = ref(people[0]);
</script>

<template>
  <div class="sm:flex flex-row items-centr justify-between">
    <h3 class="md:font-bold text-2xl max-md:pb-5">Продукты для рецепта</h3>
    <div class="flex justify-between">
      <UBadge
        class="mr-3 px-6 text-md"
        variant="soft"
        :label="`${productsPrice} ₽`"
      />
      <USelectMenu
        v-model="selected"
        :options="people"
        class="w-44"
        size="lg"
        variant="outline"
        color="green"
      >
        <template #leading>
          <UIcon v-if="selected.icon" :name="selected.icon" class="w-5 h-5" />
          <UAvatar
            v-else-if="selected.avatar"
            v-bind="selected.avatar"
            size="2xs"
          />
        </template>
      </USelectMenu>
    </div>
  </div>
</template>
<style lang="css" scoped>
._product-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}
</style>
