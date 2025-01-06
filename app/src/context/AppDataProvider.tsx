import React, { useState, useEffect, ReactNode } from 'react';
import { AppDataContext } from './AppDataContext';
import { Day, Ingredient, Recipe } from '../types/types';
import { fetchAllIngredients, postIngredient } from '../api/apiIngredient';
import { fetchAllRecipes, patchRecipe } from '../api/apiRecipe';
import { fetchAllDays } from '../api/apiDay';
import { sortAlphabetically } from '../utils/utils';

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[] | []>([]);
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const [days, setDays] = useState<Day[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const addIngredient = async (newIngredient: Ingredient): Promise<string> => {
    try {
      const newIngredientId = await postIngredient(newIngredient);
      const updatedIngredient = { ...newIngredient, _id: newIngredientId };
      setIngredients((prev) => 
        sortAlphabetically([...prev, updatedIngredient])
      );
      return newIngredientId;
    }
    catch (error) {
      console.error("addIngredient: Failed to post ingredient: ", error);
      throw new Error("Failed to add ingredient");
    }
  };
  
  const updateRecipe = async (recipeId: string, updatedRecipe: Recipe) => {
    try {
      await patchRecipe(updatedRecipe);
      setRecipes((prev) =>
        sortAlphabetically(
          prev.map((recipe) => (recipe._id === recipeId ? updatedRecipe : recipe))
        )
      );
    } catch (error) {
      console.log("Failed to updateRecipe: ", error);
    }

  };  

  const fetchData = async () => {
    try {
      const fetchedIngredients: Ingredient[] = await fetchAllIngredients();
      const fetchedRecipes: Recipe[] = await fetchAllRecipes();
      const fetchedDays: Day[] = await fetchAllDays();
      
      setIngredients(sortAlphabetically(fetchedIngredients));
      setRecipes(sortAlphabetically(fetchedRecipes));
      setDays(fetchedDays);
    } catch (error) {
      console.error("Error fetching ingredients, recipes, or days:", error);
    } finally {
      setIsLoading(false);
      setIsError(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppDataContext.Provider value={{
      ingredients,
      recipes,
      days,
      isLoading, 
      isError, 
      setIngredients,
      setRecipes,
      setDays,
      addIngredient,
      updateRecipe,
    }}>
      {children}
    </AppDataContext.Provider>
  );
};