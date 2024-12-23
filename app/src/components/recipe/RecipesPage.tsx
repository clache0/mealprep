import { useState } from "react";
import { deleteRecipeById, patchRecipe, postRecipe } from "../../api/apiRecipe";
import { useAppData } from "../../context/AppDataContext";
import "../../styles/components/recipe/RecipesPage.css"
import { Recipe } from "../../types/types";
import RecipeList from "./RecipeList";
import AddRecipeForm from "./AddRecipeForm";
import Button from "../general/Button";
import Modal from "../general/Modal";

const RecipesPage = () => {
  const { setRecipes } = useAppData();
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddRecipeForm, setShowAddRecipeForm] = useState<boolean>(false);

  const handleAddRecipe = async (recipe: Recipe) => {
    try {
      const recipeId = await postRecipe(recipe); // post recipe to server
      const newRecipe = { ...recipe, _id: recipeId };
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (error) {
      console.error("Error posting recipe: ", error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      await patchRecipe(updatedRecipe); // post recipe to server
      setRecipes((prevRecipes) => 
        prevRecipes.map((recipe) =>
          recipe._id === updatedRecipe._id ? updatedRecipe : recipe
        )
      );
    } catch (error) {
      console.error("Error updating recipe: ", error);
    }
  };

  const handleDeleteRecipe = async () => {
    if (!recipeToDelete) {
      alert("No group to delete");
      return;
    }

    if (!recipeToDelete._id) {
      alert("Recipe ID does not exist");
      return;
    }

    try {
      await deleteRecipeById(recipeToDelete._id);
      setRecipes((prevGroupRecipes) =>
        prevGroupRecipes.filter((prevRecipe) => recipeToDelete._id !== prevRecipe._id)
      );

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  };

  const openDeleteModal = (recipe: Recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };

  return (
    <div className="recipes-page">
      <h1>Recipes Page</h1>

      <div className="add-recipe-form-container">
        <Button
          label='Add Recipe'
          onClick={() => {
            setShowAddRecipeForm((prev) => !prev);
          }}
          backgroundColor="var(--primary-color"
        />
      </div>

      <div className="recipe-list-container">
        <RecipeList
          onUpdateRecipe={handleUpdateRecipe}
          onDeleteRecipe={openDeleteModal}
        />
      </div>

      { showAddRecipeForm && 
        <AddRecipeForm 
          onSubmit={handleAddRecipe} 
          onShowForm={setShowAddRecipeForm}
        /> 
      }

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteRecipe}
        title="Confirm Delete"
      >
        Are you sure you want to delete this recipe?
      </Modal>
    </div>
  )
}

export default RecipesPage;