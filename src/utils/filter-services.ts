import { config } from '../config/config.js';
import { ICourse } from '../models/ICourse';
import { IFilter } from '../models/IFilter.js';
import { IRegistration } from '../models/IRegistration';
import { getData } from './http-services.js';

export const filterCourses = async(courses: ICourse[],filter:IFilter):Promise<ICourse[]> => {
    const filterCourses: ICourse[] = [];
    for(const course of courses) {
        let include = true;

        if(filter.title) include = 
            course.title.toLowerCase().includes(
            filter.title.toLowerCase());
        if(include && !filter.onSite) include = course.onSite ? false : true;
        if(include && !filter.remote) include = course.remote ? false : true;
        if(include && filter.popular) include =  await isPopular(course.id!, 3);
        if(include) filterCourses.push(course);
    }
    return filterCourses;
};

const isPopular = async(id:string, minUsers:number):Promise<boolean>=>{
    const registry:IRegistration[] = await getData(`${config.endpoint.registry}?id=${id}`);
    const userCount:number = registry.length > 0 ? registry[0].users.length : 0;
    return userCount >= minUsers;
}
