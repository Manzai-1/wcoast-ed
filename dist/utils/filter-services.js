import { config } from '../config/config.js';
import { getData } from './http-services.js';
export const filterCourses = async (courses, filterTitle, showOnSite, showRemote, showPopular) => {
    const filterCourses = [];
    for (const course of courses) {
        let include = true;
        if (filterTitle)
            include = course.title.toLowerCase().
                includes(filterTitle.toLocaleLowerCase());
        if (include && !showOnSite)
            include = course.onSite === 'Nej' ? true : false;
        if (include && !showRemote)
            include = course.remote === 'Nej' ? true : false;
        if (include && showPopular)
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
