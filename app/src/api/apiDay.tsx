import config from '../../config.json'
import { Day } from '../types/types';

export const fetchDayById = async (dayId: string) => {
  const url = config.serverUrl + `/days/${dayId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch day data');
    }

    if (response.status === 404) {
      return []; // day not found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching day: ", error);
    throw error;
  };
};

export const fetchAllDays = async () => {
  const url = config.serverUrl + '/days/';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch day data');
    }

    if (response.status === 204) {
      return []; // no days found
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching days: ", error);
    throw error;
  };
}

// return inserted day id if successfuly
export const postDay = async (day: Day) => {
  const url = config.serverUrl + '/days/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(day),
    });

    if (!response.ok) {
      throw new Error('Failed to post day');
    }

    const data = await response.json();
    return data.insertedId;
  } catch (error) {
    console.error('Error posting day:', error);
    throw error;
  }
};

export const patchDay = async (day: Day) => {
  const url = config.serverUrl + `/days/${day._id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(day),
    });

    if (!response.ok) {
      throw new Error('Failed to patch day');
    } 
  } catch (error) {
    console.error('Error patching day:', error);
    throw error;
  }
};

export const deleteDayById = async (dayId: string) => {
  const url = config.serverUrl + `/days/${dayId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete day data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting day: ", error);
    throw error;
  };
};