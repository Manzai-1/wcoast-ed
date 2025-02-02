import { ICourse } from "./models/ICourse";
import { createUserTable } from "./utils/dom.js";
import { getCourseDetails, getCourseUsers, updateCourse } from "./utils/http-helper.js";
import { mapFormToICourse } from "./utils/map-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login-services.js";
import { config } from "./config/config.js";
import { addImgOptions, getUrlID, updateImagePreview } from "./utils/course-services.js";
import { IUser } from "./models/IUser";
import { displayMessage } from "./utils/message.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const courseForm = document.querySelector<HTMLFormElement>('#update-course-form')!;

const initApp = ()=>{
    const id:string = getUrlID();
    addImgOptions();
    loadCourseDetails(id);
    loadCourseCustomers(id);
    updateLoginStatusText();
}

const loadCourseDetails = async(id:string)=>{
    displayCourseDetails(await getCourseDetails(id));
}

const loadCourseCustomers = async(id:string)=>{
    displayCourseCustomers(await getCourseUsers(id));
}

const displayCourseDetails = (course:ICourse)=>{
    document.querySelector<HTMLInputElement>('#title')!.value       = course.title;
    document.querySelector<HTMLInputElement>('#courseNr')!.value    = course.courseNr;
    document.querySelector<HTMLInputElement>('#lengthDays')!.value  = course.lengthDays;
    document.querySelector<HTMLInputElement>('#onSite')!.checked    = course.onSite;
    document.querySelector<HTMLInputElement>('#remote')!.checked    = course.remote;
    document.querySelector<HTMLInputElement>('#startDate')!.value   = course.startDate;
    document.querySelector<HTMLInputElement>('#price')!.value       = course.price;
    document.querySelector<HTMLSelectElement>('#image-select')!.value = course.img;

    updateImagePreview(course.img);
}

const displayCourseCustomers = (users:IUser[])=>{
    const table:HTMLTableElement = createUserTable(users);
    document.querySelector<HTMLDivElement>('#course-customers-div')!
        .appendChild(table);
}

const handleCourseUpdate = async(e:SubmitEvent)=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(courseForm));
    updateCourse(getUrlID(), course);

    displayMessage(
        'Kurs Uppdaterad',
        course.title,
        `${config.pages.adminCourseDetail}?id=${getUrlID()}`);
}

courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);