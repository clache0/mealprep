import React, { useState, useEffect, ReactNode } from 'react';
import { AppDataContext } from './AppDataContext';
import { Day, Ingredient, Recipe } from '../types/types';
import { fetchAllIngredients } from '../api/apiIngredient';
import { fetchAllRecipes } from '../api/apiRecipe';
import { fetchAllDays } from '../api/apiDay';

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[] | []>([]);
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const [days, setDays] = useState<Day[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch ingredients and users from your API
      const fetchedIngredients = await fetchAllIngredients();
      const fetchedRecipes = await fetchAllRecipes();
      const fetchedDays = await fetchAllDays();
      setIngredients(fetchedIngredients);
      setRecipes(fetchedRecipes);
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
    }}>
      {children}
    </AppDataContext.Provider>
  );
};