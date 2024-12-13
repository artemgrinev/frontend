import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const { productId, similarProductIds } = await readBody(event);

    if (!productId || !Array.isArray(similarProductIds)) {
      throw createError({
        statusCode: 400,
        message: `Неверный формат данных. Полученные данные: productId = ${productId}, similarProductIds = ${JSON.stringify(
          similarProductIds
        )}`,
      });
    }

    const updatedProduct = await db.product.update({
      where: { id: productId },
      data: {
        similarProducts: {
          connect: similarProductIds.map((id) => ({ id })),
        },
        similarTo: {
          connect: similarProductIds.map((id) => ({ id })),
        },
      },
      include: {
        similarProducts: true,
        similarTo: true,
      },
    });

    // Устанавливаем обратные связи
    await db.$transaction(
      similarProductIds.map((id) =>
        db.product.update({
          where: { id },
          data: {
            similarProducts: {
              connect: { id: productId },
            },
            similarTo: {
              connect: { id: productId },
            },
          },
        })
      )
    );

    return {
      message: "Похожие продукты успешно добавлены",
      product: updatedProduct,
    };
  } catch (error) {
    console.error("Ошибка при добавлении похожих продуктов:", error);
    throw createError({
      statusCode: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
});
