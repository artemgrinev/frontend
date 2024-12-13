export const addRecipe = async (recipeData) => {
  try {
    const response = await fetch("/api/recipes/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка при добавлении рецепта");
    }

    const newRecipe = await response.json();
    return newRecipe;
  } catch (error) {
    console.error("Ошибка при добавлении рецепта:", error);
    throw error;
  }
};
