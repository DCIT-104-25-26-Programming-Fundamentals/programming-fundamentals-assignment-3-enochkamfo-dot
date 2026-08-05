// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

let students = [];

/**
 * Calculates the average of an array of scores.
 * @param {number[]} scores
 * @returns {number} The average score.
 */
function calculateAverage(scores) {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  return sum / scores.length;
}

/**
 * Prompts the user for a student's details and adds them to the students array.
 */
function addStudent() {
  const name = readlineSync.question("Student name: ");
  const id = readlineSync.questionInt("Student ID: ");
  const scoreCount = readlineSync.questionInt("How many scores? ");

  if (scoreCount <= 0) {
    console.log("Error: Number of scores must be a positive integer.");
    return;
  }

  const scores = [];
  for (let i = 0; i < scoreCount; i++) {
    const score = readlineSync.questionInt(`Enter score ${i + 1}: `);
    scores.push(score);
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}

/**
 * Displays a formatted table of all students, their scores, and averages.
 */
function displayAllStudents() {
  if (students.length === 0) {
    console.log("No students have been added yet.");
    return;
  }

  console.log("\nName            ID          Scores              Average");
  console.log("-----------------------------------------------------------");

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = calculateAverage(student.scores).toFixed(2);

    console.log(
      `${student.name.padEnd(16)}${String(student.id).padEnd(12)}${student.scores
        .join(", ")
        .padEnd(20)}${average}`
    );
  }
}

/**
 * Prompts the user for a student ID and prints that student's average score.
 */
function calculateStudentAverage() {
  const id = readlineSync.questionInt("Enter student ID: ");

  const student = students.find((s) => s.id === id);

  if (!student) {
    console.log("Error: No student found with that ID.");
    return;
  }

  const average = calculateAverage(student.scores).toFixed(2);
  console.log(`${student.name}'s average score: ${average}`);
}

/**
 * Displays the main menu.
 */
function printMenu() {
  console.log("\n================================");
  console.log("   STUDENT RECORD SYSTEM MENU");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

function main() {
  let running = true;

  while (running) {
    printMenu();
    const choice = readlineSync.questionInt("Enter your choice (1-4): ");

    switch (choice) {
      case 1:
        addStudent();
        break;
      case 2:
        displayAllStudents();
        break;
      case 3:
        calculateStudentAverage();
        break;
      case 4:
        console.log("Goodbye!");
        running = false;
        break;
      default:
        console.log("Error: Please enter a number between 1 and 4.");
    }
  }
}

main();
