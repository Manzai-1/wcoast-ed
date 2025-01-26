import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { createCourseCard } from "./utils/dom.js";
const form = document.querySelector('#new-course');
const list = document.querySelector('#course-list');
const initApp = () => {
    loadCourses();
};
const handleSaveCourse = async (e) => {
    e.preventDefault();
    const course = mapFormToICourse(new FormData(form));
    try {
        postData('http://localhost:3000/courses', course);
    }
    catch (error) {
        console.error(error);
    }
};
const loadCourses = async () => {
    try {
        const response = await getData('http://localhost:3000/courses');
        const courses = await response.json();
        displayCourses(courses);
    }
    catch (error) {
        console.error(error);
    }
};
const displayCourses = (courses) => {
    courses.forEach((course) => {
        const div = createCourseCard(course, '../../src/pages/admin-course-detail.html');
        list.appendChild(div);
    });
};
form.addEventListener('submit', handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);
