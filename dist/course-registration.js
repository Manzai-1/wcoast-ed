import { getData, postData } from "./utils/http-services.js";
import { mapFormToIUser } from "./utils/map-services.js";
const regDiv = document.querySelector('#registration-fields');
const registerForm = document.querySelector('#user-registration-form');
const registerBtn = document.querySelector('#register-user-btn');
const emailInput = document.querySelector('#email');
const initApp = () => {
    const id = location.search.split('=')[1];
    regDiv.style.display = 'none';
};
const handleRegisterUser = async (e) => {
    e.preventDefault();
    const courseID = location.search.split('=')[1];
    console.log(regDiv.style.display);
    const user = await getUser(emailInput.value);
    if (user.length > 0) {
        // register user to course
    }
    else if (!regStarted()) {
        regDiv.style.display = 'block';
        registerBtn.textContent = 'Registrera som ny användare';
    }
    else {
        // register new user
        const user = mapFormToIUser(new FormData(registerForm));
        try {
            postData('http://localhost:3000/users', user);
        }
        catch (error) {
            console.error(error);
        }
        // register user to course
    }
};
const regStarted = () => {
    return regDiv.style.display === 'none' ? false : true;
};
const getUser = async (id) => {
    const response = await getData(`http://localhost:3000/users?id=${id}`);
    const user = await response.json();
    return user;
};
registerForm.addEventListener('submit', handleRegisterUser);
document.addEventListener('DOMContentLoaded', initApp);
