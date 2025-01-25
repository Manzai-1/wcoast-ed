import { ICourse } from "../models/ICourse";
import { IRegistration } from "../models/IRegistration";
import { IUser } from "../models/IUser";

export const postData = async(endPoint:string, data:ICourse|IUser|IRegistration)=>{
    try {
        const response:Response = await fetch(endPoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    } catch(error:any) {
        throw new Error(error);
    }
}
