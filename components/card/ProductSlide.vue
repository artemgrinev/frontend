<!-- TODO: Добавить отоброжение из какого магазина продукт -->
<!-- TODO: Добавить кнопку "like"-->
<!-- TODO: Исправить отоброжение веса продукта(некоторые продукты 1000г а должно быть 1кг.) -->

<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { Product } from "~/interfaces/product/Product";
const emit = defineEmits(["productAdded"]);
interface Props {
  product: Product;
}
const props = defineProps<Props>();

const product = ref<Product>(props.product);
const handleProductAdded = (product: Product) => {
  emit("productAdded", product);
};
const imageLoaded = ref(false);
const doSomethingOnLoad = () => {
  console.log("Изображение загружено!");
  imageLoaded.value = true;
};
</script>

<template>
  <div class="ProductCard__Slide">
    <div class="bg-zinc-50 rounded-xl">
      <!-- Image -->
      <a :href="product.url" class="relative block">
        <NuxtImg
          fit="cover"
          loading="lazy"
          quality="100"
          :modifiers="{ b: '#F4F4F5' }"
          class="relative rounded-xl bg-zinc-100"
          width="198"
          height="198"
          :src="`https://storage.yandexcloud.net/bludce/images/products/${product.thumbnail}`"
          alt="product image"
        />

        <div
          class="flex items-center absolute bottom-0 left-4 bg-white rounded-t-md z-10"
        >
          <UIcon
            class="ProductCard__rating inline-block text-yellow-500"
            name="material-symbols:kid-star"
            size=""
          />
          <span class="inline-block text-sm">{{ product.rating }}</span>
        </div>
      </a>

      <!-- Content -->
      <div class="px-3 pb-4 pt-2">
        <a class="text-gray-900 overflow-hidden" :href="product.url">
          <h5
            class="ProductCard_Slide__title mb-1 overflow-hidden text-ellipsis whitespace-normal"
          >
            {{ product.title }}
          </h5>
        </a>
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-400 text-sm"
            >{{ product.weight }} {{ product.amount }}</span
          >
          <UBadge
            class="md:hidden block bg-gray-100 font-bold text-gray-900"
            variant="soft"
          >
            {{ product.price }} ₽
          </UBadge>
        </div>
        <div class="md:flex justify-between items-center">
          <div class="hidden md:block">
            <UBadge
              class="bg-gray-100 font-bold text-gray-900"
              size="lg"
              variant="soft"
            >
              {{ product.price }} ₽
            </UBadge>
          </div>
          <div class="w-full md:w-auto">
            <SearchProducts
              :similarProducts="product.similarProducts"
              @productAdded="handleProductAdded"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ProductCard__Slide {
  height: auto;
  width: 198px;
}

.ProductCard_Slide__title {
  height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
