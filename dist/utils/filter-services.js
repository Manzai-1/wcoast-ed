import { config } from '../config/config.js';
import { getData } from './http-services.js';
export const filterCourses = async (courses, filter) => {
    const filterCourses = [];
    console.log(filter);
    for (const course of courses) {
        let include = true;
        if (filter.title)
            include = course.title.toLowerCase().
                includes(filter.title.toLocaleLowerCase());
        if (include && !filter.onSite)
            include = course.onSite ? false : true;
        if (include && !filter.remote)
            include = course.remote ? false : true;
        if (include && filter.popular)
            include = await getCourseUserCount(course.id) >= 3 ? true : false;
        if (include)
            filterCourses.push(course);
    }
    return filterCourses;
};
const getCourseUserCount = async (id) => {
    const registry = await getData(`${config.endpoint.registry}?id=${id}`);
    const count = registry.length > 0 ? registry[0].users.length : 0;
    return count;
};
