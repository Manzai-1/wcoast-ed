import { config } from '../config/config.js';
import { createLoginDiv } from './dom.js';
import { mapFormToIUser } from './map-services.js';
import {
  removeFromStorage,
  getFromStorage,
  saveToStorage,
} from './storage.js';

export const handleUserLogin = () => {
  isUserLoggedIn() ? userLogout() : userLogin();
};

export const updateLoginStatusText = () => {
    document.querySelector('#login-menu-item')!.querySelector('a')!.textContent =
        isUserLoggedIn() ? 'Logga ut' : 'Logga in';
};

export const isUserLoggedIn = () => {
    return getFromStorage(config.localStorage.key) ? true : false;
};

const userLogin = () => {
    const div: HTMLDivElement = createLoginDiv();
    document.body.appendChild(div);

    div
        .querySelector<HTMLFormElement>('#user-registration-form')!
        .addEventListener('submit', saveUser);
    div
        .querySelector<HTMLButtonElement>('#cancel-login-btn')!
        .addEventListener('click', removeLoginForm);
};

const saveUser = (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    saveToStorage(config.localStorage.key, mapFormToIUser(formData));
    updateLoginStatusText();
    removeLoginForm(e);
};

const userLogout = () => {
    removeFromStorage(config.localStorage.key);
    updateLoginStatusText();
};

const removeLoginForm = (e: Event | SubmitEvent) => {
    const elem = e.target as HTMLElement;
    const elemIsForm = elem.classList.contains('user-registration-form')
        ? true
        : false;
    const div = elemIsForm
        ? (elem.parentElement as HTMLDivElement)
        : (elem.parentElement!.parentElement as HTMLDivElement);
    div.remove();
};


