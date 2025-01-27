import { createUserTable } from "./utils/dom.js";
import { getData, updateData } from "./utils/http-services.js";
import { mapFormToICourse } from "./utils/map-services.js";
const courseForm = document.querySelector('#update-course-form');
const initApp = () => {
    const id = location.search.split('=')[1];
    loadCourseDetails(id);
    loadCourseCustomers(id);
};
const loadCourseDetails = async (id) => {
    const course = await getData(`http://localhost:3000/courses?id=${id}`);
    displayCourseDetails(course[0]);
};
const loadCourseCustomers = async (id) => {
    const registry = await getData(`http://localhost:3000/registrations?id=${id}`);
    displayCourseCustomers(registry[0]);
};
const displayCourseDetails = (course) => {
    document.querySelector('#title').value = course.title;
    document.querySelector('#courseNr').value = course.courseNr;
    document.querySelector('#lengthDays').value = course.lengthDays;
    document.querySelector('#onSite').checked =
        course.onSite === 'Ja' ? true : false;
    document.querySelector('#remote').checked =
        course.remote === 'Ja' ? true : false;
    document.querySelector('#startDate').value = course.startDate;
    document.querySelector('#price').value = course.price;
};
const displayCourseCustomers = (registry) => {
    const table = createUserTable(registry ? registry.users : []);
    document.querySelector('#course-customers-div')
        .appendChild(table);
};
const handleCourseUpdate = async (e) => {
    e.preventDefault();
    const id = location.search.split('=')[1];
    const course = mapFormToICourse(new FormData(courseForm));
    updateData(`http://localhost:3000/courses/${id}`, course);
};
courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);
