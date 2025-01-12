<template>
  <div class="flex-row">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-10 md:pt-6">
      <!-- Image -->
      <div class="col-span-1 lg:col-span-7 xl:col-span-7 order-1 lg:order-2">
        <USkeleton class="h-[408px] w-full" :ui="{ rounded: 'rounded-3xl' }" />
      </div>

      <!-- Content (Title, Tags, Description) -->
      <div
        class="col-span-1 lg:col-span-5 xl:col-span-5 order-2 lg:order-1 flex flex-col"
      >
        <!-- Title -->
        <USkeleton
          class="h-10 w-[510px] mb-4"
          :ui="{ rounded: 'rounded-lg' }"
        />
        <!-- Tags -->
        <div class="flex flex-col pb-4">
          <USkeleton
            class="h-6 w-[350px] mb-4"
            :ui="{ rounded: 'rounded-lg' }"
          />
          <USkeleton class="h-6 w-[250px]" :ui="{ rounded: 'rounded-lg' }" />
        </div>

        <!-- Description -->
        <USkeleton class="h-48 w-[500px]" :ui="{ rounded: 'rounded-lg' }" />
      </div>
    </div>
    <!-- Products -->
    <div class="flex">
      <div class="w-2/3 mr-14">
        <div class="flex justify-between w-full mb-4">
          <USkeleton
            class="h-10 w-[300px] mb-4"
            :ui="{ rounded: 'rounded-lg' }"
          />
          <div class="flex">
            <USkeleton
              class="h-10 mr-4 w-[75px] mb-4"
              :ui="{ rounded: 'rounded-lg' }"
            />
            <USkeleton
              class="h-10 w-[150px] mb-4"
              :ui="{ rounded: 'rounded-lg' }"
            />
          </div>
        </div>
        <div class="inline-flex flex-row">
          <div class="flex-col mr-4" v-for="item in Array(3)" :key="item">
            <USkeleton
              class="h-[198px] w-[198px] mb-2"
              :ui="{ rounded: 'rounded-lg' }"
            />
            <div class="space-y-2">
              <USkeleton
                class="h-4 w-[160px]"
                :ui="{ rounded: 'rounded-lg' }"
              />
              <USkeleton
                class="h-4 w-[120px]"
                :ui="{ rounded: 'rounded-lg' }"
              />
              <USkeleton class="h-4 w-[36px]" :ui="{ rounded: 'rounded-lg' }" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <USkeleton class="h-full w-full" :ui="{ rounded: 'rounded-3xl' }" />
      </div>
    </div>
    <!-- Steps -->
    <div class="flex-col mt-10">
      <div
        class="inline-flex flex-row w-2/3"
        v-for="item in Array(2)"
        :key="item"
      >
        <USkeleton
          class="h-[176px] w-[256px] mr-4"
          :ui="{ rounded: 'rounded-lg' }"
        />
        <div class="flex-col w-full">
          <USkeleton
            class="h-8 w-[156px] mb-4"
            :ui="{ rounded: 'rounded-lg' }"
          />
          <USkeleton class="h-[100px] w-full" :ui="{ rounded: 'rounded-lg' }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
