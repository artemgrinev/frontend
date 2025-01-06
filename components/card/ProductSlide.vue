<script setup>
import { ref, defineProps } from "vue";
const emit = defineEmits(["productAdded"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  thumbnail: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
    default: "#",
  },
  weight: {
    type: Number,
    required: true,
    default: 0,
  },
  amount: {
    type: String,
    required: true,
    default: "",
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
  similarProducts: {
    type: Array,
    required: true,
    default: () => [],
  },
  productId: {
    type: Number,
    required: true,
  },
});

const currentProduct = ref({
  title: props.title,
  thumbnail: props.thumbnail,
  link: props.link,
  weight: props.weight,
  amount: props.amount,
  price: props.price,
  rating: props.rating,
});

const imageLoaded = ref(false);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const handleProductAdded = (product) => {
  // Обновляем данные текущего продукта
  console.log("ProductSlide -> handleProductAdded");
  console.log("productId:", product.id);
  currentProduct.value = { ...currentProduct.value, ...product };
  console.log("currentProductID:", currentProduct.value.id);
  emit("productAdded", {
    id: currentProduct.value.id,
    ...currentProduct.value,
  });
};
</script>

<template>
  <div class="ProductCard__Slide">
    <div class="bg-zinc-50 rounded-xl">
      <!-- Image -->
      <a :href="currentProduct.link" class="relative block">
        <NuxtImg
          class="relative rounded-xl object-cover"
          :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
          width="198"
          height="198"
          @load="handleImageLoad"
          :src="`https://storage.yandexcloud.net/bludce/images/products/${currentProduct.thumbnail}`"
          alt="product image"
        />
        <USkeleton
          v-if="!imageLoaded"
          class="pr-3"
          :ui="{ rounded: 'rounded-xl' }"
        />
        <div
          class="flex items-center absolute bottom-0 left-4 bg-white rounded-t-md z-10"
        >
          <UIcon
            class="ProductCard__rating inline-block text-yellow-500"
            name="material-symbols:kid-star"
            size=""
          />
          <span class="inline-block text-sm">{{ currentProduct.rating }}</span>
        </div>
      </a>

      <!-- Content -->
      <div class="px-3 pb-4 pt-2">
        <a class="text-gray-900 overflow-hidden" :href="currentProduct.link">
          <h5
            class="ProductCard_Slide__title mb-1 overflow-hidden text-ellipsis whitespace-normal"
          >
            {{ currentProduct.title }}
          </h5>
        </a>
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-400 text-sm"
            >{{ currentProduct.weight }} {{ currentProduct.amount }}</span
          >
          <UBadge
            class="md:hidden block bg-gray-100 font-bold text-gray-900"
            variant="soft"
          >
            {{ currentProduct.price }} ₽
          </UBadge>
        </div>
        <div class="md:flex justify-between items-center">
          <div class="hidden md:block">
            <UBadge class="bg-gray-100 font-bold text-gray-900" variant="soft">
              {{ currentProduct.price }} ₽
            </UBadge>
          </div>
          <div class="w-full md:w-auto">
            <SearchProducts
              :similarProducts="props.similarProducts"
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
