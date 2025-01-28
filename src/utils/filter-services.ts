import { ICourse } from '../models/ICourse';
import { IRegistration } from '../models/IRegistration';
import { getData } from './http-services.js';

export const filterCourses = async(
    courses: ICourse[],
    filterTitle: string,
    showOnSite: boolean,
    showRemote: boolean,
    showPopular: boolean
    ):Promise<ICourse[]> => {
    const filterCourses: ICourse[] = [];
    
    for(const course of courses) {
        let include = true;

        if(filterTitle) include = course.title.toLowerCase().
            includes(filterTitle.toLocaleLowerCase());

        if(include && !showOnSite) include = course.onSite === 'Nej' ? true : false;
        if(include && !showRemote) include = course.remote === 'Nej' ? true : false;
        if(include && showPopular) include =  await getCourseUserCount(course.id!) >= 3 ? true:false;
        if(include) filterCourses.push(course);
    }
    return filterCourses;
};

const getCourseUserCount = async(id:string):Promise<number>=>{
    const registry:IRegistration[] = await getData(`http://localhost:3000/registrations?id=${id}`);
    const count:number = registry.length > 0 ? registry[0].users.length : 0;
    return count;
}
