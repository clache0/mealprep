import { useState } from "react";
import { deleteDayById, patchDay, postDay } from "../../api/apiDay";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/day/DaysPage.css"
import { Day } from "../../types/types";
import DayList from "./DayList";
import AddDayForm from "./AddDayForm";
import Button from "../general/Button";
import Modal from "../general/Modal";

const DaysPage = () => {
  const { setDays } = useAppData();
  const [dayToDelete, setDayToDelete] = useState<Day | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddDayForm, setShowAddDayForm] = useState<boolean>(false);

  const handleAddDay = async (day: Day) => {
    try {
      const dayId = await postDay(day); // post day to server
      const newDay = { ...day, _id: dayId };
      setDays((prevDays) => [...prevDays, newDay]);
    } catch (error) {
      console.error("Error posting day: ", error);
    }
  };

  const handleUpdateDay = async (updatedDay: Day) => {
    try {
      await patchDay(updatedDay); // post day to server
      setDays((prevDays) => 
        prevDays.map((day) =>
          day._id === updatedDay._id ? updatedDay : day
        )
      );
    } catch (error) {
      console.error("Error updating day: ", error);
    }
  };

  const handleDeleteDay = async () => {
    if (!dayToDelete) {
      alert("No group to delete");
      return;
    }

    if (!dayToDelete._id) {
      alert("Day ID does not exist");
      return;
    }

    try {
      await deleteDayById(dayToDelete._id);
      setDays((prevGroupDays) =>
        prevGroupDays.filter((prevDay) => dayToDelete._id !== prevDay._id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting day: ", error);
    }
  };

  const openDeleteModal = (day: Day) => {
    setDayToDelete(day);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDayToDelete(null);
  };

  return (
    <div className="days-page">
      <h1>Days Page</h1>

      <div className="add-day-form-container">
        <Button
          label='Add Day'
          onClick={() => {
            setShowAddDayForm((prev) => !prev);
          }}
          backgroundColor="var(--primary-color"
        />
      </div>

      <div className="day-list-container column-center">
        <DayList
          onUpdateDay={handleUpdateDay}
          onDeleteDay={openDeleteModal}
        />
      </div>

      { showAddDayForm && 
        <AddDayForm 
          onSubmit={handleAddDay} 
          onShowForm={setShowAddDayForm}
        /> 
      }

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteDay}
        title="Confirm Delete"
      >
        Are you sure you want to delete this day?
      </Modal>
    </div>
  )
}

export default DaysPage;