import { mapFormToICourse } from "./utils/course-services.js";
import { postData } from "./utils/http-services.js";
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
        const response = await fetch('http://localhost:3000/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(await response.json());
    }
    catch (error) {
        console.error(error);
    }
};
form.addEventListener('submit', handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);
