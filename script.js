const calculatorDisplay = document.querySelector('h1');
const operatorDisplay = document.querySelector('h3');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let secondValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const calculate = {
    '/': (num1, num2) => num1 / num2,
    '*': (num1, num2) => num1 * num2,
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    '=': (num1, num2) => num2,
}

function getNumberValue(number) {
    if (awaitingNextValue) {    // Second value
        operatorDisplay.textContent = `${operatorDisplay.textContent}${number}`;
        secondValue = Number(operatorDisplay.textContent.substring(1));
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? `${number}` : `${displayValue}${number}`;
        firstValue = Number(calculatorDisplay.textContent);
    }
}

function getOperatorValue(op) {
    let result;
    awaitingNextValue = true;
    if (secondValue) {
        result = calculate[operatorValue](firstValue, secondValue);
        firstValue = result;
        secondValue = 0;
        calculatorDisplay.textContent = firstValue;
    }
    operatorValue = op;
    if (operatorValue !== '=') {
        operatorDisplay.textContent = operatorValue;
    } else {
        operatorDisplay.textContent = '';
        awaitingNextValue = false;
    }
}

function addDecimal() {
    if (awaitingNextValue) {    // Second operand can't be ".34", it has to be "0.34"
        const displayValue = operatorDisplay.textContent;
        operatorDisplay.textContent = displayValue.includes('.') ? displayValue : `${displayValue}.`;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue.includes('.') ? displayValue : `${displayValue}.`;
    }
}

function resetAll() {
    calculatorDisplay.textContent = "0";
    firstValue = 0;
    secondValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

// Add event listeners for numbers, operators and decimal
inputBtns.forEach(inputBtn => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => getNumberValue(parseInt(inputBtn.value)));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => getOperatorValue(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', addDecimal);
    }
});
clearBtn.addEventListener('click', resetAll);