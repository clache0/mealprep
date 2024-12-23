import { Link } from "react-router-dom";
import Button from "../general/Button";
import "../../styles/components/ingredient/IngredientCard.css"
import { useState } from "react";
import AddIngredientForm from "./AddIngredientForm";
import { Ingredient } from "../../types/types";

interface IngredientCardProps {
  ingredient: Ingredient;
  onUpdateIngredient: (ingredient: Ingredient) => void;
  onDeleteIngredient: (ingredient: Ingredient) => void;
}
const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, onUpdateIngredient, onDeleteIngredient }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  return (
    <div className="ingredient-card">
      <Link className="ingredient-link" to={`/ingredient/${ingredient._id}`}>{ingredient.name}</Link>

      <div className="ingredient-link-actions">
        <Button
          label='Edit'
          onClick={() => setIsEditing(true)}
          backgroundColor='var(--primary-color)'
        />
        <Button
          label='Delete'
          onClick={() => { onDeleteIngredient(ingredient) }}
          backgroundColor='var(--red)'
        />
      </div>

      {isEditing && (
        <AddIngredientForm  
          onSubmit={(updatedIngredient: Ingredient) => {
            onUpdateIngredient(updatedIngredient);
            setIsEditing(false);
          }}
          onShowForm={setIsEditing}
          ingredient={ingredient}
        /> 
      )}
    </div>

  );
};

export default IngredientCard;