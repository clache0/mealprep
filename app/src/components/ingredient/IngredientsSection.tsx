import React from "react";
import "../../styles/components/ingredient/IngredientsSection.css";
import { Ingredient } from "../../types/types";
import { FaClipboard } from "react-icons/fa";

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ ingredients }) => {
  const ingredientItems = ingredients.map((ingredient) => (
    <li key={ingredient._id || ingredient.name}>{ingredient.name}</li>
  ));

  const copyToClipboard = () => {
    const ingredientNames = ingredients.map((ingredient) => ingredient.name).join("\n");
    navigator.clipboard.writeText(ingredientNames).then(
      () => {
        alert("Ingredients copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy ingredients. Please try again.");
        console.error(err);
      }
    );
  };

  return (
    <div className="ingredients-section">
      <div className="ingredients-section-name-container">
        <h3>Ingredients</h3>
        <div className="clipboard-container column-center" onClick={copyToClipboard}>
          <FaClipboard/>
        </div>
      </div>

      <ul className="ingredients-list">
        {ingredients.length > 0 ? ingredientItems : <p>No ingredients available.</p>}
      </ul>
    </div>
  );
};

export default IngredientsSection;