import { IUser } from "../models/IUser"

export const saveLoginToStorage = (user:IUser)=>{
    localStorage.setItem('user', JSON.stringify(user));
}

export const getLoginFromStorage = ():IUser|null=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
}

export const clearLoginFromStorage =()=>{
    localStorage.removeItem('user');
}
