import { createMessageDiv } from "./dom.js";
export const displayMessage = (msgHead, msgBody, forwardUrl) => {
    const messageDiv = createMessageDiv(msgHead, msgBody, forwardUrl);
    document.body.appendChild(messageDiv);
};
