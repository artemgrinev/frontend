<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: false,
    default: 1,
  },
  countSteps: {
    type: Number,
    required: false,
    default: 1,
  },
  title: {
    type: String,
    required: false,
    default: "",
  },
  img: {
    type: String,
    required: false,
    default: "~/assets/img/stepBase.png",
  },
});
</script>

<template>
  <li class="flex items-start flex-col-reverse sm:flex-row mb-4">
    <NuxtImg
      class="object-cover rounded-xl"
      width="256"
      height="170"
      fit="cover"
      :src="img"
    />
    <div class="flex flex-col md:pl-6 p-3 leading-normal">
      <h5 class="mb-2 text-2xl font-semibold tracking-tight">
        Шаг {{ step + 1 }}/{{ countSteps }}
      </h5>
      <p class="mb-3 font-normal">
        {{ title }}
      </p>
    </div>
  </li>
  <UDivider class="mb-4" />
</template>

<style></style>
