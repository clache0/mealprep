export interface Day {
  _id?: string;
  name: string;
  recipeIds: string[];
}

export interface Ingredient {
  _id?: string;
  name: string;
}

export interface Recipe {
  _id?: string;
  name: string;
  notes?: string;
  ingredientQuantities: IngredientQuantities[];
}

export interface IngredientQuantities {
  ingredientId: string;
  quantity: string;
}