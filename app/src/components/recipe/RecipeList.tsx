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

// todo recipe press UX feedback

const RecipeList: React.FC<RecipeListProps> = ({ onUpdateRecipe, onDeleteRecipe }) => {
  const { recipes } = useAppData();
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>(recipes || []);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes || []);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);

  if (!recipes) {
    return <div>Loading Recipe List...</div>;
  }

  // update category recipes if selected category
  useEffect(() => {
    if (selectedCategory) {
      const updatedRecipes = recipes.filter(recipe => recipe.category === selectedCategory);
      setCategoryRecipes(updatedRecipes);
    }
    else {
      setCategoryRecipes(recipes); // unselect category, return all recipes
    }
  }, [recipes, selectedCategory]);

  // update filtered recipes if category changes
  useEffect(() => {
    setFilteredRecipes(categoryRecipes);
  }, [categoryRecipes]);


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
          data={categoryRecipes}
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
