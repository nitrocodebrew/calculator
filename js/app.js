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

const doAppendOperator = operator => {
    // No equation set
    if(!equation.trim()) 
        return;

    const tokens = equation.trim().split(' ');
    const lastIndex = tokens[tokens.length - 1];

    if(OPERATORS.includes(lastIndex))
        return;

    equation += ` ${operator} `;
    calculatorInput.textContent = equation;
};

const doToggleSign = () => {
    const tokens = equation.trim().split(' ');
    let lastIndex = tokens[tokens.length - 1];

    if(!lastIndex)
        return;

    if(lastIndex === '-') {
        tokens.pop();
        equation = tokens.join(' ');
        calculatorInput.textContent = equation;
        return;
    }

    if(OPERATORS.includes(lastIndex))
        return;

    if(lastIndex.startsWith('-'))
        tokens[lastIndex] = lastIndex.slice(1);
    else
        tokens[lastIndex] = '-' + lastIndex;

    equation = tokens.join(' ');
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
            action: () => doAppendOperator('%'),
            order: 3,
            type: 'operator',
        },
        divide: {
            value: '÷',
            action: () => doAppendOperator('/'),
            order: 4,
            type: 'operator',
        },
        7: {
            value: 7,
            action: () => doAppendNumber(7),
            order: 5,
            type: 'number',
        },
        8: {
            value: 8,
            action: () => doAppendNumber(8),
            order: 6,
            type: 'number',
        },
        9: {
            value: 9,
            action: () => doAppendNumber(9),
            order: 7,
            type: 'number',
        },
        multiply: {
            value: '×',
            action: () => doAppendOperator('*'),
            order: 8,
            type: 'operator',
        },
        4: {
            value: 4,
            action: () => doAppendNumber(4),
            order: 9,
            type: 'number',
        },
        5: {
            value: 5,
            action: () => doAppendNumber(5),
            order: 10,
            type: 'number',
        },
        6: {
            value: 6,
            action: () => doAppendNumber(6),
            order: 11,
            type: 'number',
        },
        subtract: {
            value: '-',
            action: () => doAppendOperator('-'),
            order: 12,
            type: 'operator',
        },
        1: {
            value: 1,
            action: () => doAppendNumber(1),
            order: 13,
            type: 'number',
        },
        2: {
            value: 2,
            action: () => doAppendNumber(2),
            order: 14,
            type: 'number',
        },
        3: {
            value: 3,
            action: () => doAppendNumber(3),
            order: 15,
            type: 'number',
        },
        add: {
            value: '+',
            action: () => doAppendOperator('+'),
            order: 16,
            type: 'operator',
        },
        0: {
            value: 0,
            action: () => doAppendNumber(0),
            order: 17,
            type: 'number',
        },
        decimal: {
            value: '.',
            action: () => doAppendNumber('.'),
            order: 18,
            type: 'number',
        },
        sign: {
            value: '+/-',
            action: () => doToggleSign(),
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
        calculatorButton.classList.add('calculator-keypad-btn')
        calculatorButton.textContent = keypad[key].value;
        calculatorButton.style.order = keypad[key].order;
        calculatorButton.addEventListener('click', keypad[key].action);
        calculatorKeypad.appendChild(calculatorButton);
    }
};

doRenderKeypad();