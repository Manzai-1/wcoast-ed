export const saveToStorage = (key:string, obj:any)=>{
    localStorage.setItem(key, JSON.stringify(obj));
}

export const getFromStorage = (key:string):any=>{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const removeFromStorage =(key:string)=>{
    localStorage.removeItem(key);
}
