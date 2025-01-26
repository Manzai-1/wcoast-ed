import { ICourse } from "./models/ICourse";
import { getData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";

const list = document.querySelector<HTMLDivElement>('#course-list')!;

const initApp = ()=>{
    loadCourses();
}

const loadCourses = async()=>{
    try{
        const response:Response = await getData('http://localhost:3000/courses');
        const courses:ICourse[] = await response.json();
        displayCourses(courses);
    }catch(error){
        console.error(error);
    }
}

const displayCourses = (courses: ICourse[])=>{
    courses.forEach((course)=>{
        const div:HTMLDivElement = createCourseDiv(course, 
            `http://127.0.0.1:5500/src/pages/course-detail.html?id=${course.id}`
        );
        list.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', initApp);