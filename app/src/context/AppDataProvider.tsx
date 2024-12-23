import React, { useState, useEffect, ReactNode } from 'react';
import { AppDataContext } from './AppDataContext';
import { Ingredient } from '../types/types';
import { fetchAllIngredients } from '../api/apiIngredient';

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch ingredients and users from your API
      const fetchedIngredients = await fetchAllIngredients();
      setIngredients(fetchedIngredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
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
      isLoading, 
      isError, 
      setIngredients,
    }}>
      {children}
    </AppDataContext.Provider>
  );
};