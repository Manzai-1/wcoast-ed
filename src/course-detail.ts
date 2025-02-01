import { config } from "./config/config.js";
import { ICourse } from "./models/ICourse";
import { IUser } from "./models/IUser";
import { getUrlID } from "./utils/course-services.js";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getCourse, updateRegistry } from "./utils/http-helper.js";
import { handleUserLogin, isUserLoggedIn, updateLoginStatusText } from "./utils/login-services.js";
import { displayMessage } from "./utils/message.js";
import { getFromStorage } from "./utils/storage.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const courseDetails:HTMLDivElement = document.querySelector<HTMLDivElement>('#course-detail-div')!;

const initApp = ()=>{
    loadCourseDetails();
    updateLoginStatusText();
}

const loadCourseDetails = async()=>{
    const course:ICourse = await getCourse(getUrlID());

    courseDetails.innerHTML = '';
    const courseDetailDiv:HTMLDivElement = createCourseDetailDiv(course);
    courseDetailDiv.querySelector('.register-button')!
        .addEventListener('click', handleRegisterCourse);
    courseDetails.appendChild(courseDetailDiv);
}

const registerCourse = async()=>{
    const user = getFromStorage(config.localStorage.key) as IUser;
    updateRegistry(getUrlID(), user);
    displayMessage('Registrering klar','',config.pages.courses);
}

const handleRegisterCourse = (e:Event)=>{
    isUserLoggedIn() ? registerCourse() : handleUserLogin();
}

document.addEventListener('DOMContentLoaded', initApp);