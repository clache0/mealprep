import { useEffect, useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/ingredient/IngredientList.css"
import { Ingredient } from "../../types/types";
import IngredientCard from "./IngredientCard";
import SearchBar from "../general/SearchBar";

interface IngredientListProps {
  onUpdateIngredient: (ingredient: Ingredient) => void;
  onDeleteIngredient: (ingredient: Ingredient) => void;
}
const IngredientList: React.FC<IngredientListProps> = ({ onUpdateIngredient, onDeleteIngredient }) => {
  const { ingredients } = useAppData();
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(ingredients || []);

  if (!ingredients) {
    return <div>Loading Ingredient List...</div>
  }

  // update filtered ingredients if full list changes
  useEffect(() => {
    setFilteredIngredients(ingredients);
  }, [ingredients]);

  const ingredientList = filteredIngredients.map((ingredient, index) => (
    <li 
      key={ingredient._id || index} 
      className="ingredient-card-container"
    >
      <IngredientCard
        ingredient={ingredient}
        onUpdateIngredient={onUpdateIngredient}
        onDeleteIngredient={onDeleteIngredient}
      />
    </li>
  ));

  return (
    <>
      <h2>Ingredient List</h2>

      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar
          data={ingredients}
          onSearchResults={setFilteredIngredients}
        />
      </div>

      {/* Ingredient List */}
      <ul className="ingredient-list">
        {ingredientList.length > 0 ? ingredientList : <li>No ingredients found.</li>}
      </ul>
    </>
  );
};

export default IngredientList;