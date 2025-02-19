import React, { useState } from "react";
import "../../styles/components/ingredient/IngredientsSection.css";
import { Ingredient } from "../../types/types";
import { FaCheck, FaClipboard } from "react-icons/fa";
import Button from "../general/Button";
import { MdCancel } from "react-icons/md";
import { patchIngredient } from "../../api/apiIngredient";
import { useAppData } from "../../context/AppDataContext";

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

const IngredientsSection: React.FC<IngredientsSectionProps> = ({ ingredients }) => {
  const { setIngredients } = useAppData();
  const [showOwnedIngredients, setShowOwnedIngredients] = useState<boolean>(true);
  const notOwnedIngredients = ingredients.filter((ing) => !(ing.isOwned ?? false)); // default null isOwned to false
  const displayedIngredients = showOwnedIngredients ? ingredients : notOwnedIngredients;

  const handleClickIsOwned = async(ingredient: Ingredient) => {
    const isOwned = ingredient.isOwned ?? false; // default nullish field to false
    const updatedIngredient: Ingredient = {
      ...ingredient,
      isOwned: !isOwned, // flip isOwned
    };

    try {
      await patchIngredient(updatedIngredient);

      setIngredients((prevIngredients) =>
        prevIngredients.map((ingredient) =>
          ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient
        )
      );
    } catch(error) {
      console.error("Error updating ingredient after clicking isOwned: ", error);
    }
  };

  const ingredientItems = displayedIngredients.map((ingredient) => (
    <li
      key={ingredient._id || ingredient.name}
      className="ingredient-item-li"
      onClick={() => handleClickIsOwned(ingredient)}
    >
      <p className="ingredients-section-name">{ingredient.name}</p>
      {ingredient.isOwned ?
        <FaCheck color="var(--green)" />
        : <MdCancel color="var(--red)" />
      }
    </li>
  ));

  const copyToClipboard = () => {
    const ingredientNames = displayedIngredients.map((ingredient) => ingredient.name).join("\n");
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

      <Button
        label={showOwnedIngredients ? "Show Not Owned" : "Show All"}
        onClick={() => setShowOwnedIngredients((prev) => !prev)}
        backgroundColor="var(--primary-color)"
      />

      <ul className="ingredients-list">
        {ingredients.length > 0 ? ingredientItems : <p>No ingredients available.</p>}
      </ul>
    </div>
  );
};

export default IngredientsSection;