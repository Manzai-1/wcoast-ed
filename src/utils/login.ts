import { createLoginDiv } from './dom.js';
import { mapFormToIUser } from './map-services.js';
import {
  clearLoginFromStorage,
  getLoginFromStorage,
  saveLoginToStorage,
} from './storage.js';

export const handleUserLogin = () => {
  isUserLoggedIn() ? userLogout() : userLogin();
};

export const updateLoginStatusText = () => {
    document.querySelector('#login-menu-item')!.querySelector('a')!.textContent =
        isUserLoggedIn() ? 'Logga ut' : 'Logga in';
};

export const isUserLoggedIn = () => {
    return getLoginFromStorage() ? true : false;
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
    saveLoginToStorage(mapFormToIUser(formData));
    updateLoginStatusText();
    removeLoginForm(e);
};

const userLogout = () => {
    clearLoginFromStorage();
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


