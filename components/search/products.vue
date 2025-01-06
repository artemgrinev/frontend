<template>
  <UButton class="mr-3" label="Заменить" @click="isOpen = true" />
  <UModal v-model="isOpen">
    <UCommandPalette
      :empty-state="{
        icon: 'i-heroicons-magnifying-glass-20-solid',
        label: 'Выберите продукт на который хотите заменить.',
        queryLabel: 'Ни чего не нашлось',
      }"
      placeholder="Найти продукты..."
      ref="commandPaletteRef"
      :groups="groups"
      :autoselect="false"
      @update:model-value="onSelect"
    >
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm"
            >Добавте основной продукт<br />Затем добавте несколько похожих
            продуктов</span
          >
          <UButton label="Найти продукты" />
        </div>
      </template>
      <template
        #action-command="{ command }"
        style="display: flex; justify-content: center"
      >
        <div class="flex justify-center w-screen">
          <UButton :label="command.label" @click="handleAddProducts" />
        </div>
      </template>
    </UCommandPalette>
  </UModal>
</template>

<script setup>
const emit = defineEmits(["productAdded"]);
const props = defineProps({
  similarProducts: {
    type: Array,
    required: true,
    default: [],
  },
});
const isOpen = ref(false);
const commandPaletteRef = ref();
const addedProduct = ref({});
const similarProducts = props.similarProducts.map((product) => ({
  id: product.id,
  label: product.title,
  suffix: product.price ? `${Math.floor(product.price)} ₽` : "нет цены",
  click: () => {
    addedProduct.value = product;
    handleAddProducts(addedProduct);
  },
}));

const groups = computed(() =>
  [
    commandPaletteRef.value?.query
      ? {
          key: "products",
          label: (q) => q && `Найденные продукты “${q}”...`,
          search: async (q) => {
            if (!q) {
              return [];
            }

            try {
              const products = await $fetch("/api/products/search", {
                params: { q },
              });

              return products.map((product) => ({
                id: product.id,
                label: product.title,
                suffix: product.price
                  ? `${Math.floor(product.price)} ₽`
                  : "нет цены",
                click: () => {},
              }));
            } catch (error) {
              console.error("Ошибка при выполнении поиска продуктов:", error);
              return [];
            }
          },
        }
      : [],
    ...(similarProducts.length > 0
      ? [
          {
            key: "similarProducts",
            commands: similarProducts,
          },
        ]
      : []),
  ].filter(Boolean)
);

function onSelect(option) {
  if (option.click) {
    option.click();
  }
}
const handleAddProducts = (addedProduct) => {
  console.log("Добавляем продукт handleAddProducts:", addedProduct.value);
  emit("productAdded", {
    id: addedProduct.value.id,
    title: addedProduct.value.title,
    thumbnail: addedProduct.value.thumbnail,
    weight: addedProduct.value.weight,
    amount: addedProduct.value.amount,
    price: addedProduct.value.price,
    rating: addedProduct.value.rating,
  });
  isOpen.value = false;
};
</script>

<style></style>
