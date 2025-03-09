const courses = [
    { code: 'WDD 130', name: 'Web Frontend Development I', credits: 3, completed: true },
    { code: 'WDD 230', name: 'Web Frontend Development II', credits: 3, completed: false },
    { code: 'CSE 110', name: 'Computer Science I', credits: 4, completed: true },
    { code: 'CSE 111', name: 'Computer Science II', credits: 4, completed: false },
    // Add more courses as needed
];

document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const creditCount = document.getElementById('credit-count');

    const displayCourses = (filter) => {
        courseList.innerHTML = '';
        const filteredCourses = courses.filter(course => filter === 'all' || course.code.startsWith(filter));
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card', course.completed ? 'completed' : '');
            courseCard.innerHTML = `
                <h3>${course.code}</h3>
                <p>${course.name}</p>
                <p>Credits: ${course.credits}</p>
            `;
            courseList.appendChild(courseCard);
        });
        creditCount.textContent = filteredCourses.reduce((total, course) => total + course.credits, 0);
    };

    document.getElementById('course-filters').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            displayCourses(event.target.getAttribute('data-filter'));
        }
    });

    displayCourses('all');
});