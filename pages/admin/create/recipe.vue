<template>
  <div>
    <div class="flex mb-4">
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
            <USelectMenu v-model="selectedDifficulty" :options="difficulty" />
          </div>
        </div>
        <div class="flex justify-between">
          <div>
            <h3>Порции</h3>
            <UInput class="mr-2 w-16" v-model="servings" type="number" />
          </div>
          <div>
            <h3>Категория</h3>
            <UInputMenu
              class="mr-2 w-40"
              v-model="selectedCategory"
              :options="categories"
            />
          </div>
          <div class="mr-2 w-full">
            <h3>Теги</h3>
            <UInputMenu v-model="selectedTag" :options="tags" multiple />
          </div>
          <div class="w-56">
            <h3>Кухня</h3>
            <USelectMenu v-model="selectedCuisine" :options="cuisines" />
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
            {{ ingredient.amount }} - {{ ingredient.product.label }}
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

        <UButton class="mr-3" label="Выбрать продукт" @click="isOpen = true" />
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
    <!-- --------------------------------ИНСТРУКЦИЯ-------------------------------- -->
    <UDivider class="py-4" label="ИНСТРУКЦИЯ" size="sm" />
    <div v-if="instructions.length > 0" class="mb-4">
      <ul>
        <li
          class="flex mb-3"
          v-for="(step, index) in instructions"
          :key="index"
        >
          <NuxtImg
            class="object-cover rounded-xl"
            width="256"
            height="170"
            fit="cover"
            :src="step.image"
          />
          <div class="flex flex-col md:pl-6 p-3 leading-normal">
            <h5 class="mb-2 text-2xl font-semibold tracking-tight">
              Шаг {{ step.stepNumber }}
            </h5>
            <p class="mb-3 font-normal">
              {{ step.title }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex mb-4">
      <BaseImageUpload size="sm" @image-uploaded="handleImageUploaded" />
      <div class="flex-col w-full">
        <h3>Описание</h3>
        <UTextarea
          class="mb-4 w-full"
          v-model="newStep.title"
          :ui="{ base: 'h-wull' }"
        />
        <div class="flex justify-end">
          <UButton label="Добавить" @click.prevent="addStep" />
        </div>
      </div>
    </div>
    <UDivider class="py-4" label="ЗАВЕРШЕНИЕ" size="sm" />
    <div class="flex justify-center">
      <UButton
        class="px-16"
        label="Сохранить"
        size="lg"
        @click="addRecipeWithProducts"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { addRecipe } from "~/utils/addRecipe";
import { addAllSimilarProducts } from "~/utils/addAllSimilarProducts";

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
const selectedCuisine = ref("");
const cuisines = ref([]);
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
      id: category.id,
      label: category.name,
    }));
    tags.value = data.tags.map((tag) => ({
      id: tag.id,
      label: tag.name,
    }));
    cuisines.value = data.cuisines.map((cuisine) => ({
      id: cuisine.id,
      label: cuisine.name,
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
    newIngredient.value = { title: "", count: "", amount: "кг.", product: "" };
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
  newIngredient.value.product = mainProduct.value[0];
  allProducts.push({
    productId: mainProduct.value[0].id,
    similarProductIds: similarProducts.value.map((product) => product.id),
  });
  isOpen.value = false;
  mainProduct.value = [];
  similarProducts.value = [];
  console.log("similarProducts");
  console.log(allProducts);
};
// --------------------------------STEPS-------------------------------
const handleImageUploaded = (url) => {
  newStep.value.image = url;
};
const newStep = ref({ title: "", image: "", stepNumber: 0 });
const instructions = ref([]);
let stepNumber = 1;
const addStep = () => {
  if (newStep.value.title && newStep.value.image) {
    newStep.value.stepNumber = stepNumber;
    instructions.value.push({ ...newStep.value });
    newStep.value = { title: "", image: "", stepNumber: 0 };
    stepNumber += 1;
  }
  console.log("Добавление steps");
  console.log(instructions);
};
// --------------------------------BODY--------------------------------
let allProducts = [];

const addRecipeWithProducts = async () => {
  const ingredientsArray = ingredients.value.map((ingredient) => ({
    title: ingredient.title,
    amount: ingredient.amount,
    count: ingredient.count,
    mainProductId: ingredient.product.id,
  }));
  const instructionsArray = instructions.value.map((step) => ({
    title: step.title,
    image: step.image,
    stepNumber: step.stepNumber,
  }));
  const tagsArray = selectedTag.value.map((tag) => {});
  const body = {
    title: title.value,
    description: description.value,
    ingredients: ingredientsArray,
    instructions: instructionsArray,
    prepTimeMinutes: prepTimeMinutes.value,
    cookTimeMinutes: cookTimeMinutes.value,
    preliminaryPreparation: preliminaryPreparation.value,
    servings: servings.value,
    difficulty: selectedDifficulty.value,
    categoryId: selectedCategory.value.id,
    cuisineId: selectedCuisine.value.id,
    tags: selectedTag.value,
    image: uploadedImageUrl.value,
  };
  console.log("Body");
  console.log(body);
  console.log("allProducts перед отправкой:", allProducts);

  try {
    const newRecipe = await addRecipe(body);
    console.log("Рецепт успешно добавлен:", newRecipe);

    // Здесь можно добавить логику для очистки формы или отображения сообщения об успехе
  } catch (error) {
    console.error("Ошибка при добавлении рецепта:", error);
  }

  try {
    console.log("allProducts перед отправкой:", allProducts);
    const results = await addAllSimilarProducts(allProducts);
    message.value = "Похожие продукты успешно добавлены!"; // Успешное сообщение
    console.log("Результаты добавления:", results);
  } catch (error) {
    message.value = "Произошла ошибка при добавлении похожих продуктов.";
    console.error(error);
  }
};
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
