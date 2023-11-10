/**
 * Get data from localStorage
 * @param {string} key - The key of the data to retrieve.
 * @returns {any} The parsed data from localStorage.
 */
export const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

/**
 * Save data to localStorage
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The data to store.
 */
export const saveData = (key, value) => {
    localStorage.setItem(key, value);
};

/**
 * Remove data from localStorage
 * @param {string} key - The key of the data to remove.
 */
export const removeData = (key) => {
    localStorage.removeItem(key);
  };