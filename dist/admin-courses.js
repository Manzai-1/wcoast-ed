import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { config } from "./config/config.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const form = document.querySelector('#new-course');
const list = document.querySelector('#course-list');
const initApp = () => {
    loadCourses();
    updateLoginStatusText();
};
const handleSaveCourse = async (e) => {
    e.preventDefault();
    const course = mapFormToICourse(new FormData(form));
    postData(config.endpoint.courses, course);
    clearForm();
    loadCourses();
};
const loadCourses = async () => {
    const courses = await getData(config.endpoint.courses);
    displayCourses(courses);
};
const displayCourses = (courses) => {
    list.innerHTML = '';
    courses.forEach((course) => {
        const div = createCourseDiv(course, `${config.pages.adminCourseDetail}?id=${course.id}`);
        list.appendChild(div);
    });
};
const clearForm = () => {
    form.querySelectorAll("input").forEach((input) => {
        if (input.type === 'checkbox') {
            input.checked = false;
        }
        else {
            input.value = '';
        }
    });
};
form.addEventListener('submit', handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);
