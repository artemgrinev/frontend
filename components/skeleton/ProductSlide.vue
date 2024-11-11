<script setup></script>
<template>
  <div class="skeleton xl:w-[198px]">
    <USkeleton
      class="h-[198px] xl:w-[192px] sm:w-[199px] xs:w-[214px] mx-auto mt-[4px] mb-2"
      :ui="{ rounded: 'rounded-xl' }"
    />
    <div class="space-y-2 pl-2 pb-2">
      <USkeleton class="h-4 w-[168px]" />
      <USkeleton class="h-4 w-[158px]" />
      <USkeleton class="h-4 w-[28px]" />
      <USkeleton class="h-4 w-[56px]" />
    </div>
  </div>
</template>
