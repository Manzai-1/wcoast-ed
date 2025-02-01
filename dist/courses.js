import { getCourses } from "./utils/http-helper.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";
import { filterCourses } from "./utils/filter-services.js";
import { config } from "./config/config.js";
import { displayCourses } from "./utils/course-services.js";
import { mapFormToIFilter } from "./utils/map-services.js";
document.querySelector('#login-menu-item').addEventListener('click', handleUserLogin);
const searchForm = document.querySelector('#search-form');
const initApp = () => {
    loadCourses();
    updateLoginStatusText();
};
const loadCourses = async () => {
    const courses = await getCourses();
    displayCourses(courses, config.pages.courseDetail);
};
const handleSearchInput = async (e) => {
    const data = new FormData(searchForm);
    const courses = await filterCourses(await getCourses(), mapFormToIFilter(data));
    displayCourses(courses, config.pages.courseDetail);
};
searchForm.addEventListener('input', handleSearchInput);
document.addEventListener('DOMContentLoaded', initApp);
