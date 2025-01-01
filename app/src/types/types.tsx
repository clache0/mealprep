export interface Day {
  _id?: string;
  name: string;
  recipeIds: string[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  // todo add category to ingredient
}

export interface Recipe {
  _id?: string;
  name: string;
  notes?: string;
  ingredientQuantities: IngredientQuantities[];
  emoji?: string;
  // todo add category to recipe
}

export interface IngredientQuantities {
  ingredientId: string;
  quantity: string;
}