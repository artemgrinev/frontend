<template>
  <div class="file-upload-container flex-shrink-0 mr-3">
    <UButton
      :class="buttonClasses"
      class="flex flex-col items-center justify-center"
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
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits();
const props = defineProps({
  size: {
    type: String,
    default: "sm",
  },
});

const fileSelected = ref(false);

const buttonClasses = computed(() => {
  const baseClasses = fileSelected.value ? "text-green-500" : "text-cool-500";

  switch (props.size) {
    case "md":
      return `${baseClasses} w-80 h-80`;
    case "sm":
    default:
      return `${baseClasses} w-40 h-40`;
  }
});

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
    fileSelected.value = true;
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
      emit("image-uploaded", uploadedImageUrl.value);
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
</script>

<style scoped>
.file-upload-container {
  border: 2px dashed #ccc;
  border-radius: 8px;
  overflow: hidden;
}
</style>
