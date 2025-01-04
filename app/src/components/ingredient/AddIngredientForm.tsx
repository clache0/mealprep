import React, { useEffect, useRef, useState } from 'react';
import '../../styles/components/ingredient/AddIngredientForm.css'
import { Ingredient } from '../../types/types';

interface AddIngredientFormProps {
  onSubmit: (ingredient: Ingredient) => void;
  onShowForm: (showAddIngredientForm: boolean) => void;
  ingredient?: Ingredient; // optional ingredient for update
}

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({ onSubmit, onShowForm, ingredient }) => {
  const [name, setName] = useState<string>(ingredient?.name || '');
  const [isOwned, setIsOwned] = useState<boolean>(ingredient?.isOwned || false);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // auto focus to name input for form component is mounted
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newIngredient: Ingredient = {
      _id: ingredient?._id, // include id if update
      name: name,
      isOwned: isOwned,
    };

    onSubmit(newIngredient);
    onShowForm(false);
    
    if (!ingredient) {
      // Clear form inputs if not update
      setName('');
      setIsOwned(false);
    }
  };

  return (
    <div className='add-ingredient-form-backdrop'>
      <div className='add-ingredient-form-content'>
        <h2>{ingredient ? 'Update Ingredient Form' : 'Add Ingredient Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>
          
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

          {/* Checkbox isOwned */}
          <div className="checkbox-container">
            <label htmlFor="isOwned">Owned?</label>
            <input
              type="checkbox"
              id="isOwned"
              checked={isOwned}
              onChange={() => setIsOwned((prev) => !prev)}
            />
          </div>

          <button type="submit">{ingredient ? 'Update Ingredient' : 'Add Ingredient'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddIngredientForm;
