import config from '../../config.json'
import { Recipe } from '../types/types';

export const fetchRecipeById = async (recipeId: string) => {
  const url = config.serverUrl + `/recipes/${recipeId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe data');
    }

    if (response.status === 404) {
      return []; // recipe not found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe: ", error);
    throw error;
  };
};

export const fetchAllRecipes = async () => {
  const url = config.serverUrl + '/recipes/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe data');
    }

    if (response.status === 204) {
      return []; // no recipes found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    throw error;
  };
}

// return inserted recipe id if successfuly
export const postRecipe = async (recipe: Recipe) => {
  const url = config.serverUrl + '/recipes/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error('Failed to post recipe');
    }

    const data = await response.json();
    return data.insertedId;
  } catch (error) {
    console.error('Error posting recipe:', error);
    throw error;
  }
};

export const patchRecipe = async (recipe: Recipe) => {
  const url = config.serverUrl + `/recipes/${recipe._id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error('Failed to patch recipe');
    } 
  } catch (error) {
    console.error('Error patching recipe:', error);
    throw error;
  }
};

export const deleteRecipeById = async (recipeId: string) => {
  const url = config.serverUrl + `/recipes/${recipeId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete recipe data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting recipe: ", error);
    throw error;
  };
};