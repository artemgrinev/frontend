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
      :fuse="{ resultLimit: 10, fuseOptions: { threshold: 0.1 } }"
      @update:model-value="onSelect"
    >
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <span class="italic text-sm"
            >Продуктов по вашему запросу не найдено</span
          >
          <span class="italic text-sm">Попробуйте изменить запрос</span>
          <UButton label="Закрыть" @click="close" />
        </div>
      </template>
      <template #products-command="{ command }">
        <div class="flex items-center justify-between w-screen">
          <NuxtImg
            fit="contain"
            :modifiers="{ b: '#F4F4F5' }"
            quality="100"
            densities="x1 x2"
            class="flex rounded-xl mr-2 bg-zinc-100"
            width="68"
            height="68"
            :src="`https://storage.yandexcloud.net/bludce/images/products/${command.img}`"
            alt="product image"
          />
          <div class="flex-grow">
            <span class="flex justify-start text-sm">{{ command.label }}</span>
          </div>
          <div class="flex">
            <span class="flex justify-end text-sm w-16">{{
              command.suffix
            }}</span>
          </div>
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
  click: async () => {
    try {
      const fetchedProduct = await $fetch(`/api/products/${product.id}`);
      addedProduct.value = fetchedProduct;
      handleAddProducts(addedProduct);
      console.log("addedProduct:", addedProduct.value);
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
    }
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
                img: product.thumbnail,
                suffix: product.price
                  ? `${Math.floor(product.price)} ₽`
                  : "нет цены",
                click: () => {
                  try {
                    addedProduct.value = product;
                    handleAddProducts(addedProduct);
                    console.log("addedProduct:", addedProduct.value);
                  } catch (error) {
                    console.error("Ошибка при добавлении продукта:", error);
                  }
                },
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
  emit("productAdded", addedProduct.value);
  isOpen.value = false;
};
const close = () => {
  isOpen.value = false;
};
</script>

<style></style>
