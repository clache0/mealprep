import { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipeList.css";
import { Recipe, RecipeCategory } from "../../types/types";
import RecipeCard from "./RecipeCard";
import SearchBar from "../general/SearchBar";
import RecipeCategoryNavbar from "./RecipeCategoryNavbar";

interface RecipeListProps {
  onUpdateRecipe: (recipe: Recipe) => void;
  onDeleteRecipe: (recipe: Recipe) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ onUpdateRecipe, onDeleteRecipe }) => {
  const { recipes } = useAppData();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes || []);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);

  if (!recipes) {
    return <div>Loading Recipe List...</div>;
  }

  // todo: search in category instead of all of recipes
  // update filtered recipes if full list changes
  useEffect(() => {
    let updatedRecipes = recipes;
    if (selectedCategory && selectedCategory !== RecipeCategory.Undecided) {
      updatedRecipes = recipes.filter(recipe => recipe.category === selectedCategory);
    }
    setFilteredRecipes(updatedRecipes);
  }, [recipes, selectedCategory]);

  const recipeList = filteredRecipes.length ? (
    filteredRecipes.map((recipe, index) => (
      <li key={recipe._id || index} className="recipe-card-container">
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
      {/* SearchBar */}
      <div className="search-bar-container">
        <SearchBar
          data={recipes}
          onSearchResults={setFilteredRecipes}
        />
      </div>

      {/* Recipe Category Navbar */}
      <RecipeCategoryNavbar
        onSelectCategory={setSelectedCategory}
      />
      
      {/* Recipe List */}
      <ul className="recipe-list">{recipeList}</ul>
    </>
  );
};

export default RecipeList;
