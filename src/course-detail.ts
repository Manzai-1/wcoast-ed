import { ICourse } from "./models/ICourse";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getData } from "./utils/http-services.js";

const courseDetails:HTMLDivElement = document.querySelector<HTMLDivElement>('#course-detail-div')!;

const initApp = ()=>{
    loadCourseDetails();
}

const loadCourseDetails = async()=>{
    const id:string = location.search.split('=')[1];
    try{
        const response:Response = await getData(`http://localhost:3000/courses?id=${id}`);
        const course:ICourse[] = await response.json();
        courseDetails.innerHTML = '';
        courseDetails.appendChild(createCourseDetailDiv(course[0]));
    }catch(error:any){
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', initApp);