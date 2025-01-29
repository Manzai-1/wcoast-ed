import { getData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { filterCourses } from "./utils/filter-services.js";
import { config } from "./config/config.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const searchForm = document.querySelector('#search-form');
const list = document.querySelector('#course-list');
const initApp = () => {
    loadCourses().then((courses) => displayCourses(courses));
    updateLoginStatusText();
};
const loadCourses = async () => {
    const courses = await getData(config.endpoint.courses);
    return courses;
};
const displayCourses = (courses) => {
    list.innerHTML = '';
    courses.forEach((course) => {
        const div = createCourseDiv(course, `${config.pages.courseDetail}?id=${course.id}`);
        list.appendChild(div);
    });
};
const handleSearchInput = async (e) => {
    const title = document.querySelector('#title').value;
    const onSite = document.querySelector('#onSite').checked;
    const remote = document.querySelector('#remote').checked;
    const popular = document.querySelector('#popular').checked;
    const courses = await filterCourses(await loadCourses(), title, onSite, remote, popular);
    displayCourses(courses);
};
searchForm.addEventListener('input', handleSearchInput);
document.addEventListener('DOMContentLoaded', initApp);
