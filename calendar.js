// Global month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to generate the calendar for a given month and year
function showMonth(monthIndex, year) {
    const calendarDisplay = document.getElementById("calendar-display");
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];

    // Clear existing calendar
    calendarDisplay.innerHTML = "";

    // Display the month name and year
    const monthTitle = document.createElement("h2");
    monthTitle.textContent = `${monthNames[monthIndex]} ${year}`;
    calendarDisplay.appendChild(monthTitle);

    // Create the calendar table
    const calendarTable = document.createElement("table");
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //"test comment"

    // Add days of the week header
    const headerRow = document.createElement("tr");
    daysOfWeek.forEach(day => {
        const dayCell = document.createElement("th");
        dayCell.textContent = day;
        headerRow.appendChild(dayCell);
    });
    calendarTable.appendChild(headerRow);

    // Generate calendar dates for the given month
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    let date = 1;
    const firstDay = new Date(year, monthIndex, 1).getDay();

    // Fill weeks
    for (let i = 0; i < 6; i++) { // max 6 weeks
        const weekRow = document.createElement("tr");

        for (let j = 0; j < 7; j++) { // 7 days
            const dayCell = document.createElement("td");
            if (i === 0 && j < firstDay) {
                // Blank cell if the month does not start on this weekday
                dayCell.textContent = "";
            } else if (date > daysInMonth) {
                // End the loop when we reach the end of the month
                dayCell.textContent = "";
            } else {
                // Fill in the date
                dayCell.textContent = date;
                date++;
            }
            weekRow.appendChild(dayCell);
        }
        calendarTable.appendChild(weekRow);
    }

    calendarDisplay.appendChild(calendarTable);
}

// Function to change the year
function changeYear(offset) {
    currentYear += offset;
    showMonth(currentMonth, currentYear);
}

function addRecipe() {
    alert("Add Recipe button clicked!"); // Replace with form/modal to add a recipe
}

// Sidebar month selection function
function selectMonth(monthIndex) {
    currentMonth = monthIndex;
    showMonth(currentMonth, currentYear);
}

// Show the current month and year on page load
document.addEventListener("DOMContentLoaded", () => {
    showMonth(currentMonth, currentYear);

    // Attach event listeners to sidebar months
    document.querySelectorAll("#month-list li").forEach((li, index) => {
        li.addEventListener("click", () => selectMonth(index));
    });
});
