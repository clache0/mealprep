import React, { createContext, useContext } from 'react';
import { Day, Ingredient, Recipe } from '../types/types';

interface AppDataContextType {
  ingredients: Ingredient[] | [];
  recipes: Recipe[] | [];
  days: Day[] | [];
  isLoading: boolean;
  isError: boolean;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[] | []>>;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[] | []>>;
  setDays: React.Dispatch<React.SetStateAction<Day[] | []>>;
}

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
};

