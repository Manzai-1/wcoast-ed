import { config } from "./config/config.js";
import { displayMessage, getUrlID } from "./utils/course-services.js";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getCourse, updateRegistry } from "./utils/http-helper.js";
import { handleUserLogin, isUserLoggedIn, updateLoginStatusText } from "./utils/login-services.js";
import { getFromStorage } from "./utils/storage.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const courseDetails = document.querySelector('#course-detail-div');
const initApp = () => {
    loadCourseDetails();
    updateLoginStatusText();
};
const loadCourseDetails = async () => {
    const course = await getCourse(getUrlID());
    courseDetails.innerHTML = '';
    const courseDetailDiv = createCourseDetailDiv(course);
    courseDetailDiv.querySelector('.register-button')
        .addEventListener('click', handleRegisterCourse);
    courseDetails.appendChild(courseDetailDiv);
};
const registerCourse = async () => {
    const user = getFromStorage(config.localStorage.key);
    updateRegistry(getUrlID(), user);
    displayMessage('Registrering klar', '', config.pages.courses);
};
const handleRegisterCourse = (e) => {
    isUserLoggedIn() ? registerCourse() : handleUserLogin();
};
document.addEventListener('DOMContentLoaded', initApp);
