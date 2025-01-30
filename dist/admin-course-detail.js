import { createUserTable } from "./utils/dom.js";
import { getData, updateData } from "./utils/http-services.js";
import { mapFormToICourse } from "./utils/map-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { config } from "./config/config.js";
import { addImgOptions, updateImagePreview } from "./utils/course-services.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const courseForm = document.querySelector('#update-course-form');
const initApp = () => {
    const id = location.search.split('=')[1];
    loadCourseDetails(id);
    addImgOptions();
    loadCourseCustomers(id);
    updateLoginStatusText();
};
const loadCourseDetails = async (id) => {
    const course = await getData(`${config.endpoint.courses}?id=${id}`);
    displayCourseDetails(course[0]);
};
const loadCourseCustomers = async (id) => {
    const registry = await getData(`${config.endpoint.registry}?id=${id}`);
    displayCourseCustomers(registry[0]);
};
const displayCourseDetails = (course) => {
    document.querySelector('#title').value = course.title;
    document.querySelector('#courseNr').value = course.courseNr;
    document.querySelector('#lengthDays').value = course.lengthDays;
    document.querySelector('#onSite').checked =
        course.onSite === 'Ja' ? true : false;
    document.querySelector('#remote').checked =
        course.remote === 'Ja' ? true : false;
    document.querySelector('#startDate').value = course.startDate;
    document.querySelector('#price').value = course.price;
    document.querySelector('#image-select').value = course.img;
    updateImagePreview(course.img);
};
const displayCourseCustomers = (registry) => {
    const table = createUserTable(registry ? registry.users : []);
    document.querySelector('#course-customers-div')
        .appendChild(table);
};
const handleCourseUpdate = async (e) => {
    e.preventDefault();
    const id = location.search.split('=')[1];
    const course = mapFormToICourse(new FormData(courseForm));
    updateData(`${config.endpoint.courses}/${id}`, course);
};
courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);
