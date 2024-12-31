import React, { useEffect, useRef, useState } from 'react';
import '../../styles/components/recipe/AddRecipeForm.css'
import { IngredientQuantities, Recipe } from '../../types/types';
// import { useAppData } from '../../context/AppDataContext';
// import Button from '../general/Button';

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
    recipe?.ingredientQuantities || []
  );

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  
  // auto focus to name input for form component is mounted
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  // const handleIngredientChange = (index: number, field: string, value: string) => {
  //   const updatedIngredients = [...ingredientQuantities];
  //   if (field === 'ingredientId') {
  //     updatedIngredients[index].ingredientId = value;
  //   }
  //   else if (field === 'quantity') {
  //     updatedIngredients[index].quantity = value;
  //   }
  //   setIngredientQuantities(updatedIngredients);
  // }

  // const handleAddIngredient = () => {
  //   setIngredientQuantities([...ingredientQuantities, { ingredientId: '', quantity: '' }]);
  // }

  // const handleRemoveIngredient = (index: number) => {
  //   setIngredientQuantities(ingredientQuantities.filter((_, i) => i !== index));
  // }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newRecipe: Recipe = {
      _id: recipe?._id, // include id if update
      name: name,
      notes: notes,
      ingredientQuantities: ingredientQuantities,
    };

    onSubmit(newRecipe);
    onShowForm(false);
    
    if (!recipe) {
      // Clear form inputs if not update
      setName('');
      setNotes('');
      setIngredientQuantities([]);
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
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          {/* Ingredients */}
          {/* <div>
            <h3>Ingredients</h3>

            <Button
              label='Add Ingredient'
              onClick={handleAddIngredient}
              backgroundColor='var(--secondary-color)'
            />

            <div className='ingredient-quantities-container'>
              {ingredientQuantities.map((ingredient, index) => (
                <div key={index} className="ingredient-row">
                  <select
                    value={ingredient.ingredientId}
                    onChange={(event) =>
                      handleIngredientChange(index, 'ingredientId', event.target.value)
                    }
                  >
                    <option value="">Select Ingredient</option>
                    {ingredients.map((ing) => (
                      <option key={ing._id} value={ing._id}>
                        {ing.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={ingredient.quantity}
                    onChange={(event) =>
                      handleIngredientChange(index, 'quantity', event.target.value)
                    }
                  />
                  <Button
                    label='X'
                    onClick={() => handleRemoveIngredient(index)}
                    backgroundColor='var(--red)'
                  />
                </div>
              ))}
            </div>
          </div> */}

          {/* Submit */}
          <button type="submit">{recipe ? 'Update Recipe' : 'Add Recipe'}</button>
          <button type="button" onClick={() => onShowForm(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
