export const addAllSimilarProducts = async (productsArray) => {
  const results = [];

  for (const product of productsArray) {
    const { productId, similarProductIds } = product; // Извлекаем productId и similarProductIds
    console.log(productId, similarProductIds);
    try {
      const response = await addSimilarProducts(productId, similarProductIds);
      results.push({ productId, message: response.message }); // Сохраняем успешные результаты
    } catch (error) {
      console.error(
        `Ошибка при добавлении похожих продуктов для продукта ${productId}:`,
        error
      );
      results.push({ productId, error: error.message }); // Сохраняем ошибку
    }
  }

  return results; // Возвращаем массив результатов
};
