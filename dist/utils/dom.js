export const createCourseDiv = (course) => {
    const div = document.createElement('div');
    div.innerHTML =
        `<div class="course">
            <img
              src="${course.imgUrl}"
              alt="${course.title}"
              class="course-image" />
            <div class="course-details">
              <h2 class="course-title">${course.title}</h2>
              <p class="course-date">Start Date: ${course.startDate}</p>
            </div>
          </div>`;
    return div;
};
export const createUserTable = () => {
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
