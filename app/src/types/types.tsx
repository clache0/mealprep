export interface Day {
  _id?: string;
  name: string;
  recipeIds: string[];
}

export interface Ingredient {
  _id?: string;
  name: string;
  isOwned: boolean;
  // todo add category to ingredient
}

export enum RecipeCategory {
  Undecided = "Undecided",
  Beef = "Beef",
  Chicken = "Chicken",
  Pork = "Pork",
  Fish = "Fish",
  Pasta = "Pasta",
  Soup = "Soup",
  Salad = "Salad",
  Veggies = "Veggies",
  Spices = "Spices",
}

export interface Recipe {
  _id?: string;
  name: string;
  notes?: string;
  ingredientQuantities: IngredientQuantities[];
  emoji?: string;
  category: RecipeCategory;
}

export interface IngredientQuantities {
  ingredientId: string;
  quantity: string;
}