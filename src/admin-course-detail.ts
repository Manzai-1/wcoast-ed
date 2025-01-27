import { ICourse } from "./models/ICourse";
import { IRegistration } from "./models/IRegistration";
import { createUserTable } from "./utils/dom.js";
import { getData, postData, updateData } from "./utils/http-services.js";
import { mapFormToICourse } from "./utils/map-services.js";

const courseForm = document.querySelector<HTMLFormElement>('#update-course-form')!;

const initApp = ()=>{
    const id:string = location.search.split('=')[1];
    loadCourseDetails(id);
    loadCourseCustomers(id);
}

const loadCourseDetails = async(id:string)=>{
    try{
        const response:Response = await getData(`http://localhost:3000/courses?id=${id}`);
        const course:ICourse[] = await response.json();
        displayCourseDetails(course[0]);
    }catch(error:any){
        console.error(error);
    }
}

const loadCourseCustomers = async(id:string)=>{
    try{
        const response:Response = await getData(`http://localhost:3000/registrations?id=${id}`);
        const registry:IRegistration[] = await response.json();
        displayCourseCustomers(registry[0]);
    }catch(error:any){
        console.error(error);
    }
}

const displayCourseDetails = (course:ICourse)=>{
    document.querySelector<HTMLInputElement>('#title')!.value = course.title;
    document.querySelector<HTMLInputElement>('#courseNr')!.value = course.courseNr;
    document.querySelector<HTMLInputElement>('#lengthDays')!.value = course.lengthDays;
    document.querySelector<HTMLInputElement>('#onSite')!.checked = 
        course.onSite === 'Ja' ? true:false;
    document.querySelector<HTMLInputElement>('#remote')!.checked = 
        course.remote === 'Ja' ? true:false;
    document.querySelector<HTMLInputElement>('#startDate')!.value = course.startDate;
    document.querySelector<HTMLInputElement>('#price')!.value = course.price;
}

const displayCourseCustomers = (registry:IRegistration)=>{
    const table:HTMLTableElement = createUserTable(registry ? registry.users:[])
    document.querySelector<HTMLDivElement>('#course-customers-div')!
        .appendChild(table);
}

const handleCourseUpdate = async(e:SubmitEvent)=>{
    e.preventDefault();
    const id:string = location.search.split('=')[1];

    const course:ICourse = mapFormToICourse(new FormData(courseForm));
    try{
        updateData(`http://localhost:3000/courses/${id}`, course);
    } catch(error:any){
        console.error(error);
    }
}

courseForm.addEventListener('submit', handleCourseUpdate);
document.addEventListener('DOMContentLoaded', initApp);