import { getCourseUserCount } from './http-helper.js';
export const filterCourses = async (courses, filter) => {
    const filterCourses = [];
    for (const course of courses) {
        let include = true;
        if (filter.title)
            include =
                course.title.toLowerCase().includes(filter.title.toLowerCase());
        if (include && !filter.onSite)
            include = course.onSite ? false : true;
        if (include && !filter.remote)
            include = course.remote ? false : true;
        if (include && filter.popular)
            include = await isPopular(course.id, 3);
        if (include)
            filterCourses.push(course);
    }
    return filterCourses;
};
const isPopular = async (id, minUsers) => {
    const userCount = await getCourseUserCount(id);
    return userCount >= minUsers;
};
