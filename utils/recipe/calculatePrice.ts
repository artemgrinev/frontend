import { gramsPerUnit } from "./measurementUnits";
import type { Ingredient } from "./schemas";

export function calcProducts(ingredients: Ingredient[]): number {
  return ingredients.reduce((total, i) => {
    let productCost = 0;
    const mainProductAmount = i.mainProduct.amount.replace(".", "");
    const ingredientAmount = i.amount.replace(".", "");

    if (i.mainProduct.pack) {
      // Если продукт в упаковке и его вес в кг или лт, а ингредиент в шт.
      if (
        (mainProductAmount === "кг" || mainProductAmount === "лт") &&
        ingredientAmount === "шт"
      ) {
        productCost =
          i.mainProduct.price *
          Math.ceil((i.count * gramsPerUnit) / (i.mainProduct.weight * 1000));
        console.log(
          "Если продукт в упаковке и его вес в кг или лт, а ингредиент в шт."
        );
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      } else if (
        // Если продукт в упаковке и его вес в гр или мл, а ингредиент в шт.
        (mainProductAmount === "гр" ||
          mainProductAmount === "мл" ||
          mainProductAmount === "г") &&
        ingredientAmount === "шт"
      ) {
        productCost =
          i.mainProduct.price *
          Math.ceil((i.count * gramsPerUnit) / i.mainProduct.weight);
        console.log(
          "Если продукт в упаковке и его вес в гр или мл, а ингредиент в шт."
        );
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      } else if (
        // Если продукт в упаковке по штучно, а ингредиент в шт.
        mainProductAmount === "шт" &&
        ingredientAmount === "шт"
      ) {
        productCost =
          i.mainProduct.price * Math.ceil(i.count / i.mainProduct.weight);
        console.log("Если продукт в упаковке по штучно, а ингредиент в шт.");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      }
    } else if (ingredientAmount === "шт") {
      // Если ингридиент в шт, а продукт в кг ил лт
      if (mainProductAmount === "кг" || mainProductAmount === "лт") {
        productCost =
          i.mainProduct.price *
          Math.ceil((i.count * gramsPerUnit) / (i.mainProduct.weight * 1000));
        console.log("Если ингридиент в шт, а продукт в кг ил лт");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      } else if (
        // Если ингридиент в шт, а продукт в гр ил мл
        mainProductAmount === "гр" ||
        mainProductAmount === "мл" ||
        mainProductAmount === "г"
      ) {
        productCost =
          (i.mainProduct.price * (i.count * gramsPerUnit)) /
          i.mainProduct.weight;
        console.log("Если ингридиент в шт, а продукт в гр ил мл");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      } else {
        // Если ингридиент в шт и продукт шт
        productCost =
          i.mainProduct.price * Math.ceil(i.count / i.mainProduct.weight);
        console.log("Если ингридиент в шт и продукт шт");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      }
    } else if (
      ingredientAmount === "гр" ||
      ingredientAmount === "мл" ||
      ingredientAmount === "г"
    ) {
      // Если ингридиент в гр, мл, г а продукт в кг ил лт
      if (mainProductAmount === "кг" || mainProductAmount === "лт") {
        productCost =
          (i.mainProduct.price / (i.mainProduct.weight * 1000)) * i.count;
        console.log("Если ингридиент в гр, мл, г а продукт в кг ил лт");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      } else {
        // Если ингридиент и продукт в одном измерение
        productCost = i.mainProduct.price * i.count;
        console.log("Если ингридиент и продукт в одном измерение");
        console.log(`${i.title}: ${i.count} ${i.amount} price: ${productCost}`);
      }
    }

    return total + productCost;
  }, 0);
}
