let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
    return course.Classification.Open === false;
}

function doesTermMatch(course) {

    if (searchTerm === "") return true;

    const term = searchTerm.toLowerCase();

    const code = course.Code.toLowerCase();
    const title = course.Title.toLowerCase();
    const crn = course.CRN.toString();

    const instructors = course.Instructors
        .map(i => i.Name.toLowerCase())
        .join(" ");

    return (
        code.includes(term) ||
        title.includes(term) ||
        crn.includes(term) ||
        instructors.includes(term)
    );
}

function dataToHTML(course) {

    const open = course.Classification.Open;

    const instructorNames = course.Instructors
        .map(i => i.Name)
        .join(", ");

    const seatsAvailable = course.EnrollmentMax - course.EnrollmentCurrent;

    const waitlist = course.WaitlistMax - course.WaitlistAvailable;

    if (open) {
        return `
        <section class="course-card">
            <h2>${course.Code}: ${course.Title}</h2>

            <p class="status open">
                <i class="fa-solid fa-circle-check"></i>
                Open &bull; ${course.CRN} &bull; Seats Available: ${seatsAvailable}
            </p>

            <p>
                ${course.Days} &bull; ${course.Location.FullLocation} &bull; ${course.Hours} credit hour(s)
            </p>

            <p>
                <strong>${instructorNames}</strong>
            </p>
        </section>
        `;
    } else {
        return `
        <section class="course-card">
            <h2>${course.Code}: ${course.Title}</h2>

            <p class="status closed">
                <i class="fa-solid fa-circle-xmark"></i>
                Closed &bull; ${course.CRN} &bull; Number on Waitlist ${waitlist}
            </p>

            <p>
                ${course.Days ?? "TBA"} &bull; ${course.Location.FullLocation ?? "TBA"} &bull; ${course.Hours} credit hour(s)
            </p>

            <p>
                <strong>${instructorNames}</strong>
            </p>
        </section>
        `;
    }
}

function showMatchingCourses() {

    const container = document.querySelector(".courses");

    container.innerHTML = "";

    let matches = courseList.filter(course => {

        const termMatch = doesTermMatch(course);

        const openMatch = openOnly ? !isClassFull(course) : true;

        return termMatch && openMatch;
    });

    if (matches.length === 0) {
        container.innerHTML = "<p>No courses match your search.</p>";
        return;
    }

    matches.forEach(course => {
        container.insertAdjacentHTML(
            "beforeend",
            dataToHTML(course)
        );
    });
}

function filterCourses() {

    searchTerm = document.querySelector("#search_term").value;

    openOnly = document.querySelector("#is_open").checked;

    showMatchingCourses();
}

showMatchingCourses();
