import { config } from '../config/config.js';
import { ICourse } from '../models/ICourse.js';
import { IRegistration } from '../models/IRegistration.js';
import { IUser } from '../models/IUser.js';
import { getData, postData, updateData } from './http-services.js';


export const getCourseUserCount = async(id:string):Promise<number>=>{
  return (await getCourseUsers(id)).length;
}

export const getCourseUsers = async(id:string):Promise<IUser[]>=>{
  const registry:IRegistration[] = await getRegistry(id);
  const users:IUser[] = registry.length > 0 ? registry[0].users : [];
  return users;
}

export const getRegistry = async(id:string):Promise<IRegistration[]>=>{
  const result:IRegistration[] = await getData(`${config.endpoint.registry}?id=${id}`);
  return result;
}

export const updateRegistry = async(id:string, user:IUser)=>{
  const registry:IRegistration[] = await getRegistry(id);
    
  if(registry.length > 0){
      registry[0].users.push(user);
      updateData(`${config.endpoint.registry}/${id}`, registry[0]);
  } else {
      const newRegistry:IRegistration = { id: id, users: [user] }
      postData(`${config.endpoint.registry}`, newRegistry);
  }
}

export const getCourseDetails = async(id:string):Promise<ICourse>=>{
  const result:ICourse[] = await getData(`${config.endpoint.courses}?id=${id}`);
  return result[0];
}

export const getCourse = async(id:string):Promise<ICourse>=>{
  const result:ICourse[] = await getData(`${config.endpoint.courses}?id=${id}`);
  return result[0];
}

export const getCourses = async():Promise<ICourse[]>=>{
  return await getData(config.endpoint.courses);
}

export const updateCourse = async(id:string, course:ICourse)=>{
  updateData(`${config.endpoint.courses}/${id}`, course);
}

export const createCourse = async(course:ICourse)=>{
  postData(config.endpoint.courses, course);
}
