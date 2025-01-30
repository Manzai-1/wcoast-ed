import { ICourse } from "./models/ICourse";
import { getData } from "./utils/http-services.js";
import { handleUserLogin, updateLoginStatusText } from "./utils/login.js";
import { filterCourses } from "./utils/filter-services.js";
import { config } from "./config/config.js";
import { displayCourses } from "./utils/course-services.js";
import { mapFormToIFilter } from "./utils/map-services.js";


document.querySelector('#login-menu-item')!.addEventListener('click', handleUserLogin);
const searchForm = document.querySelector<HTMLFormElement>('#search-form')!;

const initApp = ()=>{
    loadCourses().then((courses:ICourse[]) => displayCourses(courses, config.pages.courseDetail));
    updateLoginStatusText();
}

const loadCourses = async():Promise<ICourse[]>=>{
    const courses:ICourse[] = await getData(config.endpoint.courses);
    return courses;
}

const handleSearchInput = async(e:Event)=>{
    const data = new FormData(searchForm);
    const courses:ICourse[] = await filterCourses(
        await loadCourses(), 
        mapFormToIFilter(data));
    displayCourses(courses, config.pages.courseDetail);
}

searchForm.addEventListener('input', handleSearchInput);
document.addEventListener('DOMContentLoaded', initApp);