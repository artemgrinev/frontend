import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;

  if (!id) {
    throw createError({ statusCode: 400, message: "ID не указан" });
  }

  try {
    // Поиск продукта по ID
    const product = await db.product.findUnique({
      where: { id: Number(id) },
      include: {
        similarProducts: true,
      },
    });

    if (!product) {
      throw createError({ statusCode: 404, message: "Продукт не найден" });
    }

    return product;
  } catch (error) {
    console.error("Ошибка при получении продукта:", error);
    throw createError({
      statusCode: 500,
      message: "Ошибка при получении продукта",
    });
  }
});
