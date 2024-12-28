import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/ingredient/IngredientList.css"
import { Ingredient } from "../../types/types";
import IngredientCard from "./IngredientCard";

interface IngredientListProps {
  onUpdateIngredient: (ingredient: Ingredient) => void;
  onDeleteIngredient: (ingredient: Ingredient) => void;
}
const IngredientList: React.FC<IngredientListProps> = ({ onUpdateIngredient, onDeleteIngredient }) => {
  const { ingredients } = useAppData();

  if (!ingredients) {
    return <div>Loading Ingredient List...</div>
  }

  const ingredientList = ingredients ? ingredients.map((ingredient, index) => (
    <li 
      key={ingredient._id || index} 
      className="ingredient-link-container"
    >
      <IngredientCard
        ingredient={ingredient}
        onUpdateIngredient={onUpdateIngredient}
        onDeleteIngredient={onDeleteIngredient}
      />
    </li>
  )) : null;

  return (
    <>
      <h2>Ingredient List</h2>
      <ul className="ingredient-list">
        {ingredientList}
      </ul>
    </>
  );
};

export default IngredientList;