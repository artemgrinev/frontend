<template>
  <nav
    class="navbar bg-white mb-6 dark:bg-gray-900 md:fixed md:top-0 md:left-0 md:w-full md:z-10"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2"
    >
      <div class="flex items-center justify-start">
        <a
          href="/"
          class="flex items-center space-x-3 rtl:space-x-reverse mr-12"
        >
          <NavbarHeadLogo />
          <span class="text_logo self-center text-2xl">блюдце</span>
        </a>

        <div
          class="items-center pr-4 justify-between hidden w-full md:flex md:w-auto"
          id="navbar-user"
        >
          <ULink
            to="/"
            active-class="text-primary"
            inactive-class="text-lg px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Рецепты
          </ULink>
          <ULink
            to="/"
            active-class="text-primary"
            inactive-class="text-lg px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Журнал
          </ULink>
          <ULink
            to="/"
            active-class="text-primary"
            inactive-class="text-lg px-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Продукты
          </ULink>
        </div>
      </div>

      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        class="flex-1 max-md:hidden ml-4 mr-8"
        size="xl"
        color="white"
        :trailing="false"
        @click="isOpen = true"
        placeholder="Найти рецепт..."
        style="border-radius: 0.75rem"
        :ui="{ borderRadius: '0.75rem' }"
      />
      <UModal v-model="isOpen">
        <UCommandPalette
          v-model="selected"
          multiple
          nullable
          :groups="[{ key: 'people', commands: people }]"
        />
      </UModal>
      <div class="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div
          class="flex items-center justify-center p-3 text-gray-500 bg-slate-50 rounded-xl mr-3"
        >
          <UIcon
            :name="'icon-park-twotone:like'"
            size="26px"
            class="bg-orange-500"
          />
        </div>
        <NavbarAvatar />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false);

const people = [
  { id: 1, label: "Wade Cooper" },
  { id: 2, label: "Arlene Mccoy" },
  { id: 3, label: "Devon Webb" },
  { id: 4, label: "Tom Cook" },
  { id: 5, label: "Tanya Fox" },
  { id: 6, label: "Hellen Schmidt" },
  { id: 7, label: "Caroline Schultz" },
  { id: 8, label: "Mason Heaney" },
  { id: 9, label: "Claudie Smitham" },
  { id: 10, label: "Emil Schaefer" },
];

const selected = ref([]);
</script>

<style>
.navbar {
  box-shadow: 0 4px 20px 0 rgba(26, 26, 26, 0.08);
}
.text_logo {
  font-family: "Esqadero FF CY 4F", sans-serif;
  font-weight: 400;
}
</style>
