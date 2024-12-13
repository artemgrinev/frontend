export const addSimilarProducts = async (productId, similarProductIds) => {
  try {
    const response = await $fetch("/api/products/add-similar", {
      method: "POST",
      body: {
        productId,
        similarProductIds,
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
