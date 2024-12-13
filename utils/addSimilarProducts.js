export const addSimilarProducts = async (products) => {
  try {
    const response = await $fetch("/api/products/add-similar", {
      method: "POST",
      body: {
        products,
      },
    });

    if (!response || response.error) {
      throw new Error(
        response.message || "Ошибка при добавлении похожих продуктов"
      );
    }

    return response;
  } catch (error) {
    console.error("Ошибка при добавлении похожих продуктов:", error);
    throw error;
  }
};
