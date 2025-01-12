import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, { message: "Заголовок обязателен" }),
  description: z.string().min(1, { message: "Описание обязательно" }),
  prepTimeMinutes: z
    .number()
    .min(0, { message: "Время подготовки должно быть положительным" }),
  cookTimeMinutes: z
    .number()
    .min(0, { message: "Время приготовления должно быть положительным" }),
  preliminaryPreparation: z.string().optional(),
  servings: z
    .number()
    .min(1, { message: "Количество порций должно быть положительным" })
    .optional(),
  difficulty: z.string().optional(),
  image: z.string().url({ message: "Некорректный URL изображения" }).optional(),
  caloriesPerServing: z.number().optional(),
  categoryId: z
    .number()
    .int({ message: "ID категории должен быть целым числом" }),
  cuisineId: z.number().int({ message: "ID кухни должен быть целым числом" }),
  ingredients: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Имя ингредиента обязательно" }),
        count: z.number().int().optional(),
        amount: z.string(),
        mainProductId: z.number().int().optional(),
      })
    )
    .nonempty({ message: "Список ингредиентов не может быть пустым" }),
  instructions: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, { message: "Название инструкции обязательно" }),
        image: z.string().url().optional(),
        stepNumber: z
          .number()
          .int({ message: "Номер шага должен быть целым числом" })
          .min(1),
      })
    )
    .nonempty({ message: "Список инструкций не может быть пустым" }),
  tags: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Имя тега обязательно" }),
      })
    )
    .optional(),
});
