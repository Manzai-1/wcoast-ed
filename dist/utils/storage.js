export const saveToStorage = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
};
export const getFromStorage = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};
export const removeFromStorage = (key) => {
    localStorage.removeItem(key);
};
