import React, { useState } from 'react';
import { Recipe } from '../../types/types';
import SearchBar from '../general/SearchBar';
import Button from '../general/Button';
import "../../styles/components/day/AddRecipeToDayForm.css"

interface AddRecipeToDayFormProps {
  data: Recipe[];
  onSubmit: (recipeId: string) => void;
}

const AddRecipeToDayForm: React.FC<AddRecipeToDayFormProps> = ({ data, onSubmit }) => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(data);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');

  const handleSearchResults = (results: Recipe[]) => {
    setFilteredRecipes(results);
  };

  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  const handleSubmit = () => {
    if (selectedRecipeId) {
      onSubmit(selectedRecipeId);
      setSelectedRecipeId('');
    } else {
      alert('Please select a recipe.');
    }
  };

  return (
    <>
      <SearchBar data={data} onSearchResults={handleSearchResults} />
      <ul className='search-form-recipe-ul'>
        {filteredRecipes.map((recipe) => (
          <li
            key={recipe._id}
            onClick={() => handleSelectRecipe(recipe._id!)}
            className={`search-form-recipe-li ${selectedRecipeId === recipe._id ? 'selected-recipe' : ''}`}
          >
            {recipe.name}
          </li>
        ))}
      </ul>
      <Button label="Add Recipe" onClick={handleSubmit} backgroundColor="var(--primary-color)" />
    </>
  );
};

export default AddRecipeToDayForm;
