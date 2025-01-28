import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";

const initApp = ()=>{
    updateLoginStatusText();
}


document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
document.addEventListener('DOMContentLoaded', initApp);