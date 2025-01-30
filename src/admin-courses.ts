import { ICourse } from "./models/ICourse";
import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { config } from "./config/config.js";
import { addImgOptions, displayCourses } from "./utils/course-services.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const form:HTMLFormElement = document.querySelector<HTMLFormElement>('#new-course')!;

const initApp = ()=>{
    addImgOptions();
    loadCourses();
    updateLoginStatusText();
}

const loadCourses = async()=>{
    const courses:ICourse[] = await getData(config.endpoint.courses);
    displayCourses(courses, config.pages.adminCourseDetail);
}

const clearForm = ()=>{
    form.querySelector<HTMLSelectElement>('select')!.selectedIndex = 0;
    form.querySelectorAll("input").forEach((input)=>{
        if(input.type === 'checkbox'){
            input.checked = false;
        }else {
            input.value = '';
        }
    })
}

const handleSaveCourse = async(e: SubmitEvent):Promise<void>=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(form));
    postData(config.endpoint.courses, course);

    clearForm();
    loadCourses();
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);