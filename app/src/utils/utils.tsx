import { Recipe } from "../types/types";

export const getRecipeName = (recipes: Recipe[], recipeId: string) => {
  return recipes.find((recipe) => recipe._id === recipeId)?.name || 'Unknown Recipe';
};