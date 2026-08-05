// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

/**
 * Reads a matrix of the given size from the user.
 * @param {number} rows - Number of rows.
 * @param {number} cols - Number of columns.
 * @returns {number[][]} The matrix entered by the user.
 */
function readMatrix(rows, cols) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      row = readlineSync
        .question(`Enter row ${i + 1}: `)
        .trim()
        .split(/\s+/)
        .map(Number);

      if (row.length === cols && row.every((value) => !isNaN(value))) {
        break;
      }
      console.log(`Error: Please enter exactly ${cols} numbers separated by spaces.`);
    }
    matrix.push(row);
  }

  return matrix;
}

/**
 * Prints a matrix in a neat, aligned grid format.
 * @param {number[][]} matrix - The matrix to print.
 * @param {string} label - A label to print above the matrix.
 */
function printMatrix(matrix, label) {
  console.log(label);
  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].map((value) => String(value).padStart(4)).join(" "));
  }
  console.log("");
}

/**
 * Computes the transpose of a matrix.
 * @param {number[][]} matrix - The M x N matrix to transpose.
 * @returns {number[][]} The transposed N x M matrix.
 */
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let c = 0; c < cols; c++) {
    const newRow = [];
    for (let r = 0; r < rows; r++) {
      newRow.push(matrix[r][c]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * Adds two matrices of the same size element-wise.
 * @param {number[][]} a - The first matrix.
 * @param {number[][]} b - The second matrix.
 * @returns {number[][]} The resulting sum matrix.
 */
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let r = 0; r < rows; r++) {
    const newRow = [];
    for (let c = 0; c < cols; c++) {
      newRow.push(a[r][c] + b[r][c]);
    }
    result.push(newRow);
  }

  return result;
}

/**
 * Multiplies matrix A (M x N) by matrix B (N x P).
 * @param {number[][]} a - The first matrix (M x N).
 * @param {number[][]} b - The second matrix (N x P).
 * @returns {number[][]} The resulting product matrix (M x P).
 */
function multiplyMatrices(a, b) {
  const m = a.length;
  const n = b.length;
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  // ---------------------------------------------------------------------
  // PART A — Transpose a Matrix
  // ---------------------------------------------------------------------
  console.log("=== PART A: Transpose a Matrix ===");
  const rowsA = readlineSync.questionInt("Enter number of rows: ");
  const colsA = readlineSync.questionInt("Enter number of columns: ");
  const matrixA = readMatrix(rowsA, colsA);

  printMatrix(matrixA, "\nOriginal Matrix:");
  const transposed = transposeMatrix(matrixA);
  printMatrix(transposed, "Transposed Matrix:");

  // ---------------------------------------------------------------------
  // PART B — Add Two Matrices
  // ---------------------------------------------------------------------
  console.log("=== PART B: Add Two Matrices ===");
  const addRows = readlineSync.questionInt("Enter number of rows for both matrices: ");
  const addCols = readlineSync.questionInt("Enter number of columns for both matrices: ");

  console.log("\nEnter first matrix:");
  const matrixB1 = readMatrix(addRows, addCols);

  console.log("\nEnter second matrix:");
  const matrixB2 = readMatrix(addRows, addCols);

  const sumMatrix = addMatrices(matrixB1, matrixB2);
  printMatrix(sumMatrix, "\nSum Matrix:");

  // ---------------------------------------------------------------------
  // PART C — Multiply Two Matrices
  // ---------------------------------------------------------------------
  console.log("=== PART C: Multiply Two Matrices ===");
  const mRows = readlineSync.questionInt("Enter number of rows for Matrix A: ");
  const mCols = readlineSync.questionInt("Enter number of columns for Matrix A (= rows for Matrix B): ");
  const pCols = readlineSync.questionInt("Enter number of columns for Matrix B: ");

  console.log("\nEnter Matrix A:");
  const matrixC1 = readMatrix(mRows, mCols);

  console.log("\nEnter Matrix B:");
  const matrixC2 = readMatrix(mCols, pCols);

  const productMatrix = multiplyMatrices(matrixC1, matrixC2);
  printMatrix(productMatrix, "\nProduct Matrix (A x B):");
}

main();

