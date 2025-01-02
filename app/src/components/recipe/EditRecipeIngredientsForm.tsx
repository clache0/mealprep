import React, { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import { IngredientQuantities, Recipe } from "../../types/types";
import Button from "../general/Button";
import "../../styles/components/recipe/EditRecipeIngredientsForm.css"

interface EditRecipeIngredientsFormProps {
  recipe: Recipe;
  ingredientIndex: number;
  onClose: () => void;
  onSave: (updatedQuantities: IngredientQuantities[]) => void;
}

const EditRecipeIngredientsForm: React.FC<EditRecipeIngredientsFormProps> = ({
  recipe,
  ingredientIndex,
  onClose,
  onSave,
}) => {
  const { ingredients } = useAppData();
  const [ingredientName, setIngredientName] = useState<string>(
    ingredients.find((ing) => ing._id === recipe.ingredientQuantities[ingredientIndex].ingredientId)?.name || ""
  );
  const [quantity, setQuantity] = useState<string>(
    recipe.ingredientQuantities[ingredientIndex].quantity
  );

  const handleSave = () => {
    const updatedQuantities = [...recipe.ingredientQuantities];
    const updatedIngredient = ingredients.find((ing) => ing.name === ingredientName);

    if (!updatedIngredient) {
      alert("Ingredient not found. Please add it first.");
      return;
    }

    updatedQuantities[ingredientIndex] = {
      ingredientId: updatedIngredient._id || "",
      quantity,
    };

    onSave(updatedQuantities);
  };

  return (
    <>
      <div className="edit-ingredient-form-backdrop" onClick={onClose}/>
      <div className="edit-ingredient-form">
        <h3>Edit Ingredient</h3>
        <div className="form-field">
          <label htmlFor="ingredient-name">Ingredient Name:</label>
          <input
            id="ingredient-name"
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="ingredient-quantity">Quantity:</label>
          <input
            id="ingredient-quantity"
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="button-group">
          <Button label="Save" onClick={handleSave} backgroundColor="var(--primary-color)" />
          <Button label="Cancel" onClick={onClose} backgroundColor="var(--secondary-color)" />
        </div>
      </div>
    </>
  );
};

export default EditRecipeIngredientsForm;