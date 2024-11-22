<template>
  <div>
    <h3>Фото рецепта</h3>
    <UInput type="file" class="mb-4" size="sm" icon="i-heroicons-folder" />

    <h3>Название</h3>
    <UInput class="mb-4" v-model="title" />

    <h3>Описание</h3>
    <UTextarea class="mb-4" v-model="description" />

    <h3>Время приготовления (в минутах)</h3>
    <UInput class="mb-4" v-model.number="cookingTime" type="number" />

    <h3>Активное время (в минутах)</h3>
    <UInput class="mb-4" v-model.number="activeTime" type="number" />

    <h3>Подготовка</h3>
    <UInput class="mb-4" v-model="preliminaryPreparation" />

    <h3>Сложность</h3>
    <UInputMenu v-model="selected" :options="difficulty" />

    <!-- ИНГРИДИЕНТЫ -->

    <UDivider class="py-4" label="ИНГРИДИЕНТЫ" size="sm" />

    <div>
      <div v-if="ingredients.length > 0" class="mb-4">
        <h3>Добавленные ингредиенты:</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient.title }} - {{ ingredient.count }}
            {{ ingredient.amount }}
          </li>
        </ul>
      </div>
      <div class="flex justify-between mb-4">
        <UInput
          class="pr-3 w-full"
          v-model="newIngredient.title"
          placeholder="Ингредиент"
        />
        <UInput
          class="pr-3"
          v-model="newIngredient.count"
          type="number"
          size="sm"
          placeholder="Количество"
        />
        <UInputMenu
          class="w-28 mr-3"
          v-model="newIngredient.amount"
          :options="amountOptions"
        />

        <!-- Add Product -->

        <UButton class="mr-3" label="Добавить продукт" @click="isOpen = true" />
        <UModal v-model="isOpen">
          <UCommandPalette
            :empty-state="{
              icon: 'i-heroicons-magnifying-glass-20-solid',
              label:
                'Выберите основной продукт. Затем добавте ещё несколько похожих',
              queryLabel: 'Ни чего не нашлось',
            }"
            placeholder="Найти продукты..."
            ref="commandPaletteRef"
            :groups="groups"
            :autoselect="false"
            @update:model-value="onSelect"
          />
        </UModal>

        <UButton label="Добавить ингредиент" @click.prevent="addIngredient" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

definePageMeta({
  layout: "content",
});

const title = ref("");
const description = ref("");
const cookingTime = ref(0);
const activeTime = ref(0);
const preliminaryPreparation = ref("");
const difficulty = ["Легкий", "Средний", "Сложный"];
const selected = ref(difficulty[0]);
const amountOptions = ["кг.", "гр.", "л.", "мл.", "шт."];
// ИНГРИДИЕНТЫ
const ingredients = ref([]);
const newIngredient = ref({ title: "", count: 0, amount: "кг." });
function addIngredient() {
  if (newIngredient.value.title && newIngredient.value.count) {
    ingredients.value.push({ ...newIngredient.value });
    newIngredient.value = { title: "", count: "", amount: "кг." };
  }
}
// ПРОДУКТЫ
const commandPaletteRef = ref();
const addProduct = ref([]);
const groups = computed(() =>
  [
    commandPaletteRef.value?.query
      ? {
          key: "users",
          label: (q) => q && `Users matching “${q}”...`,
          search: async (q) => {
            if (!q) {
              return [];
            }

            // @ts-ignore
            const users = await $fetch(
              "https://jsonplaceholder.typicode.com/users",
              {
                params: { q },
              }
            );

            return users.map((user) => ({
              id: user.id,
              label: user.name,
              suffix: user.email,
              click: () => {
                console.log("Click on user:", user.name);
                addProduct.value.push({
                  id: user.id,
                  label: user.name,
                  suffix: user.email,
                });
              },
            }));
          },
        }
      : [],
    ...(addProduct.value.length > 0
      ? [
          {
            key: "product",
            label: "Основной продукт",
            commands: addProduct.value,
          },
        ]
      : []),
  ].filter(Boolean)
);
function onSelect(option) {
  if (option.click) {
    option.click();
  }
}

const isOpen = ref(false);
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
</style>
