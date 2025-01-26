import { IRegistration } from "./models/IRegistration";
import { IUser } from "./models/IUser";
import { getData, postData } from "./utils/http-services.js";
import { mapFormToIUser } from "./utils/map-services.js";

const regDiv:HTMLDivElement = document.querySelector<HTMLDivElement>('#registration-fields')!;
const registerForm = document.querySelector<HTMLFormElement>('#user-registration-form')!;
const registerBtn = document.querySelector<HTMLButtonElement>('#register-user-btn')!;
const emailInput = document.querySelector<HTMLInputElement>('#email')!;

const initApp = ()=>{
    const id:string = location.search.split('=')[1];
    regDiv.style.display = 'none';
}

const handleRegisterUser = async(e:SubmitEvent)=>{
    e.preventDefault();
    const courseID:string = location.search.split('=')[1];

    console.log(regDiv.style.display);
    const user = await getUser(emailInput.value);
    if(user.length>0){
        // register user to course
    } else if(!regStarted()){
        regDiv.style.display = 'block';
        registerBtn.textContent = 'Registrera som ny användare';
    } else {
        // register new user
        const user:IUser = mapFormToIUser(new FormData(registerForm));
        try{
            postData('http://localhost:3000/users', user);
        } catch(error:any){
            console.error(error);
        }

        // register user to course
        
    }
}

const regStarted = ():boolean=>{
    return regDiv.style.display === 'none' ? false : true;
}

const getUser = async(id:string):Promise<IUser[]>=>{
    const response:Response = await getData(`http://localhost:3000/users?id=${id}`);
    const user:IUser[] = await response.json();
    return user;
}

registerForm.addEventListener('submit', handleRegisterUser);
document.addEventListener('DOMContentLoaded', initApp);