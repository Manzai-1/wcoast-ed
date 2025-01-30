import { config } from '../config/config.js';
import { ICourse } from '../models/ICourse';
import { IFilter } from '../models/IFilter.js';
import { IRegistration } from '../models/IRegistration';
import { getData } from './http-services.js';

export const filterCourses = async(
    courses: ICourse[],
    filter:IFilter
    ):Promise<ICourse[]> => {
    const filterCourses: ICourse[] = [];
    console.log(filter);
    for(const course of courses) {
        let include = true;

        if(filter.title) include = course.title.toLowerCase().
            includes(filter.title.toLocaleLowerCase());
        if(include && !filter.onSite) include = course.onSite ? false : true;
        if(include && !filter.remote) include = course.remote ? false : true;
        if(include && filter.popular) include =  await getCourseUserCount(course.id!) >= 3 ? true:false;
        if(include) filterCourses.push(course);
    }
    return filterCourses;
};

const getCourseUserCount = async(id:string):Promise<number>=>{
    const registry:IRegistration[] = await getData(`${config.endpoint.registry}?id=${id}`);
    const count:number = registry.length > 0 ? registry[0].users.length : 0;
    return count;
}
