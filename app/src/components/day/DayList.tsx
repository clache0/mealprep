import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/day/DayList.css"
import { Day } from "../../types/types";
import DayCard from "./DayCard";

interface DayListProps {
  onUpdateDay: (day: Day) => void;
  onDeleteDay: (day: Day) => void;
}
const DayList: React.FC<DayListProps> = ({ onUpdateDay, onDeleteDay }) => {
  const { days } = useAppData();

  if (!days) {
    return <div>Loading Day List...</div>
  }

  const dayList = days ? days.map((day, index) => (
    <li 
      key={day._id || index} 
      className="day-link-container"
    >
      <DayCard
        day={day}
        onUpdateDay={onUpdateDay}
        onDeleteDay={onDeleteDay}
      />
    </li>
  )) : null;

  return (
    <>
      <h2>Day List</h2>
      <ul className="day-list">
        {dayList}
      </ul>
    </>
  );
};

export default DayList;