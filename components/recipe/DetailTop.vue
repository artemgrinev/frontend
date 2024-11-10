<script setup>
import recipesImage from '@/assets/img/recipes.jpg';
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ""
  },
  image: {
    type: String,
    required: false,
    default: recipesImage
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  cookTimeMinutes: {
    type: Number,
    required: false,
    default: 0
  },
  prepTimeMinutes: {
    type: Number,
    required: false,
    default: 0
  },
  difficulty: {
    type: String,
    required: false,
    default: ""
  },
  preliminaryPreparation: {
    type: String,
    required: false,
    default: ""
  },
  viewCount: {
    type: Number,
    required: false,
    default: 0
  },
  reviewCount: {
    type: Number,
    required: false,
    default: 0
  },
  datePublished: {
    type: String,
    required: false,
    default: "1 декабря 2000"
  },
})
</script>
<template>
  <main class="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-10 md:pt-6 border-b-2">
    <!-- Image -->
    <div class="col-span-1 lg:col-span-7 xl:col-span-7 order-1 lg:order-2">
      <img class="rounded-xl w-full h-full object-cover"
        :src="image"
        alt="Starship starts the engine"

      />
    </div>

    <!-- Content (Title, Tags, Description) -->
    <div class="col-span-1 lg:col-span-5 xl:col-span-5 order-2 lg:order-1 flex flex-col">
      <!-- Title -->
      <h1 class="mb-4 text-4xl lg:text-4xl xl:text-4xl font-semibold lg:tracking-tight">
        {{ title }}
      </h1>

      <!-- Tags -->
      <div v-if="prepTimeMinutes" class="flex flex-col sm:flex-row flex-wrap gap-3 pb-4">
        <div class="rounded-md bg-gray-100 p-1.5 border border-transparent text-sm text-black transition-all">   
          Время приготовления: {{ prepTimeMinutes }} минут 
        </div>
        <div v-if="cookTimeMinutes" class="rounded-md bg-gray-100 p-1.5 border border-transparent text-sm text-black transition-all">
           Активное время: {{ cookTimeMinutes }} минут 
        </div>
        <div v-if="difficulty" class="rounded-md bg-gray-100 p-1.5 border border-transparent text-sm text-black transition-all">   
          Сложность: {{ difficulty }} </div>
        <div v-if="preliminaryPreparation" class="rounded-md bg-gray-100 p-1.5 border border-transparent text-sm text-black transition-all"> 
          {{ preliminaryPreparation }} 
        </div>
      </div>
      <UDivider class="mb-4"/>
      <!-- Meta -->
      <div class="flex flex-row">
        <div class="flex items-center">
          <UIcon class="inline-block text-gray-400" :name="'material-symbols:visibility-rounded'" size="18"/>
          <span class="inline-block text-gray-500 text-sm pr-4 pl-1">{{ viewCount }}</span>
        </div>
        <div class="flex items-center">
          <UIcon class="inline-block text-gray-400" :name="'material-symbols:mode-comment-rounded'" size="18"/>
          <span class="inline-block text-gray-500 text-sm pr-4 pl-1">{{ reviewCount }}</span>
        </div>
        <div class="flex items-center">
          <UIcon class="inline-block text-gray-400" :name="'material-symbols:calendar-today'" size="18"/>
          <span class="inline-block text-gray-500 text-sm pr-4 pl-1">{{ datePublished }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-lg mt-4">
        {{ description }}
      </p>
    </div>
  </main>
</template>