import { config } from "../config/config.js";
import { IUser } from "../models/IUser"

export const saveLoginToStorage = (user:IUser)=>{
    localStorage.setItem(config.localStorage.key, JSON.stringify(user));
}

export const getLoginFromStorage = ():IUser|null=>{
    const storedUser = localStorage.getItem(config.localStorage.key);
    return storedUser ? JSON.parse(storedUser) : null;
}

export const clearLoginFromStorage =()=>{
    localStorage.removeItem(config.localStorage.key);
}
