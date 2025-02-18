import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.recipeCategory.findMany();
    const tags = await prisma.recipeTag.findMany();
    const cuisines = await prisma.cuisine.findMany();

    return {
      categories,
      tags,
      cuisines,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка получения данных",
      details: {
        message: error.message,
      },
    });
  }
});
