import { ICourse } from "./models/ICourse";
import { mapFormToICourse } from "./utils/map-services.js";
import { getData, postData } from "./utils/http-services.js";
import { createCourseDiv } from "./utils/dom.js";

const form:HTMLFormElement = document.querySelector<HTMLFormElement>('#new-course')!;
const list = document.querySelector<HTMLDivElement>('#course-list')!;

const initApp = ()=>{
    loadCourses();
}

const handleSaveCourse = async(e: SubmitEvent):Promise<void>=>{
    e.preventDefault();

    const course:ICourse = mapFormToICourse(new FormData(form));
    try{
        postData('http://localhost:3000/courses', course);
    } catch(error:any){
        console.error(error);
    }
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
            `http://127.0.0.1:5500/src/pages/admin-course-detail.html?id=${course.id}`
        );
        list.appendChild(div);
    });
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);