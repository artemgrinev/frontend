import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function importData() {
  const rawData = await fs.readFile("recipe.json", "utf-8");
  const recipeData = JSON.parse(rawData);

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        prepTimeMinutes: recipeData.prepTimeMinutes,
        cookTimeMinutes: recipeData.cookTimeMinutes,
        servings: recipeData.servings,
        difficulty: recipeData.difficulty,
        cuisine: recipeData.cuisine,
        caloriesPerServing: recipeData.caloriesPerServing,
        image: recipeData.image,
        rating: recipeData.rating,
        reviewCount: recipeData.reviewCount,
        viewCount: recipeData.viewCount,
        datePublished: new Date(recipeData.datePublished),
        ingredients: {
          create: recipeData.ingredients.map((ing) => ({
            name: ing.name,
            count: ing.count,
          })),
        },
        instructions: {
          create: recipeData.instructions.map((inst, index) => ({
            title: inst.title,
            image: inst.image,
            stepNumber: index + 1,
          })),
        },
        tags: {
          create: recipeData.tags.map((tag) => ({
            tag: {
              connectOrCreate: { where: { name: tag }, create: { name: tag } },
            },
          })),
        },
        products: {
          create: recipeData.products.map((prod) => ({
            product: {
              create: {
                shopName: prod.shopName,
                url: prod.url,
                title: prod.title,
                price: prod.price,
                discountPercentage: prod.discountPercentage,
                rating: prod.rating,
                weight: prod.weight,
                amount: prod.amount,
                minimumOrderQuantity: prod.minimumOrderQuantity,
                thumbnail: prod.thumbnail,
              },
            },
          })),
        },
      },
    });

    console.log("Данные успешно импортированы");
  } catch (error) {
    console.error("Ошибка при импорте данных:", error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
