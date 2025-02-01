import { config } from '../config/config.js';
import { createLoginDiv } from './dom.js';
import { mapFormToIUser } from './map-services.js';
import { removeFromStorage, getFromStorage, saveToStorage, } from './storage.js';
export const handleUserLogin = () => {
    isUserLoggedIn() ? userLogout() : userLogin();
};
export const updateLoginStatusText = () => {
    document.querySelector('#login-menu-item').querySelector('a').textContent =
        isUserLoggedIn() ? 'Logga ut' : 'Logga in';
};
export const isUserLoggedIn = () => {
    return getFromStorage(config.localStorage.key) ? true : false;
};
const userLogin = () => {
    const div = createLoginDiv();
    document.body.appendChild(div);
    div
        .querySelector('#user-registration-form')
        .addEventListener('submit', saveUser);
    div
        .querySelector('#cancel-login-btn')
        .addEventListener('click', removeLoginForm);
};
const saveUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    saveToStorage(config.localStorage.key, mapFormToIUser(formData));
    updateLoginStatusText();
    removeLoginForm(e);
};
const userLogout = () => {
    removeFromStorage(config.localStorage.key);
    updateLoginStatusText();
};
const removeLoginForm = (e) => {
    const elem = e.target;
    const elemIsForm = elem.classList.contains('user-registration-form')
        ? true
        : false;
    const div = elemIsForm
        ? elem.parentElement
        : elem.parentElement.parentElement;
    div.remove();
};
