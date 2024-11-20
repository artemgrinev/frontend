import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();

async function importData() {
  try {
    const rawDataMagnit = await fs.readFile("magnit-products.json", "utf-8");
    const productDataMagnit = JSON.parse(rawDataMagnit);

    const rawDataVprok = await fs.readFile("vprok-products.json", "utf-8");
    const productDataVprok = JSON.parse(rawDataVprok);

    const allProductData = [...productDataMagnit, ...productDataVprok];

    const shopsToInsert = [
      {
        id: 1,
        name: "Магнит",
        url: "https://magnit.ru/",
        icon: "blutce/magnit-logo.jpg",
      },
      {
        id: 2,
        name: "Перекрёсток",
        url: "https://www.perekrestok.ru/",
        icon: "blutce/perekrestok-logo.png",
      },
      {
        id: 3,
        name: "Пятёрочка",
        url: "https://5ka.ru/",
        icon: "blutce/5k-logo.png",
      },
    ];

    await prisma.shop.createMany({
      data: shopsToInsert,
      skipDuplicates: true,
    });

    console.log("Данные о магазинах успешно импортированы");

    const uniqueProductData = Array.from(
      new Map(allProductData.map((product) => [product.id, product])).values()
    );

    const formattedProductData = uniqueProductData.map((product) => ({
      ...product,
      id: parseInt(product.id),
      weight: parseInt(product.weight),
    }));

    const products = await prisma.product.createMany({
      data: formattedProductData,
      skipDuplicates: true,
    });

    console.log(`${products.count} продукта успешно импортированы`);
  } catch (error) {
    console.error("Ошибка при импорте данных:", error);
  } finally {
    await prisma.$disconnect();
  }
}

importData();
