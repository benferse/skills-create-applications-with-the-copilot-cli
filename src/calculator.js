#!/usr/bin/env node

/*
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   +  Addition
 *   -  Subtraction
 *   *  Multiplication (also accepts 'x' or 'X')
 *   /  Division
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *
 * Examples:
 *   node calculator.js 5 + 3      -> 8
 *   node calculator.js 10 - 4     -> 6
 *   node calculator.js 6 x 7      -> 42
 *   node calculator.js 20 / 4     -> 5
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
    case 'x':
    case 'X':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      throw new Error(`Unsupported operator: '${operator}'. Use one of: + - * /`);
  }
}

function printUsage() {
  console.log('Usage: node calculator.js <number1> <operator> <number2>');
  console.log('Operators: +  -  *  /');
  console.log('Example:   node calculator.js 5 + 3');
}

function main(argv) {
  const args = argv.slice(2);

  if (args.length !== 3) {
    printUsage();
    process.exit(1);
  }

  const a = Number(args[0]);
  const operator = args[1];
  const b = Number(args[2]);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: Both operands must be valid numbers.');
    process.exit(1);
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv);
}

module.exports = { add, subtract, multiply, divide, calculate };
