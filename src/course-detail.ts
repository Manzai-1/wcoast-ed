import { ICourse } from "./models/ICourse";
import { IRegistration } from "./models/IRegistration";
import { IUser } from "./models/IUser";
import { createCourseDetailDiv } from "./utils/dom.js";
import { getData, postData, updateData } from "./utils/http-services.js";
import { handleUserLogin, isUserLoggedIn, updateLoginStatusText } from "./utils/login.js";
import { getLoginFromStorage } from "./utils/storage.js";

document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const courseDetails:HTMLDivElement = document.querySelector<HTMLDivElement>('#course-detail-div')!;

const initApp = ()=>{
    loadCourseDetails();
    updateLoginStatusText();
}

const loadCourseDetails = async()=>{
    const id:string = location.search.split('=')[1];
    const course:ICourse[] = await getData(`http://localhost:3000/courses?id=${id}`);
    courseDetails.innerHTML = '';
    const courseDetailDiv:HTMLDivElement = createCourseDetailDiv(course[0]);
    courseDetailDiv.querySelector('.register-button')!
        .addEventListener('click', handleRegisterCourse);
    courseDetails.appendChild(courseDetailDiv);
}

const handleRegisterCourse = (e:Event)=>{
    isUserLoggedIn() ? registerCourse() : handleUserLogin();
}

const registerCourse = async()=>{
    const id:string = location.search.split('=')[1];
    const user = getLoginFromStorage() as IUser;
    updateCourseRegistry(id, user);
}

const updateCourseRegistry = async(id:string, user:IUser)=>{
    const registry:IRegistration[] = await getData(`http://localhost:3000/registrations?id=${id}`);
    
    if(registry.length > 0){
        registry[0].users.push(user);
        updateData(`http://localhost:3000/registrations/${id}`, registry[0]);
    } else {
        const newRegistry:IRegistration = { id: id, users: [user] }
        postData('http://localhost:3000/registrations', newRegistry);
    }
}

document.addEventListener('DOMContentLoaded', initApp);