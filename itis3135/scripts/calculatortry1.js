// Initialize variables to track user input and current operation
let displayValue = '';
let firstOperand = null;
let operator = null;
let waitForSecondOperand = false;

// Get the display element
const display = document.getElementById('calculator-display');

// Function to update the display
function updateDisplay() {
    display.value = displayValue;
}

// Function to handle button clicks
function appendToDisplay(value) {
    if (waitForSecondOperand) {
        displayValue = value;
        waitForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? value : displayValue + value;
    }
    updateDisplay();
}

// Function to handle operator clicks
function handleOperatorClick(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        displayValue = String(result);
        firstOperand = result;
    }

    waitForSecondOperand = true;
    operator = nextOperator;
}

// Object to perform calculations based on the operator
const performCalculation = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
};

// Function to handle the equal button click
// Function to handle the equal button click
function handleEqualClick() {
    if (firstOperand !== null && operator) {
        const inputValue = parseFloat(displayValue);
        displayValue = String(performCalculation[operator](firstOperand, inputValue));
        firstOperand = null;
        operator = null;
        waitForSecondOperand = true;
    }
    updateDisplay();
}

// Function to handle the "=" button click to calculate the result
function calculateResult() {
    if (firstOperand !== null && operator) {
        const inputValue = parseFloat(displayValue);
        displayValue = String(performCalculation[operator](firstOperand, inputValue));
        firstOperand = null;
        operator = null;
        waitForSecondOperand = true;
        updateDisplay();
    }
}



// Function to clear the calculator
function clearCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    waitForSecondOperand = false;
    updateDisplay();
}

// Attach click event listeners to buttons
document.querySelectorAll('.button1, .button2, .button3, .button4, .button5, .button6, .button7, .button8, .button9, .button+, .button*, .button-, .button/').forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        if (!isNaN(parseFloat(buttonValue)) || buttonValue === '.') {
            appendToDisplay(buttonValue);
        } else if (buttonValue in performCalculation) {
            handleOperatorClick(buttonValue);
        } else if (buttonValue === '=') {
            handleEqualClick();
        } else if (buttonValue === 'C') {
            clearCalculator();
        }
    });
});

// Initialize the display
updateDisplay();
