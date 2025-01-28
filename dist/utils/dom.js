export const createCourseDiv = (course, courseDetailUrl) => {
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
export const createCourseDetailDiv = (course) => {
    const div = document.createElement('div');
    div.innerHTML = `
    <img src="${course.imgUrl}" alt="${course.title}" class="course-image">
        <div class="course-info">
          <h2 id="course-title" class="course-title">${course.title}</h2>
          ${createCourseDetailP('course-number', 'Kurs Nummer', course.courseNr)}
          ${createCourseDetailP('course-length', 'Kurslängd', course.lengthDays)}
          ${createCourseDetailP('course-onsite', 'Klassrum', course.onSite)}
          ${createCourseDetailP('course-remote', 'Distans', course.remote)}
          ${createCourseDetailP('course-start-date', 'Startdatum', course.startDate)}
          ${createCourseDetailP('course-cost', 'Pris', course.price)}
          <a href="http://127.0.0.1:5500/src/pages/course-registration.html?id=${course.id}">  
            <button class="register-button">Registrera</button>
          </a>
        </div>
        `;
    return div;
};
const createCourseDetailP = (id, description, value) => {
    const p = `
          <p class="course-detail">
            <span class="course-description">${description}:</span>
            <span id="${id}" class="course-value">${value}</span>
          </p>
  `;
    return p;
};
export const createUserTable = (users) => {
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
                ${users.map((user) => createUserTr(user)).join('')}
                </tbody>
              </table>
  `;
    return table;
};
const createUserTr = (user) => {
    return `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.address}</td>
      <td>${user.mobileNr}</td>
    </tr>
  `;
};
export const createLoginDiv = () => {
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
};
