import React, { useEffect, useRef, useState } from 'react';
import '../../styles/components/recipe/AddRecipeForm.css'
import { IngredientQuantities, Recipe, RecipeCategory } from '../../types/types';

interface AddRecipeFormProps {
  onSubmit: (recipe: Recipe) => void;
  onShowForm: (showAddRecipeForm: boolean) => void;
  recipe?: Recipe; // optional recipe for update
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onSubmit, onShowForm, recipe }) => {
  // const { ingredients } = useAppData();
  const [name, setName] = useState<string>(recipe?.name || '');
  const [notes, setNotes] = useState<string>(recipe?.notes || '');
  const [ingredientQuantities, setIngredientQuantities] = useState<IngredientQuantities[]>(
    recipe?.ingredientQuantities || []);
  const [category, setCategory] = useState<RecipeCategory>(
    recipe?.category || RecipeCategory.Undecided);

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  
  // auto focus to name input for form component is mounted
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newRecipe: Recipe = {
      _id: recipe?._id, // include id if update
      name: name,
      notes: notes,
      ingredientQuantities: ingredientQuantities,
      emoji: recipe?.emoji,
      category: category,
    };

    onSubmit(newRecipe);
    onShowForm(false);
    
    if (!recipe) {
      // Clear form inputs if not update
      setName('');
      setNotes('');
      setIngredientQuantities([]);
      setCategory(RecipeCategory.Undecided);
    }
  };

  return (
    <div className='add-recipe-form-backdrop'>
      <div className='add-recipe-form-content'>
        <h2>{recipe ? 'Update Recipe Form' : 'Add Recipe Form'}</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>

          {/* Recipe Name */}
          <div>
            <label htmlFor="name">Recipe Name</label>
            <input
              type="text"
              id="name"
              ref={nameInputRef}
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          {/* Notes */}
          <div className='add-recipe-form-notes-container'>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <div className='add-recipe-form-category-container'>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value as RecipeCategory)}
            >
              {Object.values(RecipeCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button type="submit">{recipe ? 'Update Recipe' : 'Add Recipe'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
