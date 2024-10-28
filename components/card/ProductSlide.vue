<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ""
  },
  img: {
    type: String,
    required: false,
    default: "@/assets/img/product.jpg"
  },
  link: {
    type: String,
    required: false,
    default: "#"
  },
  weight: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    required: false,
    default: 0
  }
});
</script>

<template>
  <div class="ProductCard__Slide">
    <div class="bg-white rounded-xl">
      <!-- Image -->
      <a :href="link" class="relative block">
        <img class="relative rounded-t-lg object-cover" 
          :src="img"
          alt="product image"
        />
        <div class="flex items-center absolute bottom-0 left-4 bg-white rounded-t-md z-10">
          <UIcon class="ProductCard__rating inline-block text-yellow-500" name="material-symbols:kid-star" size="" />
          <span class="inline-block text-sm">{{ props.rating }}</span>
        </div>
      </a>

      <!-- Content -->
      <div class="px-4 pb-4 pt-2">
        <a class="text-gray-900 overflow-hidden" :href="link">
          <h5 class="ProductCard_Slide__title mb-1 overflow-hidden text-ellipsis whitespace-normal">
            {{ title }}
          </h5>
        </a>
        <span class="block text-gray-400 text-sm mb-2">{{ weight }} г</span>
        <span class="inline-block bg-gray-100 px-2 rounded-md font-bold text-gray-900">{{ price }} ₽</span>
      </div>
    </div>
  </div>
</template>
    
<style scoped>
  .ProductCard__Slide {
    height: auto;
    width: 198px;
  }

  /* @media (min-width: 768px) {
    .ProductCard__Slide {
      width: 243px;
    }
  }

  @media (min-width: 1024px) {
    .ProductCard__Slide {
      width: 204px;
    }
  } */
  /* @media (max-width: 544px) {
    .ProductCard__Slide {
      width: 14.6875rem;
    }
  }
  @media (max-width: 543px) {
    .ProductCard__Slide {
      width: 152px;
    }
  } */

  .ProductCard_Slide__title {
    height: 48px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>