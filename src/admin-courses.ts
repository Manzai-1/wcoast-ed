const form = document.querySelector<HTMLFormElement>('#new-course')!;
const list = document.querySelector<HTMLDivElement>('#course-list')!;

const initApp = ()=>{
    loadCourses();
}

const handleSaveCourse = async(e: SubmitEvent)=>{
    e.preventDefault();

    const data = new FormData(form);
    data.append('imgUrl','../src/assets/images/no-img.png');
    const body:Object = Object.fromEntries(data);

    try {
        const response:Response = await fetch('http://localhost:3000/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        loadCourses();
    } catch(error) {
        console.error(error);
    }
}

const loadCourses = async()=>{
    try {
        const response:Response = await fetch('http://localhost:3000/courses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(await response.json());
    } catch(error) {
        console.error(error);
    }
}

form.addEventListener('submit',handleSaveCourse);
document.addEventListener('DOMContentLoaded', initApp);