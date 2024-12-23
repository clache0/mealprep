import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeList.css"
import { Recipe } from "../../types/types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}
const RecipeList: React.FC<RecipeListProps> = ({ onUpdateRecipe, onDeleteRecipe }) => {
  const { recipes } = useAppData();

  if (!recipes) {
    return <div>Loading Recipe List...</div>
  }

  const recipeList = recipes ? recipes.map((recipe, index) => (
    <li 
      key={recipe._id || index} 
      className="recipe-link-container"
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
      <ul className="recipe-list column-center">
        {recipeList}
      </ul>
    </>
  );
};

export default RecipeList;