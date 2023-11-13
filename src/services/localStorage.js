// localStorage.js
const saveData = (key, value) => {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        console.error(`Error saving data to localStorage for key ${key}:`, error);
    }
};

const getData = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting data from localStorage for key ${key}:`, error);
        return null;
    }
};



export { saveData, getData };