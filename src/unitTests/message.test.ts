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

describe('Create HTML elements and add to DOM', ()=>{
    beforeEach(()=>{
        document.body.innerHTML = '';
        document.write(docContent);
    });

    it('Should call displayMessage() to create a popup message, and then find a div with id="login-div"', ()=>{
        displayMessage('','','#');
        const elems = document.querySelectorAll('#login-div');
        expect(elems.length > 0).toBe(true);
    });
});