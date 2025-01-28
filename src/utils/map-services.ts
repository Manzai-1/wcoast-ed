import { ICourse } from "../models/ICourse";
import { IUser } from "../models/IUser";

export const mapFormToICourse = (data:FormData):ICourse=>{
    return {
        title:      getString(data.get('title') as string),
        courseNr:   getNumber(data.get('courseNr') as string),
        lengthDays: getNumber(data.get('lengthDays') as string),
        onSite:     getBool(data.get('onSite') as string),
        remote:     getBool(data.get('remote') as string),
        startDate:  getNumber(data.get('startDate') as string),
        price:      getNumber(data.get('price') as string),
        imgUrl:     '../../src/assets/images/no-img.png',
    };
}

export const mapFormToIUser = (data:FormData):IUser=>{
    return {
        id:         getString(data.get('email') as string),
        name:       getString(data.get('name') as string),
        address:    getString(data.get('address') as string),
        mobileNr:   getString(data.get('mobile') as string),
    };
}

const getString = (str:string|null):string=>{
    return str ? str : '';
}

const getNumber = (nr:string|null):string=>{
    return nr ? nr : '0';
}

const getBool = (str:string|null):string=>{
    return str ? 'Ja' : 'Nej';
}