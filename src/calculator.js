#!/usr/bin/env node

/*
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   +     Addition
 *   -     Subtraction
 *   *     Multiplication (also accepts 'x' or 'X')
 *   /     Division
 *   %     Modulo
 *   ^     Exponentiation (also accepts '**')
 *   sqrt  Square root (unary)
 *
 * Usage:
 *   node calculator.js <number1> <operator> <number2>
 *   node calculator.js sqrt <number>
 *
 * Examples:
 *   node calculator.js 5 + 3      -> 8
 *   node calculator.js 10 - 4     -> 6
 *   node calculator.js 6 x 7      -> 42
 *   node calculator.js 20 / 4     -> 5
 *   node calculator.js 10 % 3     -> 1
 *   node calculator.js 2 ^ 8      -> 256
 *   node calculator.js sqrt 16    -> 4
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute square root of a negative number.');
  }
  return Math.sqrt(n);
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
    case '%':
      return modulo(a, b);
    case '^':
    case '**':
      return power(a, b);
    default:
      throw new Error(`Unsupported operator: '${operator}'. Use one of: + - * / % ^`);
  }
}

function printUsage() {
  console.log('Usage: node calculator.js <number1> <operator> <number2>');
  console.log('       node calculator.js sqrt <number>');
  console.log('Operators: +  -  *  /  %  ^');
  console.log('Example:   node calculator.js 5 + 3');
  console.log('Example:   node calculator.js sqrt 16');
}

function main(argv) {
  const args = argv.slice(2);

  if (args.length === 2 && (args[0] === 'sqrt' || args[1] === 'sqrt')) {
    const operand = args[0] === 'sqrt' ? Number(args[1]) : Number(args[0]);
    if (Number.isNaN(operand)) {
      console.error('Error: Operand must be a valid number.');
      process.exit(1);
    }
    try {
      console.log(squareRoot(operand));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

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

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
