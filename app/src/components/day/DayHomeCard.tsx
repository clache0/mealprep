import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { getRecipeName } from '../../utils/utils';
import '../../styles/components/day/DayHomeCard.css';

interface DayHomeCardProps {
  dayId: string;
  onClose: () => void;
}

const DayHomeCard: React.FC<DayHomeCardProps> = ({ dayId, onClose }) => {
  const { days, recipes } = useAppData();
  const day = days.find((d) => d._id === dayId);

  if (!day) {
    return <div>Day not found</div>;
  }

  return (
    <div className="day-home-card-backdrop" onClick={onClose}>
      <div className="day-home-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>{day.name}</h2>
        <ul>
          {day.recipeIds.length > 0 ? (
            day.recipeIds.map((recipeId) => (
              <li key={recipeId}>{getRecipeName(recipes, recipeId)}</li>
            ))
          ) : (
            <li>No recipes added</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DayHomeCard;
