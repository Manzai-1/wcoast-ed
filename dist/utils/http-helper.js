import { config } from '../config/config.js';
import { getData, postData, updateData } from './http-services.js';
export const getCourseUserCount = async (id) => {
    return (await getCourseUsers(id)).length;
};
export const getCourseUsers = async (id) => {
    const registry = await getRegistry(id);
    const users = registry.length > 0 ? registry[0].users : [];
    return users;
};
export const getRegistry = async (id) => {
    const result = await getData(`${config.endpoint.registry}?id=${id}`);
    return result;
};
export const updateRegistry = async (id, user) => {
    const registry = await getRegistry(id);
    if (registry.length > 0) {
        registry[0].users.push(user);
        updateData(`${config.endpoint.registry}/${id}`, registry[0]);
    }
    else {
        const newRegistry = { id: id, users: [user] };
        postData(`${config.endpoint.registry}`, newRegistry);
    }
};
export const getCourseDetails = async (id) => {
    const result = await getData(`${config.endpoint.courses}?id=${id}`);
    return result[0];
};
export const getCourse = async (id) => {
    const result = await getData(`${config.endpoint.courses}?id=${id}`);
    return result[0];
};
export const getCourses = async () => {
    return await getData(config.endpoint.courses);
};
export const updateCourse = async (id, course) => {
    updateData(`${config.endpoint.courses}/${id}`, course);
};
export const createCourse = async (course) => {
    postData(config.endpoint.courses, course);
};
