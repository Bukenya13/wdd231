// Courses Data
const coursesData = [
    {
        code: 'WDD 130',
        title: 'Web Fundamentals',
        credits: 3,
        category: 'WDD',
        description: 'Introduction to web development basics including HTML, CSS, and responsive design principles.',
        status: 'completed'
    },
    {
        code: 'WDD 131',
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        category: 'WDD',
        description: 'Learn JavaScript fundamentals to make web pages interactive and dynamic.',
        status: 'completed'
    },
    {
        code: 'WDD 230',
        title: 'Web Frontend Development I',
        credits: 4,
        category: 'WDD',
        description: 'Advanced frontend development techniques including APIs, storage, and modern JavaScript patterns.',
        status: 'completed'
    },
    {
        code: 'WDD 231',
        title: 'Web Frontend Development II',
        credits: 4,
        category: 'WDD',
        description: 'Build professional web applications with advanced frameworks and best practices.',
        status: 'pending'
    },
    {
        code: 'CSE 110',
        title: 'Programming Building Blocks',
        credits: 3,
        category: 'CSE',
        description: 'Fundamentals of programming logic and problem-solving using Python.',
        status: 'completed'
    },
    {
        code: 'CSE 111',
        title: 'Programming with Functions',
        credits: 3,
        category: 'CSE',
        description: 'Advanced Python programming with functions, loops, and data structures.',
        status: 'completed'
    },
    {
        code: 'CSE 210',
        title: 'Programming with Classes',
        credits: 4,
        category: 'CSE',
        description: 'Object-oriented programming principles and design patterns.',
        status: 'pending'
    },
    {
        code: 'CSE 220',
        title: 'Object Oriented Design',
        credits: 4,
        category: 'CSE',
        description: 'Advanced object-oriented design concepts and software architecture principles.',
        status: 'pending'
    }
];

// Render Courses
function renderCourses(filter = 'all') {
    const container = document.getElementById('courses-container');
    container.innerHTML = '';
    
    let filteredCourses = coursesData;
    if (filter !== 'all') {
        filteredCourses = coursesData.filter(course => course.category === filter);
    }
    
    if (filteredCourses.length === 0) {
        container.innerHTML = '<div class="no-courses"><p>No courses found for this filter.</p></div>';
        updateTotalCredits([]);
        return;
    }
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = course.status === 'completed' ? 'course-card completed' : 'course-card';
        const statusClass = course.status === 'completed' ? 'status-completed' : 'status-pending';
        const statusText = course.status === 'completed' ? 'Completed' : 'Pending';
        courseCard.innerHTML = `
            <div class="course-header">
                <h3 class="course-code">${course.code}</h3>
                <span class="credits-badge">${course.credits} cr</span>
            </div>
            <h4 class="course-title">${course.title}</h4>
            <p class="course-description">${course.description}</p>
            <div class="course-status ${statusClass}">
                ${statusText}
            </div>
        `;
        container.appendChild(courseCard);
    });
    
    
    updateTotalCredits(filteredCourses);
}

// Update Total Credits
function updateTotalCredits(courses) {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

// Filter Button Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Render filtered courses
            const filter = button.getAttribute('data-filter');
            renderCourses(filter);
        });
    });
    
    // Initial render - all courses
    renderCourses('all');
});
