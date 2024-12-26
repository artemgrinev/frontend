import { PrismaClient } from "@prisma/client";
import { recipeSchema } from "../../validation/recipeSchema";
import { transliterate } from "~/utils/transliterate";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const validatedData = recipeSchema.parse(body);

    const newRecipe = await prisma.recipe.create({
      data: {
        title: validatedData.title,
        url: transliterate(body.title),
        description: validatedData.description,
        prepTimeMinutes: validatedData.prepTimeMinutes,
        cookTimeMinutes: validatedData.cookTimeMinutes,
        preliminaryPreparation: validatedData.preliminaryPreparation || "",
        servings: validatedData.servings || 1,
        difficulty: validatedData.difficulty || "Легко",
        image: validatedData.image || "",
        caloriesPerServing: validatedData.caloriesPerServing || null,
        datePublished: new Date(),
        categoryId: validatedData.categoryId,
        cuisineId: validatedData.cuisineId,

        ingredients: {
          create: validatedData.ingredients.map((ingredient) => ({
            title: ingredient.title,
            count: ingredient.count,
            amount: ingredient.amount,
            mainProductId: ingredient.mainProductId || null,
          })),
        },

        instructions: {
          create: validatedData.instructions.map((instruction) => ({
            title: instruction.title,
            image: instruction.image || null,
            stepNumber: instruction.stepNumber,
          })),
        },

        tags: {
          connectOrCreate: validatedData.tags.map((tag) => ({
            where: { name: tag.name },
            create: { name: tag.name },
          })),
        },
      },
    });

    return {
      statusCode: 201,
      body: newRecipe,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        statusCode: 400,
        body: {
          message: "Ошибка валидации",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
      };
    }

    console.error("Ошибка при добавлении рецепта:", error);
    return {
      statusCode: 500,
      body: { message: "Ошибка при добавлении рецепта" },
    };
  }
});
