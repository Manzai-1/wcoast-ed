import { config } from "../config/config.js";
import { ICourse } from "../models/ICourse";
import { IFilter } from "../models/IFilter.js";
import { IUser } from "../models/IUser";

export const mapFormToICourse = (data:FormData):ICourse=>{
    return {
        title:      mapNull(data.get('title'),  'N/A'),
        courseNr:   mapNull(data.get('courseNr'), 'N/A'),
        lengthDays: mapNull(data.get('lengthDays'), 'N/A'),
        startDate:  mapNull(data.get('startDate'), 'N/A'),
        price:      mapNull(data.get('price'), 'N/A'),
        onSite:     data.get('onSite') ? true : false,
        remote:     data.get('remote') ? true : false,
        img:        `${data.get('img-select')}`
    };
}

export const mapFormToIUser = (data:FormData):IUser=>{
    return {
        id:         mapNull(data.get('email')),
        name:       mapNull(data.get('name')),
        address:    mapNull(data.get('address')),
        mobileNr:   mapNull(data.get('mobile')),
    };
}

export const mapFormToIFilter = (data:FormData):IFilter=>{
    return {
        title:      mapNull(data.get('title')),
        onSite:     data.get('onSite') ? true : false,
        remote:     data.get('remote') ? true : false,
        popular:    data.get('popular') ? true : false,
    }
}

const mapNull = (str:any, altStr:string=''):string=>{
    return str ? str : altStr;
}