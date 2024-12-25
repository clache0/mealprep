import React from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeCardLarge.css";
import { getIngredientNames } from "../../utils/utils";

interface RecipeCardLargeProps {
  recipeId: string;
  onClose: () => void;
}

const RecipeCardLarge: React.FC<RecipeCardLargeProps> = ({ recipeId, onClose }) => {
  const { recipes, ingredients } = useAppData();
  const recipe = recipes.find((recipe) => recipe._id === recipeId);

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  const recipeIngredientNames = getIngredientNames(recipe, ingredients);

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
        <h3>Ingredients:</h3>
        <ul>
          {recipeIngredientNamesList}
        </ul>
      </div>
    </div>
  );
};

export default RecipeCardLarge;
