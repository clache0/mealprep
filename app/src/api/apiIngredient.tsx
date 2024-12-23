import config from '../../config.json'
import { Ingredient } from '../types/types';

export const fetchIngredientById = async (ingredientId: string) => {
  const url = config.serverUrl + `/ingredients/${ingredientId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch ingredient data');
    }

    if (response.status === 404) {
      return []; // ingredient not found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ingredient: ", error);
    throw error;
  };
};

export const fetchAllIngredients = async () => {
  const url = config.serverUrl + '/ingredients/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch ingredient data');
    }

    if (response.status === 204) {
      return []; // no ingredients found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching ingredients: ", error);
    throw error;
  };
}

// return inserted ingredient id if successfuly
export const postIngredient = async (ingredient: Ingredient) => {
  const url = config.serverUrl + '/ingredients/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      throw new Error('Failed to post ingredient');
    }

    const data = await response.json();
    return data.insertedId;
  } catch (error) {
    console.error('Error posting ingredient:', error);
    throw error;
  }
};

export const patchIngredient = async (ingredient: Ingredient) => {
  const url = config.serverUrl + `/ingredients/${ingredient._id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredient),
    });

    if (!response.ok) {
      throw new Error('Failed to patch ingredient');
    } 
  } catch (error) {
    console.error('Error patching ingredient:', error);
    throw error;
  }
};

export const deleteIngredientById = async (ingredientId: string) => {
  const url = config.serverUrl + `/ingredients/${ingredientId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete ingredient data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting ingredient: ", error);
    throw error;
  };
};