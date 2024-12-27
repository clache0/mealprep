import { Recipe, Ingredient } from "../types/types";

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