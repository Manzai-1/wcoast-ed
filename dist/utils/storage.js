export const saveLoginToStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
export const getLoginFromStorage = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
};
export const clearLoginFromStorage = () => {
    localStorage.removeItem('user');
};
