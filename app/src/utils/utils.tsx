import { Recipe, Ingredient, Day } from "../types/types";

export const getRecipeName = (recipes: Recipe[], recipeId: string) => {
  return recipes.find((recipe) => recipe._id === recipeId)?.name || 'Unknown Recipe';
};

export const getIngredientNames = (
  recipe: Recipe,
  ingredients: Ingredient[]
): string[] => {
  return recipe.ingredientQuantities.map((ingredientQuantity) => {
    const ingredient = ingredients.find((ingredient) => ingredient._id === ingredientQuantity.ingredientId);
    return ingredient ? ingredient.name : "Unknown Ingredient";
  });
};

export const getIngredientIdFromName = (ingredients: Ingredient[], name: string): string | null => {
  const ingredient = ingredients.find(
    (ingredient) => ingredient.name.toLowerCase() === name.toLowerCase()
  );
  return ingredient ? ingredient._id || null : null;
};

export const getUniqueIngredients = (
  days: Day[],
  recipes: Recipe[],
  ingredients: Ingredient[]
): Ingredient[] => {
  const ingredientIdsSet = new Set<string>(); // unique ingredient ids

  days.forEach((day) => {
    day.recipeIds.forEach((recipeId) => {
      const recipe = recipes.find((r) => r._id === recipeId);
      if (recipe) {
        recipe.ingredientQuantities.forEach((iq) => {
          ingredientIdsSet.add(iq.ingredientId);
        });
      }
    });
  });

  // Map the unique ingredient IDs to Ingredient objects
  const uniqueIngredients = Array.from(ingredientIdsSet).map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  // Filter out any undefined ingredients in case an id doesn't match
  return uniqueIngredients.filter((ingredient): ingredient is Ingredient => !!ingredient);
};

export const sortAlphabetically = <T extends { name: string }>(data: T[]): T[] =>
  [...data].sort((a, b) => a.name.localeCompare(b.name));