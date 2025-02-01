import { mapFormToICourse } from "./utils/map-services.js";
import { createCourse, getCourses } from "./utils/http-helper.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";
import { config } from "./config/config.js";
import { addImgOptions, displayCourses, displayMessage } from "./utils/course-services.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const form = document.querySelector('#new-course');
const initApp = () => {
    addImgOptions();
    loadCourses();
    updateLoginStatusText();
};
const loadCourses = async () => {
    displayCourses(await getCourses(), config.pages.adminCourseDetail);
};
const handleSaveCourse = async (e) => {
    e.preventDefault();
    const course = mapFormToICourse(new FormData(form));
    createCourse(course);
    displayMessage('Kurs sparad', course.title, config.pages.adminCourses);
};
form.addEventListener('submit', handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);
