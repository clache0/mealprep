import { Link } from "react-router-dom";
import Button from "../general/Button";
import "../../styles/components/recipe/RecipeCard.css"
import { useState } from "react";
import AddRecipeForm from "./AddRecipeForm";
import { Recipe } from "../../types/types";

interface RecipeCardProps {
  recipe: Recipe;
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdateRecipe, onDeleteRecipe }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  return (
    <div className="recipe-card">
      <Link className="recipe-link" to={`/recipe/${recipe._id}`}>{recipe.name}</Link>

      <div className="recipe-link-actions">
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