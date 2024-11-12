<script setup lang="ts">
const people = [
  {
    id: "benjamincanac",
    label: "Перекрёсток",
    href: "https://github.com/benjamincanac",
    target: "_blank",
    avatar: {
      src: "https://storage.yandexcloud.net/blutce/perekrestok-logo.png",
    },
  },
  {
    id: "Atinux",
    label: "Пятёрочка",
    href: "https://github.com/Atinux",
    target: "_blank",
    avatar: { src: "https://storage.yandexcloud.net/blutce/5k-logo.png" },
  },
  {
    id: "smarroufin",
    label: "Магнит",
    href: "https://github.com/smarroufin",
    target: "_blank",
    avatar: { src: "https://storage.yandexcloud.net/blutce/magnit-logo.jpg" },
  },
  {
    id: "nobody",
    label: "Все магазины",
    icon: "i-heroicons-user-circle",
  },
];

const selected = ref(people[0]);
</script>

<template>
  <div class="_product-header">
    <h3 class="font-bold text-2xl">Продукты для рецепта</h3>
    <div class="flex">
      <UBadge class="mr-3 px-6 text-md" variant="soft" label="Badge" />
      <USelectMenu
        v-model="selected"
        :options="people"
        class="w-44"
        size="lg"
        variant="outline"
        color="green"
      >
        <template #leading>
          <UIcon v-if="selected.icon" :name="selected.icon" class="w-5 h-5" />
          <UAvatar
            v-else-if="selected.avatar"
            v-bind="selected.avatar"
            size="2xs"
          />
        </template>
      </USelectMenu>
    </div>
  </div>
</template>
<style lang="css" scoped>
._product-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
}
</style>
