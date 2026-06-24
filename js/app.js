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

const doClearScreen = () => {
    equation = '';
    calculatorInput.textContent = '';
    calculatorResult.textContent = '';
};

const doAppendNumber = n => {
    // Parse floats
    if(n === '.') {
        const tokens = equation.trim().split(' ');
        const lastIndex = tokens[tokens.length - 1];

        if(!lastIndex || OPERATORS.includes(lastIndex))
            equation += '0';

        if(lastIndex?.includes('.'))
            return;
    }

    equation += n;
    calculatorInput.textContent = equation;
};

const doRenderKeypad = () => {
    const keypad = {
        backspace: {
            value: '⌫',
            action: doBackspace,
            order: 1,
            type: 'operator',
        },
        clear: {
            value: 'AC',
            action: doClearScreen,
            order: 2,
            type: 'operator',
        },
        remainder: {
            value: '%',
            action: () => {},
            order: 3,
            type: 'operator',
        },
        divide: {
            value: '÷',
            action: () => {},
            order: 4,
            type: 'operator',
        },
        7: {
            value: 7,
            action: () => {},
            order: 5,
            type: 'number',
        },
        8: {
            value: 8,
            action: () => {},
            order: 6,
            type: 'number',
        },
        9: {
            value: 9,
            action: () => {},
            order: 7,
            type: 'number',
        },
        multiply: {
            value: '×',
            action: () => {},
            order: 8,
            type: 'operator',
        },
        4: {
            value: 4,
            action: () => {},
            order: 9,
            type: 'number',
        },
        5: {
            value: 5,
            action: () => {},
            order: 10,
            type: 'number',
        },
        6: {
            value: 6,
            action: () => {},
            order: 11,
            type: 'number',
        },
        subtract: {
            value: '-',
            action: () => {},
            order: 12,
            type: 'operator',
        },
        1: {
            value: 1,
            action: () => {},
            order: 13,
            type: 'number',
        },
        2: {
            value: 2,
            action: () => {},
            order: 14,
            type: 'number',
        },
        3: {
            value: 3,
            action: () => {},
            order: 15,
            type: 'number',
        },
        add: {
            value: '+',
            action: () => {},
            order: 16,
            type: 'operator',
        },
        0: {
            value: 0,
            action: () => {},
            order: 17,
            type: 'number',
        },
        decimal: {
            value: '.',
            action: () => {},
            order: 18,
            type: 'number',
        },
        sign: {
            value: '+/-',
            action: () => {},
            order: 19,
            type: 'number',
        },
        equals: {
            value: '=',
            action: () => {},
            order: 20,
            type: 'operator',
        },
    }

    for(let key in keypad) {
        const calculatorButton = document.createElement('button');
        calculatorButton.setAttribute('type', 'button');
        calculatorButton.classList.add(`button-${keypad[key].type}`);
        calculatorButton.textContent = keypad[key].value;
        calculatorButton.style.order = keypad[key].order;
        calculatorButton.addEventListener('click', keypad[key].action);
        calculatorKeypad.appendChild(calculatorButton);
    }
};
