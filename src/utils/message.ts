import { createMessageDiv } from "./dom.js";

export const displayMessage = (msgHead:string, msgBody:string, forwardUrl:string)=>{
    const messageDiv = createMessageDiv(msgHead, msgBody, forwardUrl);
    document.body.appendChild(messageDiv);
}