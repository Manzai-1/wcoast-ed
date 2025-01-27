import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";
const form = document.querySelector('#new-course');
const list = document.querySelector('#course-list');
const initApp = () => {
    loadCourses();
};
const handleSaveCourse = async (e) => {
    e.preventDefault();
    const course = mapFormToICourse(new FormData(form));
    postData('http://localhost:3000/courses', course);
    clearForm();
    loadCourses();
};
const loadCourses = async () => {
    const courses = await getData('http://localhost:3000/courses');
    displayCourses(courses);
};
const displayCourses = (courses) => {
    list.innerHTML = '';
    courses.forEach((course) => {
        const div = createCourseDiv(course, `http://127.0.0.1:5500/src/pages/admin-course-detail.html?id=${course.id}`);
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
