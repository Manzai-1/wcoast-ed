import { config } from '../config/config.js';
import { ICourse } from '../models/ICourse';
import { IUser } from '../models/IUser';

export const createCourseDiv = (course: ICourse, courseDetailUrl:string): HTMLDivElement => {
  const div = document.createElement('div');
  div.innerHTML = 
      `<a href=${courseDetailUrl}>
        <div class="course">
            <img
              src="${config.images.url}/${course.img}"
              alt="${course.title}"
              class="course-image"/>
            <div class="course-img-details">
              <h2 class="course-img-title">${course.title}</h2>
              <p class="course-img-date">Start Date: ${course.startDate}</p>
            </div>
          </div>
        </a>`;
  return div;
};

export const createCourseDetailDiv = (course:ICourse):HTMLDivElement => {
  const div = document.createElement('div');
  div.innerHTML = `
    <img src="${config.images.url}/${course.img}" alt="${course.title}" class="course-image">
        <div class="course-info">
          <h2 id="course-title" class="course-title">${           course.title}</h2>
          ${createCourseDetailP('course-number','Kurs Nummer',    course.courseNr)}
          ${createCourseDetailP('course-length','Kurslängd' ,     course.lengthDays)}
          ${createCourseDetailP('course-onsite','Klassrum',       course.onSite ? 'Ja' : 'Nej')}
          ${createCourseDetailP('course-remote','Distans',        course.remote ? 'Ja' : 'Nej')}
          ${createCourseDetailP('course-start-date','Startdatum', course.startDate)}
          ${createCourseDetailP('course-cost','Pris',             course.price)} 
          <button class="register-button">Registrera</button>
        </div>
        `;
  return div;
}

const createCourseDetailP = (id:string, description:string, value:string):string =>{
  const p:string = `
          <p class="course-detail">
            <span class="course-description">${description}:</span>
            <span id="${id}" class="course-value">${value}</span>
          </p>
  `;
  return p;
}

export const createUserTable = (users:IUser[]|[]): HTMLTableElement => {
  const table = document.createElement('table');
  table.classList.add('customer-table');
  table.innerHTML = `
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                ${users.map((user)=>createUserTr(user)).join('')}
                </tbody>
              </table>
  `;
  return table;
};

const createUserTr = (user:IUser):string=>{
  return `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.address}</td>
      <td>${user.mobileNr}</td>
    </tr>
  `;
}

export const createImageSelectDiv = ():HTMLDivElement=>{
  const values:string[] = config.images.list;

  const div = document.createElement('div');
  div.classList.add('image-option-div');
  div.innerHTML = `
        <label for="image-select">Kursbild:</label>
        <select id="image-select" class="image-dropdown" name="img-select">
        </select>
        <img 
          id="selected-image" 
          src="${config.images.url}/${config.images.list[0]}" 
          alt="Selected Image" 
          class="course-image">
  `;

  const select = div.querySelector<HTMLSelectElement>('select')!;
  values.forEach((value)=>{
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  return div;
}

export const createLoginDiv = ():HTMLDivElement=>{
  const div = document.createElement('div');
  div.id = '#login-div';
  div.classList.add('course-form');
  div.classList.add('popup');
  div.innerHTML = `
        <form id="user-registration-form" class="user-registration-form">
          <div class="form-control">
            <label for="email">Epost</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div class="form-control">
            <label for="name">Namn</label>
            <input type="text" name="name" id="name" required/>
          </div>
          <div class="form-control">
            <label for="address">Adress</label>
            <input type="text" name="address" id="address" required/>
          </div>
          <div class="form-control">
            <label for="mobile">Mobilnummer</label>
            <input type="tel" name="mobile" id="mobile" required/>
          </div>
          <button id="submit-login-btn" class="btn" type="submit">Logga in</button>
          <button id="cancel-login-btn" class="btn" type="button">Avbryt</button>
        </form>
  `;
  return div;
}

export const createMessageDiv = (
  msgHead:string, 
  msgBody:string, 
  forwardUrl:string
):HTMLDivElement=>{
  const div = document.createElement('div');
  div.id = '#login-div';
  div.classList.add('course-form');
  div.classList.add('popup');
  div.innerHTML = `
          <h1>${msgHead}</h1>
          <p>${msgBody}</p>
          <a href="${forwardUrl}">
            <button class="btn">Ok</button>
          </a>
  `;
  return div;
}