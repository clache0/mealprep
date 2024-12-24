import { Link } from "react-router-dom";
import Button from "../general/Button";
import "../../styles/components/day/DayCard.css"
import { useState } from "react";
import AddDayForm from "./AddDayForm";
import { Day } from "../../types/types";

interface DayCardProps {
  day: Day;
  onUpdateDay: (day: Day) => void;
  onDeleteDay: (day: Day) => void;
}
const DayCard: React.FC<DayCardProps> = ({ day, onUpdateDay, onDeleteDay }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  return (
    <div className="day-card">
      <Link className="day-link" to={`/day/${day._id}`}>{day.name}</Link>

      <div className="day-link-actions">
        <Button
          label='Edit'
          onClick={() => setIsEditing(true)}
          backgroundColor='var(--primary-color)'
        />
        <Button
          label='Delete'
          onClick={() => { onDeleteDay(day) }}
          backgroundColor='var(--red)'
        />
      </div>

      {isEditing && (
        <AddDayForm  
          onSubmit={(updatedDay: Day) => {
            onUpdateDay(updatedDay);
            setIsEditing(false);
          }}
          onShowForm={setIsEditing}
          day={day}
        /> 
      )}
    </div>

  );
};

export default DayCard;