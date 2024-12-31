import React, { useEffect, useRef, useState } from 'react';
import '../../styles/components/ingredient/AddIngredientForm.css';
import { Ingredient } from '../../types/types';
import { useAppData } from '../../context/AppDataContext';
import { getIngredientIdFromName } from '../../utils/utils';

interface AddIngredientToRecipeFormProps {
  onSubmit: (ingredient: Ingredient, quantity: string) => void;
  onShowForm: (showAddIngredientToRecipeForm: boolean) => void;
  ingredient?: Ingredient; // optional ingredient for update
}

const AddIngredientToRecipeForm: React.FC<AddIngredientToRecipeFormProps> = ({ onSubmit, onShowForm, ingredient }) => {
  const [name, setName] = useState<string>(ingredient?.name || '');
  const [quantity, setQuantity] = useState<string>('');
  const { ingredients } = useAppData();

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // auto focus to name input for form component is mounted
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const existingIngredientId = getIngredientIdFromName(ingredients, name);

    if (existingIngredientId) {
      // ingredient exists, update with id
      const updatedIngredient: Ingredient = {
        _id: existingIngredientId,
        name,
      };
      onSubmit(updatedIngredient, quantity);
    }
    else {
      // ingredient does not exist, send new ingredient
      const newIngredient: Ingredient = {
        _id: ingredient?._id, // include id if update
        name: name,
      };
      onSubmit(newIngredient, quantity);
    }
    onShowForm(false);

    if (!ingredient) {
      // Clear form inputs if not update
      setName('');
      setQuantity('');
    }
  };

  return (
    <div className="add-ingredient-form-backdrop">
      <div className="add-ingredient-form-content">
        <h2>{ingredient ? 'Update Ingredient Form' : 'Add Ingredient Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label htmlFor="name">Ingredient Name</label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <button type="submit">{ingredient ? 'Update Ingredient' : 'Add Ingredient'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddIngredientToRecipeForm;
