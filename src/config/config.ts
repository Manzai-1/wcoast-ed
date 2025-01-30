export const config = {
    endpoint: {
        courses: 'http://localhost:3000/courses',
        registry: 'http://localhost:3000/registrations'
    },
    localStorage: {
        key: 'user'
    },
    images: {
        url: '../../src/assets/images/courses',
        list: [
            'default.png',
            'blockchain.png',
            'html.png',
            'javascript.png',
            'programming.png'
        ]
    },
    pages: {
        courseDetail: './course-detail.html',
        courses: './courses.html',
        adminCourseDetail: './admin-course-detail.html',
        adminCourses: './admin-courses.html'
    }
}