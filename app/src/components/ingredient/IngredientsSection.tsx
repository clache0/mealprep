import React from "react";
import "../../styles/components/ingredient/IngredientsSection.css";
import { Ingredient } from "../../types/types";

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ ingredients }) => {
  const ingredientItems = ingredients.map((ingredient) => (
    <li key={ingredient._id || ingredient.name}>{ingredient.name}</li>
  ));

  return (
    <div className="ingredients-section">
      <h3>Ingredients</h3>
      <ul className="ingredients-list">
        {ingredients.length > 0 ? ingredientItems : <p>No ingredients available.</p>}
      </ul>
    </div>
  );
};

export default IngredientsSection;