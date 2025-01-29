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
        courseDetail: 'http://127.0.0.1:5500/src/pages/course-detail.html',
        adminCourseDetail: 'http://127.0.0.1:5500/src/pages/admin-course-detail.html'
    }
};
