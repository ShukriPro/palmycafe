// storage.js

/**
 * Save data to local storage.
 * @param {string} key The key under which to store the data.
 * @param {any} value The data to store.
 */
export const saveData = (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving to local storage", error);
    }
  };
  
  /**
   * Get data from local storage.
   * @param {string} key The key of the data to retrieve.
   * @returns {any} The parsed data from local storage.
   */
  export const getData = (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting data from local storage", error);
      return [];
    }
  };
  
  /**
   * Remove data from local storage.
   * @param {string} key The key of the data to remove.
   */
  export const removeData = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from local storage", error);
    }
  };
  