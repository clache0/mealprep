import { useState } from "react";
import { deleteIngredientById, patchIngredient, postIngredient } from "../../api/apiIngredient";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/ingredient/IngredientsPage.css"
import { Ingredient } from "../../types/types";
import IngredientList from "./IngredientList";
import AddIngredientForm from "./AddIngredientForm";
import Button from "../general/Button";
import Modal from "../general/Modal";
import { sortAlphabetically } from "../../utils/utils";

const IngredientsPage = () => {
  const { setIngredients } = useAppData();
  const [ingredientToDelete, setIngredientToDelete] = useState<Ingredient | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddIngredientForm, setShowAddIngredientForm] = useState<boolean>(false);

  const handleAddIngredient = async (ingredient: Ingredient) => {
    try {
      const ingredientId = await postIngredient(ingredient); // post ingredient to server
      const newIngredient = { ...ingredient, _id: ingredientId };
      setIngredients((prevIngredients) =>
        sortAlphabetically([...prevIngredients, newIngredient])
      );
    } catch (error) {
      console.error("Error posting ingredient: ", error);
    }
  };

  const handleUpdateIngredient = async (updatedIngredient: Ingredient) => {
    try {
      await patchIngredient(updatedIngredient); // post ingredient to server
      setIngredients((prevIngredients) =>
        sortAlphabetically(
          prevIngredients.map((ingredient) =>
            ingredient._id === updatedIngredient._id ? updatedIngredient : ingredient
          )
        )
      );
    } catch (error) {
      console.error("Error updating ingredient: ", error);
    }
  };

  const handleDeleteIngredient = async () => {
    if (!ingredientToDelete) {
      alert("No group to delete");
      return;
    }

    if (!ingredientToDelete._id) {
      alert("Ingredient ID does not exist");
      return;
    }

    try {
      await deleteIngredientById(ingredientToDelete._id);
      setIngredients((prevGroupIngredients) =>
        prevGroupIngredients.filter((prevIngredient) => ingredientToDelete._id !== prevIngredient._id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting ingredient: ", error);
    }
  };

  const openDeleteModal = (ingredient: Ingredient) => {
    setIngredientToDelete(ingredient);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setIngredientToDelete(null);
  };

  return (
    <div className="ingredients-page">
      <h1>Ingredients Page</h1>

      <div className="add-ingredient-form-container">
        <Button
          label='Add Ingredient'
          onClick={() => {
            setShowAddIngredientForm((prev) => !prev);
          }}
          backgroundColor="var(--primary-color"
        />
      </div>

      <div className="ingredient-list-container">
        <IngredientList
          onUpdateIngredient={handleUpdateIngredient}
          onDeleteIngredient={openDeleteModal}
        />
      </div>

      { showAddIngredientForm && 
        <AddIngredientForm 
          onSubmit={handleAddIngredient} 
          onShowForm={setShowAddIngredientForm}
        /> 
      }

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteIngredient}
        title="Confirm Delete"
      >
        Are you sure you want to delete this ingredient?
      </Modal>
    </div>
  )
}

export default IngredientsPage;