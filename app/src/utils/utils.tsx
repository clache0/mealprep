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