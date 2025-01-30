import { ICourse } from "./models/ICourse";
import { getData } from "./utils/http-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { filterCourses } from "./utils/filter-services.js";
import { config } from "./config/config.js";
import { displayCourses } from "./utils/course-services.js";


document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const searchForm = document.querySelector('#search-form')!;

const initApp = ()=>{
    loadCourses().then((courses:ICourse[]) => displayCourses(courses, config.pages.courseDetail));
    updateLoginStatusText();
}

const loadCourses = async():Promise<ICourse[]>=>{
    const courses:ICourse[] = await getData(config.endpoint.courses);
    return courses;
}

const handleSearchInput = async(e:Event)=>{
    const title:string = document.querySelector<HTMLInputElement>('#title')!.value;
    const onSite:boolean = document.querySelector<HTMLInputElement>('#onSite')!.checked;
    const remote:boolean = document.querySelector<HTMLInputElement>('#remote')!.checked;
    const popular:boolean = document.querySelector<HTMLInputElement>('#popular')!.checked;

    const courses:ICourse[] = await filterCourses(await loadCourses(), title, onSite, remote, popular)
    displayCourses(courses, config.pages.courseDetail);
}

searchForm.addEventListener('input', handleSearchInput);
document.addEventListener('DOMContentLoaded', initApp);