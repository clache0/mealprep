import Button from "../general/Button";
import "../../styles/components/recipe/RecipeCard.css"
import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";
import { Recipe } from "../../types/types";
import RecipeCardLarge from "./RecipeCardLarge";

interface RecipeCardProps {
  recipe: Recipe;
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdateRecipe, onDeleteRecipe }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showRecipeCardLarge, setShowRecipeCardLarge] = useState<boolean>(false);
  
  const handleRecipeClick = () => {
    setShowRecipeCardLarge(true);
  }

  const handleCloseRecipeCardLarge = () => {
    setShowRecipeCardLarge(false);
  }

  return (
    <div className="recipe-card">
      <h5
        onClick={handleRecipeClick}
      >
        {recipe.name}
      </h5>

      <div className="recipe-card-actions">
        <Button
          label='Edit'
          onClick={() => setIsEditing(true)}
          backgroundColor='var(--primary-color)'
        />
        <Button
          label='Delete'
          onClick={() => { onDeleteRecipe(recipe) }}
          backgroundColor='var(--red)'
        />
      </div>

      {showRecipeCardLarge && recipe._id &&
        <RecipeCardLarge recipeId={recipe._id} onClose={handleCloseRecipeCardLarge} />
      }

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

  );
};

export default RecipeCard;