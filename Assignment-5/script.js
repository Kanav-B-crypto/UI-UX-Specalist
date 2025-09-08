//Q1.
// let num1 = parseFloat(prompt("Enter the first number:"));
// let num2 = parseFloat(prompt("Enter the second number:"));

// let sum = num1 + num2;
// let difference = num1 - num2;
// let product = num1 * num2;
// let quotient = num2 !== 0 ? num1 / num2 : "Division by zero not allowed";

// document.write("<h3>Results:</h3>");
// document.write("Sum: " + sum + "<br>");
// document.write("Difference: " + difference + "<br>");
// document.write("Product: " + product + "<br>");
// document.write("Quotient: " + quotient + "<br>");
//-------------------------------------------------------


//Q2.
// let numbers = [23, 5, 87, 12, 44];
// let largest = Math.max(...numbers);
// let smallest = Math.min(...numbers);
// let ascending = [...numbers].sort((a, b) => a - b);
// let descending = [...numbers].sort((a, b) => b - a);

// document.write("<h3>Array: " + numbers + "</h3>");
// document.write("Largest Number: " + largest + "<br>");
// document.write("Smallest Number: " + smallest + "<br>");
// document.write("Ascending Order: " + ascending + "<br>");
// document.write("Descending Order: " + descending + "<br>");
//-------------------------------------------------------


//Q3.
// const form = document.getElementById('userForm');
// const errorMsg = document.getElementById('errorMsg');

// form.addEventListener('submit', function(event) {
//   event.preventDefault();
//   let name = document.getElementById('name').value.trim();
//   let email = document.getElementById('email').value.trim();
//   let age = document.getElementById('age').value.trim();
//   let errors = [];

//   if (name === '') errors.push("Name cannot be empty.");
  
//   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailPattern.test(email)) errors.push("Invalid email format.");
  
//   age = Number(age);
//   if (isNaN(age) || age < 18 || age > 100) errors.push("Age must be a number between 18 and 100.");

//   if (errors.length > 0) {
//     errorMsg.innerHTML = errors.join("<br>");
//   } else {
//     errorMsg.innerHTML = "Form submitted successfully!";
//   }
// });
//-------------------------------------------------------


//Q4.
// let student = {
//   name: "John Doe",
//   age: 20,
//   grades: 85
// };

// student.class = "12th Grade";
// student.grades = 90;

// document.write("<h3>Student Information:</h3>");
// for (let key in student) {
//   document.write(key + ": " + student[key] + "<br>");
// }
//-------------------------------------------------------


//Q5.
function processArray(numbers) {
  let result = numbers
    .filter(num => num % 2 === 0)   // Remove odd numbers
    .map(num => num * 2);           // Multiply remaining by 2

  let sum = result.reduce((acc, num) => acc + num, 0); // Sum of resulting numbers

  return { processedArray: result, sum: sum };
}

let numbers = [1, 2, 3, 4, 5, 6];
let output = processArray(numbers);

document.write("<h3>Original Array: " + numbers + "</h3>");
document.write("Processed Array: " + output.processedArray + "<br>");
document.write("Sum of Processed Array: " + output.sum + "<br>");
//-------------------------------------------------------

