import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  const { q } = getQuery(event); // Извлечение параметра q из запроса

  // Проверка на наличие q
  if (!q || typeof q !== "string") {
    return []; // Если q не указан, возвращаем пустой массив
  }

  try {
    // Поиск продуктов по title
    const products = await db.product.findMany({
      where: {
        title: {
          contains: q, // Неточный поиск по полю title
          mode: "insensitive", // Игнорировать регистр (опционально)
        },
      },
      include: {
        similarProducts: true, // Включение похожих продуктов (если нужно)
      },
    });

    return products; // Возврат найденных продуктов
  } catch (error) {
    console.error("Ошибка при поиске продуктов:", error);
    throw createError({
      statusCode: 500,
      message: "Ошибка при поиске продуктов",
    });
  }
});
