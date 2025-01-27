import { getData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";
const list = document.querySelector('#course-list');
const initApp = () => {
    loadCourses();
};
const loadCourses = async () => {
    const courses = await getData('http://localhost:3000/courses');
    displayCourses(courses);
};
const displayCourses = (courses) => {
    courses.forEach((course) => {
        const div = createCourseDiv(course, `http://127.0.0.1:5500/src/pages/course-detail.html?id=${course.id}`);
        list.appendChild(div);
    });
};
document.addEventListener('DOMContentLoaded', initApp);
