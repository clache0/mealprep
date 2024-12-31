import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeList.css";
import { Recipe } from "../../types/types";
import RecipeCard from "./RecipeCard";
import SearchBar from "../general/SearchBar";

interface RecipeListProps {
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ onUpdateRecipe, onDeleteRecipe }) => {
  const { recipes } = useAppData();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes || []);

  if (!recipes) {
    return <div>Loading Recipe List...</div>;
  }

  const recipeList = filteredRecipes.length ? (
    filteredRecipes.map((recipe, index) => (
      <li key={recipe._id || index} className="recipe-link-container">
        <RecipeCard
          recipe={recipe}
          onUpdateRecipe={onUpdateRecipe}
          onDeleteRecipe={onDeleteRecipe}
        />
      </li>
    ))
  ) : (
    <div>No recipes found</div>
  );

  return (
    <>
      <h2>Recipe List</h2>

      {/* SearchBar */}
      <div className="search-bar-container">
      <SearchBar
        data={recipes}
        onSearchResults={setFilteredRecipes}
      />
      </div>
      
      {/* Recipe List */}
      <ul className="recipe-list">{recipeList}</ul>
    </>
  );
};

export default RecipeList;
