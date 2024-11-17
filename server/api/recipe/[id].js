import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  console.log(id);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
      include: {
        ingredients: true,
        instructions: true,
        tags: {
          include: {
            tag: true,
          },
        },
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!recipe) {
      throw createError({ statusCode: 404, statusMessage: "Рецепт не найден" });
    }

    return recipe;
  } catch (error) {
    console.error("Ошибка при получении рецепта:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка при получении рецепта",
    });
  } finally {
    await prisma.$disconnect();
  }
});
