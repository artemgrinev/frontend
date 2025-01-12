<template>
  <div class="flex items-center justify-between w-screen">
    <NuxtImg
      fit="contain"
      :modifiers="{ b: '#F4F4F5' }"
      quality="100"
      class="flex rounded-xl mr-2 bg-zinc-100"
      width="68"
      height="68"
      :src="img"
      alt="product image"
    />
    <div class="flex-grow">
      <span class="flex justify-start text-sm">{{ props.title }}</span>
    </div>
    <div class="flex">
      <span class="flex justify-end text-sm w-16">{{ props.price }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
interface Props {
  img: String;
  title: String;
  price: String;
}
const props = defineProps<Props>();
const img = `https://storage.yandexcloud.net/bludce/images/products/${props.img}`;
</script>

<style></style>
