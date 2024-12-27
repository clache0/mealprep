import React, { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeCardLarge.css";
import { getIngredientIdFromName, getIngredientNames } from "../../utils/utils";
import { Ingredient, IngredientQuantities } from "../../types/types";
import AddIngredientToRecipeForm from "../ingredient/AddIngredientToRecipeForm";
import Button from "../general/Button";

interface RecipeCardLargeProps {
  recipeId: string;
  onClose: () => void;
}

const RecipeCardLarge: React.FC<RecipeCardLargeProps> = ({ recipeId, onClose }) => {
  const { recipes, ingredients, addIngredient, updateRecipe } = useAppData();
  const [showAddIngredientToRecipeForm, setShowAddIngredientToRecipeForm] = useState<boolean>(false);
  const [recipeIngredientNames, setRecipeIngredientNames] = useState<string[]>([]);
  const recipe = recipes.find((recipe) => recipe._id === recipeId);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  const handleAddIngredient = async (newIngredient: Ingredient, quantity: string) => {
    const existingIngredientId = getIngredientIdFromName(ingredients, newIngredient.name);
    let ingredientId: string = "";

    // if ingredient does not exist, add to context
    if(!existingIngredientId) {
      ingredientId = await addIngredient(newIngredient);
    }
    else {
      ingredientId = existingIngredientId;
    }

    const updatedIngredientQuantities: IngredientQuantities[] = [
      ...recipe.ingredientQuantities,
      { ingredientId, quantity },
    ];
    updateRecipe(recipeId,
      { 
        ...recipe,
        ingredientQuantities: updatedIngredientQuantities
      }
    ); // update context
  };

  // update recipeIngredientNames when ingredients or recipe.ingredientQuantities changes
  useEffect(() => {
    const names = getIngredientNames(recipe, ingredients);
    setRecipeIngredientNames(names);
  }, [ingredients, recipe.ingredientQuantities]);

  const recipeIngredientNamesList = recipeIngredientNames ? 
    recipeIngredientNames.map((ingredientName, index) => (
      <li key={index}>
        {ingredientName}
      </li>
    )) : null;

  return (
    <div className="recipe-card-large-backdrop">
      <div className="recipe-card-large">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{recipe.name}</h2>

        <Button
          label="Add Ingredient"
          onClick={() => setShowAddIngredientToRecipeForm(true)}
        />
        {showAddIngredientToRecipeForm &&
        <AddIngredientToRecipeForm
          onSubmit={handleAddIngredient}
          onShowForm={setShowAddIngredientToRecipeForm}
        />}

        <h3>Ingredients:</h3>
        <ul>
          {recipeIngredientNamesList}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCardLarge;
