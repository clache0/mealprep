import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import '../../styles/components/day/DaysSection.css';
import { getRecipeFromId } from '../../utils/utils';
import DayHomeCard from './DayHomeCard';
import Button from '../general/Button';
import { patchDaysBatch } from '../../api/apiDay';

interface DaysSectionProps {}

const DaysSection: React.FC<DaysSectionProps> = () => {
  const { days, recipes, setDays } = useAppData();
  const [showDayHomeCard, setShowDayHomeCard] = useState<boolean>(false);
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

  const dayOrder = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const sortedDays = [...days].sort(
    (a, b) => dayOrder.indexOf(a.name) - dayOrder.indexOf(b.name)
  );

  const handleDayClick = (dayId: string) => {
    setSelectedDayId(dayId);
    setShowDayHomeCard(true);
  };

  const handleCloseDayHomeCard = () => {
    setShowDayHomeCard(false);
    setSelectedDayId(null);
  };

  const handleClearWeek = async () => {
    const updatedDays = days.map((day) => ({
      ...day,
      recipeIds: [],
    }));
    await patchDaysBatch(updatedDays); // update database
    setDays(updatedDays); // update local state
  }

  const dayList = sortedDays.map((day) => (
    <div
      key={day._id || day.name}
      className="day-container"
      onClick={() => handleDayClick(day._id!)}
    >
      <h3>{day.name}</h3>
      <ul className="day-recipe-list">
        {day.recipeIds.length > 0 ? (
          day.recipeIds.map((recipeId) => {
            const recipe = getRecipeFromId(recipes, recipeId);
            if (recipe) {
              return (
                <li key={recipeId} className='day-recipe-li row-center'>
                  <p className='day-recipe-emoji'>{recipe.emoji}</p>
                  <p className='day-recipe-name'>{recipe.name}</p>
                </li>
              );
            }
          })
        ) : (
          <li className='day-recipe-li'>No recipes added</li>
        )}
      </ul>
    </div>
  ));

  return (
    <div className="days-section">
      <div className='days-section-title-container row-center'>
        <h2>Weekly Plan</h2>
        <Button
          label="Clear Week"
          onClick={handleClearWeek}
          backgroundColor='var(--primary-color)'
        />
      </div>
      {showDayHomeCard && selectedDayId ? (
        <DayHomeCard dayId={selectedDayId} onClose={handleCloseDayHomeCard} />
      ) : (
        <div className="days-container">
          {dayList}
        </div>
      )}
    </div>
  );
};

export default DaysSection;
