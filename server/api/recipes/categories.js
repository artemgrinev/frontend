import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.recipeCategory.findMany();
    const tags = await prisma.recipeTag.findMany();

    return {
      categories,
      tags,
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
