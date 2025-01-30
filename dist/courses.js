import { getData } from "./utils/http-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { filterCourses } from "./utils/filter-services.js";
import { config } from "./config/config.js";
import { displayCourses } from "./utils/course-services.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const searchForm = document.querySelector('#search-form');
const initApp = () => {
    loadCourses().then((courses) => displayCourses(courses, config.pages.courseDetail));
    updateLoginStatusText();
};
const loadCourses = async () => {
    const courses = await getData(config.endpoint.courses);
    return courses;
};
const handleSearchInput = async (e) => {
    const title = document.querySelector('#title').value;
    const onSite = document.querySelector('#onSite').checked;
    const remote = document.querySelector('#remote').checked;
    const popular = document.querySelector('#popular').checked;
    const courses = await filterCourses(await loadCourses(), title, onSite, remote, popular);
    displayCourses(courses, config.pages.courseDetail);
};
searchForm.addEventListener('input', handleSearchInput);
document.addEventListener('DOMContentLoaded', initApp);
