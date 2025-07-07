const initialCourses = {
    JavaScript: { name: "JavaScript", days: 0, hours: 0 },
    Python: { name: "Python", days: 0, hours: 0 },
    "HTML + CSS": { name: "HTML + CSS", days: 0, hours: 0 },
};

export const getCourses = () => {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : initialCourses;
};

export const saveCourses = (courses) => {
    localStorage.setItem("courses", JSON.stringify(courses));
};

export const resetCourses = () => {
    localStorage.removeItem("courses");
    return initialCourses;
};
