import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import '../../styles/components/day/DaysSection.css';
import { getRecipeNameFromId } from '../../utils/utils';
import DayHomeCard from './DayHomeCard';

interface DaysSectionProps {}

const DaysSection: React.FC<DaysSectionProps> = () => {
  const { days, recipes } = useAppData();
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

  // todo add emoji
  const dayList = sortedDays.map((day) => (
    <div
      key={day._id || day.name}
      className="day-container"
      onClick={() => handleDayClick(day._id!)}
    >
      <h3>{day.name}</h3>
      <ul className="day-recipe-list">
        {day.recipeIds.length > 0 ? (
          day.recipeIds.map((recipeId) => (
            <li key={recipeId}>
              {getRecipeNameFromId(recipes, recipeId)}
            </li>
          ))
        ) : (
          <li>No recipes added</li>
        )}
      </ul>
    </div>
  ));

  return (
    <div className="days-section">
      <h2>Weekly Plan</h2>
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
