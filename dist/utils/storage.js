import { config } from "../config/config.js";
export const saveLoginToStorage = (user) => {
    localStorage.setItem(config.localStorage.key, JSON.stringify(user));
};
export const getLoginFromStorage = () => {
    const storedUser = localStorage.getItem(config.localStorage.key);
    return storedUser ? JSON.parse(storedUser) : null;
};
export const clearLoginFromStorage = () => {
    localStorage.removeItem(config.localStorage.key);
};
