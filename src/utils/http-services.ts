import { config } from "../config/config.js";
import { ICourse } from "../models/ICourse";
import { IRegistration } from "../models/IRegistration";
import { IUser } from "../models/IUser";
import { displayMessage } from "./message.js";


export const postData = async (endPoint: string,data: ICourse | IUser | IRegistration
) => {
  try {
    const response: Response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if(!response.ok){
      throw new Error(`${response.status} - ${endPoint}`);
    }
  } catch (error: any) {
    displayMessage('Error',error,config.pages.main);
  }
};

export const getData = async (endPoint: string): Promise<any> => {
  try {
    const response:Response = await fetch(endPoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(response.ok){
      return await response.json();
    }else {
      throw new Error(`${response.status} - ${endPoint}`);
    }
  } catch (error: any) {
    displayMessage('Error',error,config.pages.main);
  }
};

export const updateData = async (endPoint: string, data: IRegistration|ICourse) => {
  try {
    const response:Response = await fetch(endPoint, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if(!response.ok){
      throw new Error(`${response.status} - ${endPoint}`);
    }
  } catch (error: any) {
    displayMessage('Error',error,config.pages.main);
  }
};
