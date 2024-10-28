<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: false,
    default: 1
  },
  countSteps: {
    type: Number,
    required: false,
    default: 1
  },
  title: {
    type: String,
    required: false,
    default: ""
  },
  img: {
    type: String,
    required: false,
    default: "~/assets/img/stepBase.png"
  }
});
</script>

<template>
  <li class="flex items-start flex-row mb-4">
    <img class="object-cover h-auto w-64 rounded-xl" :src="img" alt="">
    <div class="flex flex-col pl-6 p-3 leading-normal">
      <h5 class="mb-2 text-2xl font-semibold tracking-tight">Шаг {{ step + 1 }}/{{ countSteps }}</h5>
      <p class="mb-3 font-normal">
        {{ title }}
      </p>
    </div>
  </li>
  <UDivider class="mb-4"/>
</template>
    
<style>
    
</style>