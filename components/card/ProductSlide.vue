<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  img: {
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
});

const imageLoaded = ref(false);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const isOpen = ref(false);

// const products = similarProducts.map((product) => ({
//   id: product.id,
//   label: product.title,
//   image: product.thumbnail,
// }));
const similarProducts = [
  {
    id: 1,
    label: "Wade Cooper",
    image: "https://storage.yandexcloud.net/blutce/govadina.jpg",
    price: 254,
  },
  { id: 2, label: "Arlene Mccoy" },
  { id: 3, label: "Devon Webb" },
  { id: 4, label: "Tom Cook" },
  { id: 5, label: "Tanya Fox" },
  { id: 6, label: "Hellen Schmidt" },
  { id: 7, label: "Caroline Schultz" },
  { id: 8, label: "Mason Heaney" },
  { id: 9, label: "Claudie Smitham" },
  { id: 10, label: "Emil Schaefer" },
];

const selected = ref([]);
</script>

<template>
  <div class="ProductCard__Slide">
    <div class="bg-zinc-50 rounded-xl">
      <!-- Image -->
      <a :href="link" class="relative block">
        <NuxtImg
          class="relative rounded-xl object-cover"
          :class="{ 'opacity-0': !imageLoaded, 'opacity-100': imageLoaded }"
          @load="handleImageLoad"
          :src="img"
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
          <span class="inline-block text-sm">{{ props.rating }}</span>
        </div>
      </a>

      <!-- Content -->
      <div class="px-3 pb-4 pt-2">
        <a class="text-gray-900 overflow-hidden" :href="link">
          <h5
            class="ProductCard_Slide__title mb-1 overflow-hidden text-ellipsis whitespace-normal"
          >
            {{ title }}
          </h5>
        </a>
        <div class="flex justify-between items-center mb-2">
          <span class="text-gray-400 text-sm">{{ weight }} г</span>
          <UBadge
            class="md:hidden block bg-gray-100 font-bold text-gray-900"
            variant="soft"
          >
            {{ price }} ₽
          </UBadge>
        </div>
        <div class="md:flex justify-between items-center">
          <div class="hidden md:block">
            <UBadge class="bg-gray-100 font-bold text-gray-900" variant="soft">
              {{ price }} ₽
            </UBadge>
          </div>
          <div class="w-full md:w-auto">
            <UButton
              label="Заменить"
              @click="isOpen = true"
              class="w-full md:w-auto flex items-center justify-center"
            />
          </div>
        </div>

        <UModal v-model="isOpen">
          <UCommandPalette
            v-model="selected"
            multiple
            nullable
            :groups="[{ key: 'similarProducts', commands: similarProducts }]"
          >
            <template #similarProducts-icon="{ command }">
              <div class="flex items-center">
                <img
                  :src="command.image"
                  alt=""
                  class="mr-2 w-16 h-16 rounded-full"
                />
              </div>
            </template>
            <template #similarProducts-inactive="{ command }">
              <div class="flex items-center">{{ command.price }}</div>
            </template>
          </UCommandPalette>
        </UModal>
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
