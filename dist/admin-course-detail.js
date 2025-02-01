import { createUserTable } from "./utils/dom.js";
import { getCourseDetails, getCourseUsers, updateCourse } from "./utils/http-helper.js";
import { mapFormToICourse } from "./utils/map-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";
import { config } from "./config/config.js";
import { addImgOptions, getUrlID, updateImagePreview } from "./utils/course-services.js";
import { displayMessage } from "./utils/message.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const courseForm = document.querySelector('#update-course-form');
const initApp = () => {
    const id = getUrlID();
    addImgOptions();
    loadCourseDetails(id);
    loadCourseCustomers(id);
    updateLoginStatusText();
};
const loadCourseDetails = async (id) => {
    displayCourseDetails(await getCourseDetails(id));
};
const loadCourseCustomers = async (id) => {
    displayCourseCustomers(await getCourseUsers(id));
};
const displayCourseDetails = (course) => {
    document.querySelector('#title').value = course.title;
    document.querySelector('#courseNr').value = course.courseNr;
    document.querySelector('#lengthDays').value = course.lengthDays;
    document.querySelector('#onSite').checked = course.onSite;
    document.querySelector('#remote').checked = course.remote;
    document.querySelector('#startDate').value = course.startDate;
    document.querySelector('#price').value = course.price;
    document.querySelector('#image-select').value = course.img;
    updateImagePreview(course.img);
};
const displayCourseCustomers = (users) => {
    const table = createUserTable(users);
    document.querySelector('#course-customers-div')
        .appendChild(table);
};
const handleCourseUpdate = async (e) => {
    e.preventDefault();
    const course = mapFormToICourse(new FormData(courseForm));
    updateCourse(getUrlID(), course);
    displayMessage('Kurs Uppdaterad', course.title, `${config.pages.adminCourseDetail}?id=${getUrlID()}`);
};
courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);
