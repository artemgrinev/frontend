<template>
  <div>
    <div class="flex">
      <!-- --------------------------------ИЗОБРОЖЕНИЕ-------------------------------- -->
      <div class="file-upload-container flex-shrink-0 mr-3">
        <UButton
          class="w-80 h-80 flex flex-col items-center justify-center"
          color="gray"
          variant="ghost"
          @click="triggerFileInput"
        >
          <UIcon name="i-heroicons-folder" class="text-4xl mb-2" />
          <span class="text-sm">Выберите файл</span>
        </UButton>
        <input
          ref="fileInput"
          type="file"
          accept=".jpg,.png"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
      <!-- --------------------------------ОПИСАНИЕ-------------------------------- -->
      <div class="flex-col w-full">
        <h3>Название</h3>
        <UInput class="mb-4 w-full" v-model="title" />
        <h3>Описание</h3>
        <UTextarea
          class="mb-4 w-full"
          v-model="description"
          :ui="{ base: 'h-wull' }"
        />
        <div class="flex justify-between mb-4">
          <div>
            <h3>Время приготовления</h3>
            <UInput
              class="mr-2 w-44"
              v-model.number="cookTimeMinutes"
              type="number"
            />
          </div>
          <div>
            <h3>Активное время</h3>
            <UInput
              class="mr-2 w-44"
              v-model.number="prepTimeMinutes"
              type="number"
            />
          </div>
          <div class="mr-2 w-full">
            <h3>Подготовка</h3>
            <UInput class=" " v-model="preliminaryPreparation" />
          </div>
          <div>
            <h3>Сложность</h3>
            <UInputMenu v-model="selectedDifficulty" :options="difficulty" />
          </div>
        </div>
        <div class="flex justify-between">
          <div>
            <h3>Порции</h3>
            <UInput class="mr-2" v-model="servings" type="number" />
          </div>
          <div>
            <h3>Категория</h3>
            <UInputMenu
              class="mr-2 w-44"
              v-model="selectedCategory"
              :options="categories"
            />
          </div>
          <div class="mr-2 w-full">
            <h3>Теги</h3>
            <UInputMenu v-model="selectedTag" :options="tags" />
          </div>
        </div>
      </div>
    </div>

    <!-- --------------------------------ИНГРИДИЕНТЫ-------------------------------- -->

    <UDivider class="py-4" label="ИНГРИДИЕНТЫ" size="sm" />

    <div>
      <div v-if="ingredients.length > 0" class="mb-4">
        <h3>Добавленные ингредиенты:</h3>
        <ul>
          <li v-for="(ingredient, index) in ingredients" :key="index">
            {{ ingredient.title }} - {{ ingredient.count }}
            {{ ingredient.amount }} - {{ ingredient.product[0].label }}
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

        <!-- --------------------------------ПОИСК ПРОДУКТОВ-------------------------------- -->

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
          >
            <template #empty-state>
              <div class="flex flex-col items-center justify-center py-6 gap-3">
                <span class="italic text-sm"
                  >Добавте основной продукт<br />Затем добавте несколько похожих
                  продуктов</span
                >
                <UButton label="Найти продукты" />
              </div>
            </template>
            <template
              #action-command="{ command }"
              style="display: flex; justify-content: center"
            >
              <div class="flex justify-center w-screen">
                <UButton :label="command.label" @click="handleAddProducts" />
              </div>
            </template>
          </UCommandPalette>
        </UModal>

        <UButton label="Добавить ингредиент" @click.prevent="addIngredient" />
      </div>
    </div>
    <UButton label="Сохранить" @click="addRecipe" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

definePageMeta({
  layout: "content",
});

// --------------------------------ИЗОБРОЖЕНИЕ--------------------------------

const fileInput = ref(null);
const isUploading = ref(false);
const errorMessage = ref("");
const uploadedImageUrl = ref("");

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file);
  }
};

const uploadFile = async (file) => {
  isUploading.value = true;
  errorMessage.value = "";
  uploadedImageUrl.value = "";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await $fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (response.success) {
      console.log("Файл успешно загружен:", response.fileUrl);
      uploadedImageUrl.value = response.fileUrl;
    } else {
      throw new Error(
        response.message || "Неизвестная ошибка при загрузке файла"
      );
    }
  } catch (error) {
    console.error("Ошибка при загрузке файла:", error);
    errorMessage.value = error.message || "Произошла ошибка при загрузке файла";
  } finally {
    isUploading.value = false;
  }
};

// --------------------------------ОПИСАНИЕ РЕЦЕПТА--------------------------------
const title = ref("");
const description = ref("");
const cookTimeMinutes = ref(0);
const prepTimeMinutes = ref(0);
const preliminaryPreparation = ref("");
const selectedCategory = ref("Выберите категорию");
const categories = ref([]);
const selectedTag = ref(
  "Выберите несколько тегов которые лучше всего опишут блюдо"
);
const tags = ref([]);
const servings = ref(0);
const difficulty = ["Легкий", "Средний", "Сложный"];
const selectedDifficulty = ref(difficulty[0]);
const amountOptions = ["кг.", "гр.", "л.", "мл.", "шт."];

const fetchData = async () => {
  try {
    const response = await fetch("/api/recipes/categories");
    if (!response.ok) {
      throw new Error("Ошибка сети");
    }
    const data = await response.json();
    categories.value = data.categories.map((category) => ({
      value: category.id,
      label: category.name,
    }));
    tags.value = data.tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));
  } catch (error) {
    console.error("Ошибка получения данных:", error);
  }
};
onMounted(fetchData);

// --------------------------------ИНГРИДИЕНТЫ--------------------------------
const ingredients = ref([]);
const newIngredient = ref({ title: "", count: 0, amount: "кг.", product: "" });
function addIngredient() {
  if (newIngredient.value.title && newIngredient.value.count) {
    ingredients.value.push({ ...newIngredient.value });
    newIngredient.value = { title: "", count: "", amount: "кг." };
  }
  console.log("Добавление ингредиента");
  console.log(ingredients);
}

// --------------------------------ПРОДУКТЫ--------------------------------
const isOpen = ref(false);
const commandPaletteRef = ref();
const mainProduct = ref([]);
const similarProducts = ref([]);

const actions = [
  {
    id: "add-products",
    label: "Добавить продукты",
    action: true, // Это важно!
  },
];
const groups = computed(() =>
  [
    commandPaletteRef.value?.query
      ? {
          key: "products",
          label: (q) => q && `Найденные продукты “${q}”...`,
          search: async (q) => {
            if (!q) {
              return [];
            }

            try {
              const products = await $fetch("/api/products/search", {
                params: { q },
              });

              return products.map((product) => ({
                id: product.id,
                label: product.title,
                suffix: product.price
                  ? `${Math.floor(product.price)} ₽`
                  : "нет цены",
                click: () => {
                  if (mainProduct.value.length > 0) {
                    similarProducts.value.push({
                      id: product.id,
                      label: product.title,
                      suffix: product.price
                        ? `${Math.floor(product.price)} ₽`
                        : "нет цены",
                    });
                  } else {
                    mainProduct.value.push({
                      id: product.id,
                      label: product.title,
                      suffix: product.price
                        ? `${Math.floor(product.price)} ₽`
                        : "нет цены",
                    });
                  }
                },
              }));
            } catch (error) {
              console.error("Ошибка при выполнении поиска продуктов:", error);
              return [];
            }
          },
        }
      : [],
    ...(mainProduct.value.length > 0
      ? [
          {
            key: "product",
            label: "Основной продукт",
            commands: mainProduct.value,
          },
        ]
      : []),
    ...(similarProducts.value.length > 0
      ? [
          {
            key: "similarProducts",
            label: "Похожие продукты",
            commands: similarProducts.value,
          },
        ]
      : []),
    ...(mainProduct.value.length > 0
      ? [
          {
            key: "action",
            commands: actions,
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
const handleAddProducts = () => {
  newIngredient.value.product = mainProduct.value;
  allProducts.push({
    mainProductId: mainProduct.value[0].id,
    similarProductsIds: similarProducts.value.map((product) => product.id),
  });
  isOpen.value = false;
  mainProduct.value = [];
  similarProducts.value = [];
};

// --------------------------------BODY--------------------------------
const addRecipe = () => {
  const body = {
    title: title.value,
    description: description.value,
    ingredients: ingredients.value,
    instructions: "",
    prepTimeMinutes: prepTimeMinutes.value,
    cookTimeMinutes: cookTimeMinutes.value,
    preliminaryPreparation: preliminaryPreparation.value,
    servings: servings.value,
    difficulty: selectedDifficulty.value,
    categories: selectedCategory.value,
    cuisine: "",
    tags: selectedTag.value,
    image: uploadedImageUrl.value,
    datePublished: "",
  };
  console.log("Body");
  console.log(body);
};

// --------------------------------ПОДГОТОВКА ДАННЫХ--------------------------------
let allProducts = [];
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
.ml-2 {
  margin-left: 0.5rem;
}
.file-upload-container {
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>
