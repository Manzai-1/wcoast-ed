import { ICourse } from "../models/ICourse";

export const mapFormToICourse = (data:FormData):ICourse=>{
    return {
        title: getString(data.get('title') as string),
        courseNr: getNumber(data.get('courseNr') as string),
        lengthDays: getNumber(data.get('lengthDays') as string),
        onSite: getBool(data.get('onSite') as string),
        remote: getBool(data.get('remote') as string),
        startDate: getNumber(data.get('startDate') as string),
        price: getNumber(data.get('price') as string),
        imgUrl: '../../src/assets/images/no-img.png',
    };
}

const getString = (str:string|null):string=>{
    return str !== null ? str : '';
}

const getNumber = (nr:string|null):string=>{
    return nr !== null ? nr : '0';
}

const getBool = (str:string|null):string=>{
    return str !== null ? 'Ja' : 'Nej';
}