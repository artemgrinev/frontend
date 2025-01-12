import { db } from "~/server/db";
import serverLogger from "~/server/utils/logger";
import { sendError } from "h3";
import { z } from "zod";
import { ZodError } from "zod";

export default defineEventHandler(async (event) => {
  const params = event.context.params as Record<string, string>;
  const id = params.id;
  serverLogger.info({ productId: id, message: "Запрос продукта" });

  try {
    z.number().positive().parse(Number(id));
    const product = await db.product.findUnique({
      where: { id: Number(id) },
      include: {
        similarProducts: true,
      },
    });

    if (!product) {
      const notFoundError = createError({
        statusCode: 404,
        statusMessage: "Product not found",
        data: {
          id: id,
        },
      });
      sendError(event, notFoundError);
      serverLogger.info({ productId: id, message: "Продукт не найден" });
      return;
    }
    return product;
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = createError({
        statusCode: 404,
        statusMessage: "Validation Error",
        data: {
          field: "id",
          data: id,
        },
      });
      sendError(event, validationError);
      serverLogger.info({ productId: id, message: "Ошибка валидации" });
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
        metod: "get product by id",
        detail: { data: { productID: id, error, trace: parseTrace } },
      });
    }
  } finally {
    await db.$disconnect();
  }
});
