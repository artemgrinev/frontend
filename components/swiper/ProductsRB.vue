<script setup>
const props = defineProps({
  items: {
    type: Object,
    required: true,
    default: [],
  },
});
</script>

<template>
  <Swiper
    :modules="[SwiperAutoplay]"
    :slides-per-view="4"
    :space-between="5"
    :breakpoints="{
      1280: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 2.5,
        spaceBetween: 10,
      },
    }"
  >
    <SwiperSlide v-for="item in items" :key="item.id">
      <CardProductSlide
        :title="item.title"
        :img="item.thumbnail"
        :weight="item.weight"
        :amount="item.amount"
        :price="item.price"
        :rating="item.rating"
        :product-id="item.id"
        :similar-products="item.similarProducts"
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
