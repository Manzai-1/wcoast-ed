import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);

const initApp = ()=>{
    updateLoginStatusText();
}


document.addEventListener('DOMContentLoaded', initApp);