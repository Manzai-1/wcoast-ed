import { ICourse } from '../models/ICourse';

export const createCourseDiv = (course: ICourse, courseDetailUrl:string): HTMLDivElement => {
  const div = document.createElement('div');
  div.innerHTML = 
      `<a href=${courseDetailUrl}>
        <div class="course">
            <img
              src="${course.imgUrl}"
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
    <img src="${course.imgUrl}" alt="${course.title}" class="course-image">
        <div class="course-info">
          <h2 id="course-title" class="course-title">${course.title}</h2>
          ${createCourseDetailP('course-number','Kurs Nummer',course.courseNr)}
          ${createCourseDetailP('course-length','Kurslängd',course.lengthDays)}
          ${createCourseDetailP('course-onsite','Klassrum',course.onSite)}
          ${createCourseDetailP('course-remote','Distans',course.remote)}
          ${createCourseDetailP('course-start-date','Startdatum',course.startDate)}
          ${createCourseDetailP('course-cost','Pris',course.price)}
          <a href="http://127.0.0.1:5500/src/pages/course-registration.html?id=${course.id}">  
            <button class="register-button">Registrera</button>
          </a>
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

export const createUserTable = (): HTMLTableElement => {
  const div = document.createElement('table');
  div.innerHTML = `
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Mobile Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>john.doe@example.com</td>
                    <td>John Doe</td>
                    <td>123 Elm Street</td>
                    <td>+123456789</td>
                  </tr>
                  <tr>
                    <td>jane.smith@example.com</td>
                    <td>Jane Smith</td>
                    <td>456 Oak Avenue</td>
                    <td>+987654321</td>
                  </tr>
                  <tr>
                    <td>sam.wilson@example.com</td>
                    <td>Sam Wilson</td>
                    <td>789 Pine Road</td>
                    <td>+112233445</td>
                  </tr>
                </tbody>
              </table>
  `;
  return div;
};