import { PrismaClient } from "@prisma/client";
import serverLogger from "~/server/utils/logger";
import { sendError } from "h3";
import { z } from "zod";
import { ZodError } from "zod";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;

  serverLogger.info({ recipeId: id, message: "Запрос рецепта" });

  try {
    z.number().positive().parse(Number(id));
    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
      include: {
        ingredients: {
          include: {
            mainProduct: { include: { similarProducts: true } },
          },
        },
        instructions: true,
        tags: true,
        category: true,
        cuisine: true,
      },
    });

    if (!recipe) {
      const notFoundError = createError({
        statusCode: 404,
        statusMessage: "Recipe not found",
        data: {
          field: "id",
        },
      });
      sendError(event, notFoundError);
      serverLogger.info({ recipeId: id, message: "Рецепт не найден" });
      return;
    }

    return recipe;
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = createError({
        statusCode: 404,
        statusMessage: "Validation Error",
        data: {
          field: "id",
        },
      });
      sendError(event, validationError);
      serverLogger.info({ recipeId: id, message: "Ошибка валидации рецепта" });
    } else {
      const trace = (error as Error).stack || "No stack trace available";
      const parseTrace = trace.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
      const internalServerError = createError({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
      sendError(event, internalServerError);
      serverLogger.error({
        message: "Server error",
        metod: "get recipe by id",
        detail: { data: { recipeID: id, error, trace: parseTrace } },
      });
    }
  } finally {
    await prisma.$disconnect();
  }
});
