import React, { createContext, useContext } from 'react';
import { Ingredient } from '../types/types';

interface AppDataContextType {
  ingredients: Ingredient[] | [];
  isLoading: boolean;
  isError: boolean;
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[] | []>>;
}

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
};

