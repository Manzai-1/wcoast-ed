import { createCourseDetailDiv } from "./utils/dom.js";
import { getData } from "./utils/http-services.js";
const courseDetails = document.querySelector('#course-detail-div');
const initApp = () => {
    loadCourseDetails();
};
const loadCourseDetails = async () => {
    const id = location.search.split('=')[1];
    try {
        const response = await getData(`http://localhost:3000/courses?id=${id}`);
        const course = await response.json();
        courseDetails.innerHTML = '';
        courseDetails.appendChild(createCourseDetailDiv(course[0]));
    }
    catch (error) {
        console.error(error);
    }
};
document.addEventListener('DOMContentLoaded', initApp);
