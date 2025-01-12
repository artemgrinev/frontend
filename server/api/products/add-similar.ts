import { db } from "~/server/db";

export default defineEventHandler(async (event) => {
  try {
    const { products } = await readBody(event);

    if (!Array.isArray(products) || products.length === 0) {
      throw createError({
        statusCode: 400,
        message: `Неверный формат данных. Полученные данные: ${JSON.stringify(
          products
        )}`,
      });
    }

    const updatedProducts = await Promise.all(
      products.map(async ({ productId, similarProductIds }) => {
        if (!productId || !Array.isArray(similarProductIds)) {
          throw createError({
            statusCode: 400,
            message: `Неверный формат данных для продукта с id ${productId}.`,
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

        return updatedProduct;
      })
    );

    return {
      message: "Похожие продукты успешно добавлены",
      products: updatedProducts,
    };
  } catch (error) {
    console.error("Ошибка при добавлении похожих продуктов:", error);
    throw createError({
      statusCode: 500,
      message: "Внутренняя ошибка сервера",
    });
  }
});
