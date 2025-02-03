import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { Window } from 'happy-dom';
import { displayMessage } from '../utils/message.js';
const docPath = path.join(process.cwd(), 'src/index.html');
const docContent = fs.readFileSync(docPath).toString();
const window = new Window();
const document = window.document;
document.write(docContent);
vi.stubGlobal('document', document);
describe('Create HTML elements and add to DOM', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        document.write(docContent);
    });
    it('Should not find a div in DOM with id="login-div"', () => {
        const elem = document.querySelector('#login-div');
        expect(elem).toBe(null);
    });
    it('Should call displayMessage() to create and display a popup message, and then find a div with id="login-div"', () => {
        displayMessage('', '', '#');
        const elem = document.querySelector('#login-div');
        expect(elem).not.toBe(null);
    });
    it('Should call displayMessage() and find elements <h1> & <p> & <a> & <button> , "', () => {
        displayMessage('', '', '#');
        const elem = document.querySelector('#login-div');
        const h1 = elem?.querySelector('h1');
        const p = elem?.querySelector('p');
        const a = elem?.querySelector('a');
        const button = elem?.querySelector('button');
        expect(h1).not.toBe(null);
        expect(p).not.toBe(null);
        expect(a).not.toBe(null);
        expect(button).not.toBe(null);
    });
});
