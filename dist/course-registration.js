import { getData, postData, updateData } from "./utils/http-services.js";
import { mapFormToIUser } from "./utils/map-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const registerForm = document.querySelector('#user-registration-form');
const initApp = () => {
    updateLoginStatusText();
};
const handleRegisterUser = async (e) => {
    e.preventDefault();
    const id = location.search.split('=')[1];
    const user = mapFormToIUser(new FormData(registerForm));
    const registry = await getCourseRegistry(id);
    if (registry.length > 0) {
        registry[0].users.push(user);
        try {
            updateData(`http://localhost:3000/registrations/${id}`, registry[0]);
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        const newRegistry = {
            id: id,
            users: [user]
        };
        try {
            postData('http://localhost:3000/registrations', newRegistry);
        }
        catch (error) {
            console.error(error);
        }
    }
};
const getCourseRegistry = async (id) => {
    try {
        const response = await getData(`http://localhost:3000/registrations?id=${id}`);
        const registry = await response.json();
        return registry;
    }
    catch (error) {
        throw new Error(error);
    }
};
registerForm.addEventListener('submit', handleRegisterUser);
document.addEventListener('DOMContentLoaded', initApp);
