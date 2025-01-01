import Button from "../general/Button";
import "../../styles/components/recipe/RecipeCard.css"
import { useState } from "react";
import { Recipe } from "../../types/types";
import RecipeCardLarge from "./RecipeCardLarge";

interface RecipeCardProps {
  recipe: Recipe;
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdateRecipe, onDeleteRecipe }) => {
  const [showRecipeCardLarge, setShowRecipeCardLarge] = useState<boolean>(false);
  
  const handleRecipeClick = () => {
    setShowRecipeCardLarge(true);
  }

  const handleCloseRecipeCardLarge = () => {
    setShowRecipeCardLarge(false);
  }

  return (
    <div className="recipe-card">
      <div className="recipe-card-name-container">
        {recipe.emoji}
        <h5 onClick={handleRecipeClick}>
          {recipe.name}
        </h5>
      </div>

      <div className="recipe-card-actions">
        <Button
          label='Delete'
          onClick={() => { onDeleteRecipe(recipe) }}
          backgroundColor='var(--red)'
        />
      </div>

      {showRecipeCardLarge && recipe._id &&
        <RecipeCardLarge 
          recipeId={recipe._id}
          onUpdateRecipe={onUpdateRecipe}
          onClose={handleCloseRecipeCardLarge}
        />
      }


    </div>

  );
};

export default RecipeCard;