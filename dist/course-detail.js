import { config } from "./config/config.js";
import { displayMessage, getUrlID } from "./utils/course-services.js";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getData, postData, updateData } from "./utils/http-services.js";
import { handleUserLogin, isUserLoggedIn, updateLoginStatusText } from "./utils/login.js";
import { getLoginFromStorage } from "./utils/storage.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const courseDetails = document.querySelector('#course-detail-div');
const initApp = () => {
    loadCourseDetails();
    updateLoginStatusText();
};
const loadCourseDetails = async () => {
    const course = await getData(`${config.endpoint.courses}?id=${getUrlID()}`);
    courseDetails.innerHTML = '';
    const courseDetailDiv = createCourseDetailDiv(course[0]);
    courseDetailDiv.querySelector('.register-button')
        .addEventListener('click', handleRegisterCourse);
    courseDetails.appendChild(courseDetailDiv);
};
const registerCourse = async () => {
    const user = getLoginFromStorage();
    updateCourseRegistry(getUrlID(), user);
    displayMessage('Registrering klar', '', config.pages.courses);
};
const updateCourseRegistry = async (id, user) => {
    const registry = await getData(`${config.endpoint.registry}?id=${id}`);
    if (registry.length > 0) {
        registry[0].users.push(user);
        updateData(`${config.endpoint.registry}/${id}`, registry[0]);
    }
    else {
        const newRegistry = { id: id, users: [user] };
        postData(`${config.endpoint.registry}`, newRegistry);
    }
};
const handleRegisterCourse = (e) => {
    isUserLoggedIn() ? registerCourse() : handleUserLogin();
};
document.addEventListener('DOMContentLoaded', initApp);
