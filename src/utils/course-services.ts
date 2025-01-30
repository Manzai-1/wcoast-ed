import { config } from "../config/config.js";
import { ICourse } from "../models/ICourse.js";
import { createCourseDiv, createImageSelectDiv } from "./dom.js";

export const addImgOptions = ()=>{
    const div = createImageSelectDiv();
    div.querySelector<HTMLSelectElement>('#image-select')!
        .addEventListener('input', handleSelectImage);
    document.querySelector<HTMLDivElement>('#course-form-options-div')!.appendChild(div);
}

export const updateImagePreview = (img:string)=>{
    document.querySelector<HTMLImageElement>('#selected-image')!.src = 
        `${config.images.url}/${img}`;
}

export const getUrlID = ():string=>{
    return location.search.split('=')[1];
}

export const displayCourses = (courses: ICourse[], forwardUrl:string)=>{
    const list = document.querySelector<HTMLDivElement>('#course-list')!;

    list.innerHTML = '';
    courses.forEach((course)=>{
        const div:HTMLDivElement = createCourseDiv(course, 
            `${forwardUrl}?id=${course.id}`
        );
        list.appendChild(div);
    });
}

const handleSelectImage = (e:Event)=>{
    const imgSelect = e.target as HTMLSelectElement;
    updateImagePreview(imgSelect.value);
}