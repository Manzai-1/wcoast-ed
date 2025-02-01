import { ICourse } from '../models/ICourse';
import { IFilter } from '../models/IFilter.js';
import { getCourseUserCount } from './http-helper.js';

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
    const userCount:number = await getCourseUserCount(id);
    return userCount >= minUsers;
}
