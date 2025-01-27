import { createCourseDetailDiv } from "./utils/dom.js";
import { getData } from "./utils/http-services.js";
const courseDetails = document.querySelector('#course-detail-div');
const initApp = () => {
    loadCourseDetails();
};
const loadCourseDetails = async () => {
    const id = location.search.split('=')[1];
    const course = await getData(`http://localhost:3000/courses?id=${id}`);
    courseDetails.innerHTML = '';
    courseDetails.appendChild(createCourseDetailDiv(course[0]));
};
document.addEventListener('DOMContentLoaded', initApp);
