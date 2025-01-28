import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);

const initApp = ()=>{
    updateLoginStatusText();
}


document.addEventListener('DOMContentLoaded', initApp);