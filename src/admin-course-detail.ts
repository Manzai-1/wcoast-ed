import { ICourse } from "./models/ICourse";
import { IRegistration } from "./models/IRegistration";
import { createUserTable } from "./utils/dom.js";
import { getData, updateData } from "./utils/http-services.js";
import { mapFormToICourse } from "./utils/map-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { config } from "./config/config.js";
import { addImgOptions, displayMessage, getUrlID, updateImagePreview } from "./utils/course-services.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const courseForm = document.querySelector<HTMLFormElement>('#update-course-form')!;

const initApp = ()=>{
    const id:string = location.search.split('=')[1];
    loadCourseDetails(id);
    addImgOptions();
    loadCourseCustomers(id);
    updateLoginStatusText();
}

const loadCourseDetails = async(id:string)=>{
    const course:ICourse[] = await getData(`${config.endpoint.courses}?id=${id}`);
    displayCourseDetails(course[0]);
}

const loadCourseCustomers = async(id:string)=>{
    const registry:IRegistration[] = await getData(`${config.endpoint.registry}?id=${id}`);
    displayCourseCustomers(registry[0]);
}

const displayCourseDetails = (course:ICourse)=>{
    document.querySelector<HTMLInputElement>('#title')!.value = course.title;
    document.querySelector<HTMLInputElement>('#courseNr')!.value = course.courseNr;
    document.querySelector<HTMLInputElement>('#lengthDays')!.value = course.lengthDays;
    document.querySelector<HTMLInputElement>('#onSite')!.checked = course.onSite;
    document.querySelector<HTMLInputElement>('#remote')!.checked = course.remote;
    document.querySelector<HTMLInputElement>('#startDate')!.value = course.startDate;
    document.querySelector<HTMLInputElement>('#price')!.value = course.price;
    document.querySelector<HTMLSelectElement>('#image-select')!.value = course.img;

    updateImagePreview(course.img);
}

const displayCourseCustomers = (registry:IRegistration)=>{
    const table:HTMLTableElement = createUserTable(registry ? registry.users:[])
    document.querySelector<HTMLDivElement>('#course-customers-div')!
        .appendChild(table);
}

const handleCourseUpdate = async(e:SubmitEvent)=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(courseForm));
    updateData(`${config.endpoint.courses}/${getUrlID()}`, course);

    displayMessage(
        'Kurs Uppdaterad',
        course.title,
        `${config.pages.adminCourseDetail}?id=${getUrlID()}`);
}

courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);