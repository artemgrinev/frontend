<script setup></script>
<template>
  <main class="Container max-w-screen-xl mx-auto">
    <slot />
  </main>
</template>

<style lang="css">
.Container {
  width: 100%;
  height: 100dvh;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .Container {
    width: 760px;
    padding: 0 30px;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .Container {
    width: 1000px;
  }
}

@media (min-width: 1280px) {
  .Container {
    width: 1260px;
  }
}
</style>
