import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { getRecipeNameFromId } from '../../utils/utils';
import '../../styles/components/day/DayHomeCard.css';
import { addRecipeToDay, deleteRecipeFromDay } from '../../api/apiDay';
import Button from '../general/Button';

interface DayHomeCardProps {
  dayId: string;
  onClose: () => void;
}

const DayHomeCard: React.FC<DayHomeCardProps> = ({ dayId, onClose }) => {
  const { days, recipes, setDays } = useAppData();
  const [newRecipeId, setNewRecipeId] = useState<string>('');
  const day = days.find((d) => d._id === dayId);

  if (!day) {
    return <div>Day not found</div>;
  }

  const handleAddRecipe = async () => {
    if (newRecipeId && !day.recipeIds.includes(newRecipeId) && day && day._id) {
      const updatedDay = {
        ...day,
        recipeIds: [...day.recipeIds, newRecipeId],
      };

      try {
        // post recipe to server
        await addRecipeToDay(day._id, newRecipeId);
        
        // Update local state
        setDays((prevDays) =>
          prevDays.map((d) => (d._id === day._id ? updatedDay : d))
        );
      } catch (error) {
        console.error("handleAddRecipe error trying to addRecipeToDay: ", error);
      }

      // clear selected recipe
      setNewRecipeId('');
    }
    else {
      console.error("handleAddRecipe new recipe id, day id need to be checked");
      if (day.recipeIds.includes(newRecipeId)) {
        alert("Recipe has already been added to day");
      }
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    if (day && day._id) {
      const updatedDay = {
        ...day,
        recipeIds: day.recipeIds.filter((id) => id !== recipeId),
      };

      try {
        await deleteRecipeFromDay(day._id, recipeId);
        setDays((prevDays) =>
          prevDays.map((d) => (d._id === day._id ? updatedDay : d))
        );
      } catch (error) {
        console.error('handleDeleteRecipe error trying to deleteRecipeFromDay: ', error);
      }
    }
  };

  const recipeList = day.recipeIds.map((recipeId) => (
    <li key={recipeId}>
      {getRecipeNameFromId(recipes, recipeId)}
      <Button
        label="X"
        onClick={() => handleDeleteRecipe(recipeId)}
        backgroundColor='var(--red)'
      />
    </li>
  ));

  return (
    <div className="day-home-card-backdrop" onClick={onClose}>
      <div className="day-home-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        <h2>{day.name}</h2>

        {/* Add Recipe */}
        <div className="add-recipe-section">
          <label htmlFor="add-recipe">Add Recipe</label>
          <select
            id="add-recipe"
            value={newRecipeId}
            onChange={(e) => setNewRecipeId(e.target.value)}
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
          <button onClick={handleAddRecipe}>Add</button>
        </div>

        {/* Recipe List */}
        <ul>
          {day.recipeIds.length > 0 ? (
            recipeList
          ) : (
            <li>No recipes added</li>
          )}
        </ul>

      </div>
    </div>
  );
};

export default DayHomeCard;
