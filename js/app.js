// Query selector shortcut
const $ = queryToMatch => document.querySelector(queryToMatch);

// UI references
const calculatorInput = $('.keypad-input');
const calculatorResult = $('.keypad-result');
const calculatorKeypad = $('.calculator-keypad-container');

// Core components
const OPERATORS = ['+', '-', '*', '/', '%'];
let equation = '';

// Basic operations
const doAddition = (a, b) => a + b;
const doSubtraction = (a, b) => a - b;
const doMultiplication = (a, b) => a * b;
const doDivision = (a, b) => a / b;
const doRemainder = (a, b) => a % b;

const doBackspace = () => {
    equation = calculatorInput.textContent = calculatorInput.textContent.slice(0, -1);
};
