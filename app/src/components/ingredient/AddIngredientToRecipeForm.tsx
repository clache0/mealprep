import React, { useEffect, useRef, useState } from 'react';
import '../../styles/components/ingredient/AddIngredientForm.css';
import { Ingredient } from '../../types/types';
import { useAppData } from '../../context/AppDataContext';
import { getIngredientFromName } from '../../utils/utils';

interface AddIngredientToRecipeFormProps {
  onSubmit: (ingredient: Ingredient, quantity: string) => void;
  onShowForm: (showAddIngredientToRecipeForm: boolean) => void;
}

const AddIngredientToRecipeForm: React.FC<AddIngredientToRecipeFormProps> = ({ onSubmit, onShowForm }) => {
  const [name, setName] = useState<string>('');
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

    const existingIngredient = getIngredientFromName(ingredients, name);
    if (existingIngredient) {
      onSubmit(existingIngredient, quantity);
    }
    else {
      // ingredient does not exist, send new ingredient
      const newIngredient: Ingredient = {
        name: name,
        isOwned: false,
      };
      onSubmit(newIngredient, quantity);
    }
    onShowForm(false);

    // Clear form inputs
    setName('');
    setQuantity('');
  };

  return (
    <div className="add-ingredient-form-backdrop">
      <div className="add-ingredient-form-content">
        <h2>{'Add Ingredient Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          
          {/* Ingredient Name */}
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

          {/* Quantity */}
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <button type="submit">{'Add Ingredient'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddIngredientToRecipeForm;
