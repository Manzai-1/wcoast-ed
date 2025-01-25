import { ICourse } from "./models/ICourse";
import { mapFormToICourse } from "./utils/course-services.js";
import { postData } from "./utils/http-services.js";

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
    } catch(error:any)
    {
        console.error(error);
    }
}

const loadCourses = async()=>{
    try {
        const response:Response = await fetch('http://localhost:3000/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(await response.json());
    } catch(error) {
        console.error(error);
    }
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);