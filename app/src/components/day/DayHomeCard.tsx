import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { getRecipeName } from '../../utils/utils';
import '../../styles/components/day/DayHomeCard.css';
import { addRecipeToDay } from '../../api/apiDay';

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
        console.log("handleAddRecipe error trying to addRecipeToDay: ", error);
      }

      // clear selected recipe
      setNewRecipeId('');
    }
    else {
      console.error("handleAddRecipe new recipe id, day id need to be checked");
    }
  };

  return (
    <div className="day-home-card-backdrop" onClick={onClose}>
      <div className="day-home-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        <h2>{day.name}</h2>

        {/* Recipe List */}
        <ul>
          {day.recipeIds.length > 0 ? (
            day.recipeIds.map((recipeId) => (
              <li key={recipeId}>{getRecipeName(recipes, recipeId)}</li>
            ))
          ) : (
            <li>No recipes added</li>
          )}
        </ul>

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

      </div>
    </div>
  );
};

export default DayHomeCard;
