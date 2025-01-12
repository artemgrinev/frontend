<!-- TODO: Создать скелетон для карточек продуктов -->

<script setup lang="ts">
import type { Product } from "~/interfaces/product/Product";

const props = defineProps({
  items: {
    type: Array as () => Product[],
    required: true,
    default: () => [],
  },
});
const emit = defineEmits(["productUpdated"]);
const products = computed(() => [...props.items]);

const updateProduct = (id: number, updatedProduct: Product) => {
  let productReplacementIds = {
    currentProductId: id,
    newProductId: updatedProduct,
  };
  const index = products.value.findIndex((product) => product.id === id);
  products.value[index] = { ...products.value[index], ...updatedProduct };
  console.log("productReplacementIds:", productReplacementIds);
  emit("productUpdated", productReplacementIds);
};
</script>

<template>
  <Swiper
    :modules="[SwiperAutoplay]"
    :slides-per-view="4"
    :breakpoints="{
      1280: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 3.5,
      },
      320: {
        slidesPerView: 2.5,
      },
    }"
  >
    <SwiperSlide v-for="item in products" :key="item.id">
      <CardProductSlide
        :product="item"
        @productAdded="
          (updatedProduct) => updateProduct(item.id, updatedProduct)
        "
      />
    </SwiperSlide>
  </Swiper>
</template>

<style>
.swiper {
  padding: 10px 10px 10px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: auto;
  border-radius: 16px;
  margin-right: 10px;
  -webkit-box-shadow: 0px 2px 5px 0px rgba(34, 60, 80, 0.22);
  -moz-box-shadow: 0px 2px 5px 0px rgba(34, 60, 80, 0.22);
  box-shadow: 0px 2px 5px 0px rgba(34, 60, 80, 0.22);
}

.swiper-wrapper {
  min-width: 100vh;
  width: 100vh;
  padding-left: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
