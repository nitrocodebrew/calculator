// Query selector shortcut
const $ = queryToMatch => document.querySelector(queryToMatch);

// UI references
const calculatorInput = $('keypad-input');
const calculatorResult = $('keypad-result');
const calculatorKeypad = $('.calculator-keypad-container ul');

// Test to see the UI references are correct
console.log(calculatorInput);
console.log(calculatorResult);
console.log(calculatorKeypad);