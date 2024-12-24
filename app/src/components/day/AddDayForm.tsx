import React, { useState } from 'react';
import '../../styles/components/day/AddDayForm.css'
import { Day } from '../../types/types';
import { useAppData } from '../../context/AppDataContext';

interface AddDayFormProps {
  onSubmit: (day: Day) => void;
  onShowForm: (showAddDayForm: boolean) => void;
  day?: Day; // optional day for update
}

const AddDayForm: React.FC<AddDayFormProps> = ({ onSubmit, onShowForm, day }) => {
  const [name, setName] = useState<string>(day?.name || '');
  const [recipeIds, setRecipeIds] = useState<string[]>(day?.recipeIds || []);
  const { recipes } = useAppData();

  const handleRecipeSelect = (recipeId: string) => {
    if (!recipeIds.includes(recipeId)) {
      setRecipeIds([...recipeIds, recipeId]);
    }
  };

  const handleRemoveRecipeId = (index: number) => {
    setRecipeIds(recipeIds.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newDay: Day = {
      _id: day?._id, // include id if update
      name: name,
      recipeIds: recipeIds,
    };

    onSubmit(newDay);
    onShowForm(false);
    
    if (!day) {
      // Clear form inputs if not update
      setName('');
      setRecipeIds([]);
    }
  };

  return (
    <div className='add-day-form-backdrop'>
      <div className='add-day-form-content'>
        <h2>{day ? 'Update Day Form' : 'Add Day Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div>
            <label htmlFor="name">Day Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="recipes">Add Recipes</label>
            <select
              id="recipes"
              onChange={(event) => handleRecipeSelect(event.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                Select a recipe
              </option>
              {recipes.map((recipe) => (
                <option key={recipe._id} value={recipe._id}>
                  {recipe.name}
                </option>
              ))}
            </select>

            <div className="selected-recipes">
              <h3>Selected Recipes</h3>
              {recipeIds.map((recipeId, index) => (
                <div key={index} className="selected-recipe">
                  <span>
                    {recipes.find((recipe) => recipe._id === recipeId)?.name || recipeId}
                  </span>
                  <button type="button" onClick={() => handleRemoveRecipeId(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit">{day ? 'Update Day' : 'Add Day'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddDayForm;
