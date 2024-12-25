import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeList.css"
import { Recipe } from "../../types/types";
import RecipeCard from "./RecipeCard";
import RecipeCardLarge from "./RecipeCardLarge";

interface RecipeListProps {
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
const RecipeList: React.FC<RecipeListProps> = ({ onUpdateRecipe, onDeleteRecipe }) => {
  const { recipes } = useAppData();
  const [showRecipeCardLarge, setShowRecipeCardLarge] = useState<boolean>(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const handleRecipeClick = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setShowRecipeCardLarge(true);
  };

  const handleCloseRecipeCardLarge = () => {
    setShowRecipeCardLarge(false);
    setSelectedRecipeId(null);
  };

  if (!recipes) {
    return <div>Loading Recipe List...</div>
  }

  const recipeList = recipes ? recipes.map((recipe, index) => (
    <li 
      key={recipe._id || index} 
      className="recipe-link-container"
      onClick={() => handleRecipeClick(recipe._id!)}
    >
      <RecipeCard
        recipe={recipe}
        onUpdateRecipe={onUpdateRecipe}
        onDeleteRecipe={onDeleteRecipe}
      />
    </li>
  )) : null;

  return (
    <>
      <h2>Recipe List</h2>
      {showRecipeCardLarge && selectedRecipeId ? (
        <RecipeCardLarge recipeId={selectedRecipeId} onClose={handleCloseRecipeCardLarge} />
      ) : (
        <ul className="recipe-list column-center">
          {recipeList}
        </ul>
      )}
    </>
  );
};

export default RecipeList;