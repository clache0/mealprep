import React, { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeCardLarge.css";
import { getIngredientIdFromName, getIngredientNames } from "../../utils/utils";
import { Ingredient, IngredientQuantities, Recipe } from "../../types/types";
import AddIngredientToRecipeForm from "../ingredient/AddIngredientToRecipeForm";
import Button from "../general/Button";
import AddRecipeForm from "./AddRecipeForm";
import RecipeEmojiSelector from "./RecipeEmojiSelector";
import { saveEmoji } from "../../api/apiRecipe";

interface RecipeCardLargeProps {
  recipeId: string;
  onUpdateRecipe: (recipe: Recipe) => void;
  onClose: () => void;
}

const RecipeCardLarge: React.FC<RecipeCardLargeProps> = ({ recipeId, onUpdateRecipe, onClose }) => {
  const { recipes, ingredients, setRecipes, addIngredient, updateRecipe } = useAppData();
  const [showAddIngredientToRecipeForm, setShowAddIngredientToRecipeForm] = useState<boolean>(false);
  const [showSaveEmoji, setShowSaveEmoji] = useState<boolean>(false);
  const [recipeIngredientNames, setRecipeIngredientNames] = useState<string[]>([]);
  const recipe = recipes.find((recipe) => recipe._id === recipeId);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // todo edit recipe ingredient quantity

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  // Add ingredient
  const handleAddIngredient = async (newIngredient: Ingredient, quantity: string) => {
    const existingIngredientId = getIngredientIdFromName(ingredients, newIngredient.name);
    let ingredientId: string = "";

    // if ingredient does not exist, add to ingredients
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
    );
  };

  // Delete ingredient
  const handleDeleteIngredient = async (ingredientId: string) => {
    const updatedIngredientQuantities = recipe.ingredientQuantities.filter(
      (iq) => iq.ingredientId !== ingredientId
    );

    updateRecipe(recipeId, { 
      ...recipe, 
      ingredientQuantities: updatedIngredientQuantities 
    });
  };

  // Save emoji
  const handleSaveEmoji = async (emoji: string) => {
    if (!recipe._id) {
      console.error("handleSaveEmoji recipe id does not exist");
      return;
    }
    try {
      const response = await saveEmoji(recipe._id, emoji); // api call, save to server
  
      if (response) {
        const updatedRecipe = { ...recipe, emoji };
  
        setRecipes((prevRecipes) =>
          prevRecipes.map((r) => (r._id === recipe._id ? updatedRecipe : r))
        );
  
        // setRecipe(updatedRecipe);
      }
    } catch (error) {
      console.error("Failed to save emoji and update state:", error);
    }
  };

  // Close emoji selector
  const handleCloseRecipeEmojiSelector = () => {
    setShowSaveEmoji(false);
  }

  // Update recipeIngredientNames when ingredients or recipe.ingredientQuantities changes
  useEffect(() => {
    const names = getIngredientNames(recipe, ingredients);
    setRecipeIngredientNames(names);
  }, [ingredients, recipe.ingredientQuantities]);

  // Create recipe ingredient list components
  const recipeIngredientNamesList = recipeIngredientNames ? 
    recipe.ingredientQuantities.map((iq, index) => {
      const ingredientName = recipeIngredientNames[index];
      return (
        <li key={index}>
          <p>{ingredientName}</p>
          <div className="right-container">
            <p>{iq.quantity}</p>
            <Button
              label="X"
              onClick={() => handleDeleteIngredient(iq.ingredientId)}
              hoverColor=""
              backgroundColor="var(--red)"
            />
          </div>
        </li>
      )
  }) : null;

  return (
    <>
      <div className="recipe-card-large-backdrop" onClick={onClose}></div>
      <div className="recipe-card-large">
        <button 
          className="close-button"
          onClick={onClose}
        >
          Close
        </button>

        {/* Title */}
        <div className="recipe-title-container">
          <div
            className="recipe-emoji-container"
            onClick={() => setShowSaveEmoji(true)}
          >
            {recipe.emoji ?
                <div>{recipe.emoji}</div>
              : <div className="select-emoji-container">Select Emoji</div>
            }
          </div>

          <h2>{recipe.name}</h2>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <Button
            label="Edit Name and Notes"
            onClick={() => setIsEditing(true)}
            backgroundColor="var(--secondary-color)"
          />
        </div>

        {/* Notes */}
        <div className="recipe-notes-container">
          <h5>Notes</h5>
          <p>
            {recipe.notes}
          </p>
        </div>

        {/* Add Ingredient Button */}
        <Button
          label="Add Ingredient"
          onClick={() => setShowAddIngredientToRecipeForm(true)}
        />
        {showAddIngredientToRecipeForm &&
        <AddIngredientToRecipeForm
          onSubmit={handleAddIngredient}
          onShowForm={setShowAddIngredientToRecipeForm}
        />}

        {/* Ingredients */}
        <h3>Ingredients:</h3>
        <ul>
          {recipeIngredientNamesList}
        </ul>

        {/* Emoji Selector */}
        {showSaveEmoji &&
          <RecipeEmojiSelector
            recipe={recipe}
            onSaveEmoji={handleSaveEmoji}
            onClose={handleCloseRecipeEmojiSelector}
          />
        }

        {/* Update Recipe Form */}
        {isEditing && (
          <AddRecipeForm  
            onSubmit={(updatedRecipe: Recipe) => {
              onUpdateRecipe(updatedRecipe);
              setIsEditing(false);
            }}
            onShowForm={setIsEditing}
            recipe={recipe}
          /> 
        )}
      </div>
    </>
  );
};

export default RecipeCardLarge;
