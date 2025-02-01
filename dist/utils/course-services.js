import { config } from "../config/config.js";
import { createCourseDiv, createImageSelectDiv } from "./dom.js";
export const addImgOptions = () => {
    const div = createImageSelectDiv();
    div.querySelector('#image-select')
        .addEventListener('input', handleSelectImage);
    document.querySelector('#course-form-options-div').appendChild(div);
};
export const updateImagePreview = (img) => {
    document.querySelector('#selected-image').src =
        `${config.images.url}/${img}`;
};
export const getUrlID = () => {
    return location.search.split('=')[1];
};
export const displayCourses = (courses, forwardUrl) => {
    const list = document.querySelector('#course-list');
    list.innerHTML = '';
    courses.forEach((course) => {
        const div = createCourseDiv(course, `${forwardUrl}?id=${course.id}`);
        list.appendChild(div);
    });
};
const handleSelectImage = (e) => {
    const imgSelect = e.target;
    updateImagePreview(imgSelect.value);
};
