import { ICourse } from "./models/ICourse";
import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { createCourseDiv, createImageSelectDiv } from "./utils/dom.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { config } from "./config/config.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const form:HTMLFormElement = document.querySelector<HTMLFormElement>('#new-course')!;
const list = document.querySelector<HTMLDivElement>('#course-list')!;

const initApp = ()=>{
    addImgOptions();
    loadCourses();
    updateLoginStatusText();
}

const handleSaveCourse = async(e: SubmitEvent):Promise<void>=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(form));
    postData(config.endpoint.courses, course);

    clearForm();
    loadCourses();
}

const loadCourses = async()=>{
    const courses:ICourse[] = await getData(config.endpoint.courses);
    displayCourses(courses);
}

const displayCourses = (courses: ICourse[])=>{
    list.innerHTML = '';
    courses.forEach((course)=>{
        const div:HTMLDivElement = createCourseDiv(course, 
            `${config.pages.adminCourseDetail}?id=${course.id}`
        );
        list.appendChild(div);
    });
}

const clearForm = ()=>{
    form.querySelectorAll("input").forEach((input)=>{
        if(input.type === 'checkbox'){
            input.checked = false;
        }else {
            input.value = '';
        }
    })

    form.querySelector<HTMLSelectElement>('select')!.selectedIndex = 0;
}

const addImgOptions = ()=>{
    const div = createImageSelectDiv();
    div.querySelector<HTMLSelectElement>('#image-select')!
        .addEventListener('input', handleSelectImage);
    form.querySelector<HTMLDivElement>('#course-form-options-div')!.appendChild(div);
}

const handleSelectImage = (e:Event)=>{
    const imgSelect = e.target as HTMLSelectElement;
    const prevImg = `${config.images.url}/${imgSelect.value}`;
    document.querySelector<HTMLImageElement>('#selected-image')!.src = prevImg;
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);