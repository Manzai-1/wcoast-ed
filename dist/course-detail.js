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
    const id = location.search.split('=')[1];
    const course = await getData(`http://localhost:3000/courses?id=${id}`);
    courseDetails.innerHTML = '';
    const courseDetailDiv = createCourseDetailDiv(course[0]);
    courseDetailDiv.querySelector('.register-button')
        .addEventListener('click', handleRegisterCourse);
    courseDetails.appendChild(courseDetailDiv);
};
const handleRegisterCourse = (e) => {
    isUserLoggedIn() ? registerCourse() : handleUserLogin();
};
const registerCourse = async () => {
    const id = location.search.split('=')[1];
    const user = getLoginFromStorage();
    updateCourseRegistry(id, user);
};
const updateCourseRegistry = async (id, user) => {
    const registry = await getData(`http://localhost:3000/registrations?id=${id}`);
    if (registry.length > 0) {
        registry[0].users.push(user);
        updateData(`http://localhost:3000/registrations/${id}`, registry[0]);
    }
    else {
        const newRegistry = { id: id, users: [user] };
        postData('http://localhost:3000/registrations', newRegistry);
    }
};
document.addEventListener('DOMContentLoaded', initApp);
