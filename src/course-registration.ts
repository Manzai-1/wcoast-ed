import { IRegistration } from "./models/IRegistration";
import { IUser } from "./models/IUser";
import { getData, postData, updateData } from "./utils/http-services.js";
import { mapFormToIUser } from "./utils/map-services.js";

const registerForm = document.querySelector<HTMLFormElement>('#user-registration-form')!;

const initApp = ()=>{
    const id:string = location.search.split('=')[1];
}

const handleRegisterUser = async(e:SubmitEvent)=>{
    e.preventDefault();
    const id:string = location.search.split('=')[1];
    const user:IUser = mapFormToIUser(new FormData(registerForm));
    const registry:IRegistration[] = await getCourseRegistry(id);

    if(registry.length>0){
        registry[0].users.push(user);
        try{
            updateData(`http://localhost:3000/registrations/${id}`, registry[0]);
        } catch(error:any){
            console.error(error);
        }

    } else {
        const newRegistry:IRegistration = {
            id: id,
            users: [user]
        }

        try{
            postData('http://localhost:3000/registrations', newRegistry);
        } catch(error:any){
            console.error(error);
        }
    }
    
}

const getCourseRegistry = async(id:string):Promise<IRegistration[]>=>{
    try{
        const response:Response = await getData(`http://localhost:3000/registrations?id=${id}`);
        const registry:IRegistration[] = await response.json();
        return registry;
    }catch(error:any){
        throw new Error(error);
    }
}

registerForm.addEventListener('submit', handleRegisterUser);
document.addEventListener('DOMContentLoaded', initApp);