import React, { useState } from 'react';
import '../../styles/components/ingredient/AddIngredientForm.css'
import { Ingredient } from '../../types/types';

interface AddGroupFormProps {
  onSubmit: (ingredient: Ingredient) => void;
  onShowForm: (showAddGroupForm: boolean) => void;
  ingredient?: Ingredient; // optional ingredient for update
}

const AddIngredientForm: React.FC<AddGroupFormProps> = ({ onSubmit, onShowForm, ingredient }) => {
  const [name, setName] = useState<string>(ingredient?.name || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newIngredient: Ingredient = {
      _id: ingredient?._id, // include id if update
      name: name,
    };

    onSubmit(newIngredient);
    onShowForm(false);
    
    if (!ingredient) {
      // Clear form inputs if not update
      setName('');
    }
  };

  return (
    <div className='add-ingredient-form-backdrop'>
      <div className='add-ingredient-form-content'>
        <h2>{ingredient ? 'Update Ingredient Form' : 'Add Ingredient Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div>
            <label htmlFor="name">Ingredient Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
