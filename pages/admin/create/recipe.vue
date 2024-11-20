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
    <UInput class="mb-4" v-model.number="preparationTime" type="number" />

    <h3>Сложность</h3>
    <UInputMenu v-model="selected" :options="difficulty" />

    <UDivider class="py-4" label="ИНГРИДИЕНТЫ" size="sm" />

    <div
      v-for="(input, index) in inputsIngridient"
      :key="'ingredient-' + index"
      class="flex justify-between mb-4"
    >
      <UInput
        class="pr-3 w-full"
        v-model="input.title"
        placeholder="Ингредиент"
      />
      <UInput
        class="pr-3 w-32"
        v-model.number="input.count"
        type="number"
        size="sm"
        placeholder="Количество"
      />
      <UInputMenu v-model="input.amount" :options="amountOptions" />
      <UButton
        icon="mdi:delete"
        @click.prevent="removeInputField(index)"
        class="ml-2 mr-3"
      />
    </div>

    <UButton label="Добавить ингредиент" @click.prevent="addInputField" />

    <UDivider class="py-4" label="ПРОДУКТЫ" size="sm" />

    <div
      v-for="(input, index) in inputsProducts"
      :key="'product-' + index"
      class="flex justify-between mb-4"
    >
      <UInput
        class="pr-3 w-full"
        v-model="value"
        placeholder="Выбрать продукт"
        @click="isOpen = true"
      />
      <UModal v-model="isOpen">
        <UCommandPalette
          :groups="groups"
          :autoselect="false"
          @update:model-value="onProductSelect"
        />
      </UModal>

      <UInput
        class="pr-3 w-32"
        v-model.number="input.count"
        type="number"
        size="sm"
        placeholder="Количество"
      />
      <UInputMenu v-model="input.amount" :options="amountOptions" />
      <UButton
        icon="mdi:delete"
        @click.prevent="removeInputProductField(index)"
        class="ml-2 mr-3"
      />
    </div>

    <UButton label="Добавить продукт" @click.prevent="addInputProductField" />
  </div>
</template>

<script setup>
import { ref, toRaw } from "vue";

definePageMeta({
  layout: "content",
});

const title = ref("");
const description = ref("");
const cookingTime = ref(0);
const activeTime = ref(0);
const preparationTime = ref(0);
const difficulty = ["Легкий", "Средний", "Сложный"];
const selected = ref(difficulty[0]);
const inputsIngridient = ref([{ title: "", count: "", amount: "кг." }]);
const amountOptions = ["кг.", "гр.", "л.", "мл.", "шт."];

function addInputField() {
  inputsIngridient.value.push({ title: "", count: 0, amount: "кг." });
}

function removeInputField(index) {
  inputsIngridient.value.splice(index, 1);
}
const groups = [
  {
    key: "users",
    label: (q) => q && `Users matching “${q}”...`,
    search: async (q) => {
      if (!q) {
        return [];
      }

      // @ts-ignore
      const users = await $fetch("https://jsonplaceholder.typicode.com/users", {
        params: { q },
      });

      return users.map((user) => ({
        id: user.id,
        label: user.name,
        suffix: user.email,
      }));
    },
  },
];

const isOpen = ref(false);
let value = ref("");
function onProductSelect(selected) {
  console.log("Selected:", selected);
  console.log(selected.label);
  value = selected.label;
  isOpen.value = false;
}
const inputsProducts = ref([{ label: "", count: 0, amount: "кг." }]);

function addInputProductField() {
  inputsProducts.value.push({ label: "", count: 0, amount: "кг." });
}

function removeInputProductField(index) {
  inputsProducts.value.splice(index, 1);
}
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
</style>
