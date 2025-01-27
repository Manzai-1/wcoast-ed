import { ICourse } from "./models/ICourse";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getData } from "./utils/http-services.js";

const courseDetails:HTMLDivElement = document.querySelector<HTMLDivElement>('#course-detail-div')!;

const initApp = ()=>{
    loadCourseDetails();
}

const loadCourseDetails = async()=>{
    const id:string = location.search.split('=')[1];
    const course:ICourse[] = await getData(`http://localhost:3000/courses?id=${id}`);
    courseDetails.innerHTML = '';
    courseDetails.appendChild(createCourseDetailDiv(course[0]));
}

document.addEventListener('DOMContentLoaded', initApp);