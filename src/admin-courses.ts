import { ICourse } from "./models/ICourse";
import { mapFormToICourse } from "./utils/map-services.js";
import { createCourse, getCourses } from "./utils/http-helper.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";
import { config } from "./config/config.js";
import { addImgOptions, displayCourses } from "./utils/course-services.js";
import { displayMessage } from "./utils/message.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const form:HTMLFormElement = document.querySelector<HTMLFormElement>('#new-course')!;

const initApp = ()=>{
    addImgOptions();
    loadCourses();
    updateLoginStatusText();
}

const loadCourses = async()=>{
    displayCourses(await getCourses(), config.pages.adminCourseDetail);
}

const handleSaveCourse = async(e: SubmitEvent):Promise<void>=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(form));
    createCourse(course);

    displayMessage('Kurs sparad',course.title,config.pages.adminCourses);
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);