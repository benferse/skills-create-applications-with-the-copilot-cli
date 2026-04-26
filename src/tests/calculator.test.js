const {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  calculate,
} = require('../calculator');

describe('add', () => {
  test('2 + 3 = 5 (example from image)', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('adds two positive numbers', () => {
    expect(add(10, 15)).toBe(25);
  });

  test('adds a positive and a negative number', () => {
    expect(add(10, -4)).toBe(6);
  });

  test('adds two negative numbers', () => {
    expect(add(-7, -3)).toBe(-10);
  });

  test('adds zero (identity)', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(42, 0)).toBe(42);
  });

  test('adds floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe('subtract', () => {
  test('10 - 4 = 6 (example from image)', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('subtracts to a negative result', () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test('subtracts a negative number (double negative)', () => {
    expect(subtract(5, -5)).toBe(10);
  });

  test('subtracts zero (identity)', () => {
    expect(subtract(42, 0)).toBe(42);
  });

  test('subtracts equal numbers to zero', () => {
    expect(subtract(7, 7)).toBe(0);
  });

  test('subtracts floating point numbers', () => {
    expect(subtract(1.5, 0.5)).toBeCloseTo(1.0);
  });
});

describe('multiply', () => {
  test('45 * 2 = 90 (example from image)', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('multiplies two positive numbers', () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test('multiplies by zero', () => {
    expect(multiply(99, 0)).toBe(0);
    expect(multiply(0, 99)).toBe(0);
  });

  test('multiplies by one (identity)', () => {
    expect(multiply(123, 1)).toBe(123);
  });

  test('multiplies a positive and negative number', () => {
    expect(multiply(-4, 5)).toBe(-20);
  });

  test('multiplies two negative numbers', () => {
    expect(multiply(-3, -3)).toBe(9);
  });

  test('multiplies floating point numbers', () => {
    expect(multiply(2.5, 4)).toBe(10);
  });
});

describe('divide', () => {
  test('20 / 5 = 4 (example from image)', () => {
    expect(divide(20, 5)).toBe(4);
  });

  test('divides to a fraction', () => {
    expect(divide(1, 4)).toBe(0.25);
  });

  test('divides a negative numerator', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('divides by a negative divisor', () => {
    expect(divide(10, -2)).toBe(-5);
  });

  test('divides zero by a number', () => {
    expect(divide(0, 7)).toBe(0);
  });

  test('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
  });

  test('throws on zero divided by zero', () => {
    expect(() => divide(0, 0)).toThrow('Division by zero is not allowed.');
  });
});

describe('calculate (dispatcher)', () => {
  test.each([
    [2, '+', 3, 5],
    [10, '-', 4, 6],
    [45, '*', 2, 90],
    [20, '/', 5, 4],
  ])('calculate(%i %s %i) = %i (examples from image)', (a, op, b, expected) => {
    expect(calculate(a, op, b)).toBe(expected);
  });

  test('supports "x" as multiplication operator', () => {
    expect(calculate(3, 'x', 4)).toBe(12);
  });

  test('supports "X" as multiplication operator', () => {
    expect(calculate(3, 'X', 4)).toBe(12);
  });

  test('throws on unsupported operator', () => {
    expect(() => calculate(2, '?', 3)).toThrow(/Unsupported operator/);
  });

  test('propagates division-by-zero error', () => {
    expect(() => calculate(1, '/', 0)).toThrow('Division by zero is not allowed.');
  });

  test.each([
    [5, '%', 2, 1],
    [2, '^', 3, 8],
  ])('calculate(%i %s %i) = %i (extended operations from image)', (a, op, b, expected) => {
    expect(calculate(a, op, b)).toBe(expected);
  });

  test('supports "**" as exponentiation operator', () => {
    expect(calculate(2, '**', 10)).toBe(1024);
  });

  test('propagates modulo-by-zero error', () => {
    expect(() => calculate(5, '%', 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('modulo', () => {
  test('5 % 2 = 1 (example from image)', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('returns 0 when evenly divisible', () => {
    expect(modulo(10, 5)).toBe(0);
  });

  test('handles negative dividend', () => {
    expect(modulo(-7, 3)).toBe(-1);
  });

  test('handles negative divisor', () => {
    expect(modulo(7, -3)).toBe(1);
  });

  test('handles floating point operands', () => {
    expect(modulo(5.5, 2)).toBeCloseTo(1.5);
  });

  test('zero modulo a number is zero', () => {
    expect(modulo(0, 5)).toBe(0);
  });

  test('throws on modulo by zero', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed.');
  });

  test('throws on zero modulo zero', () => {
    expect(() => modulo(0, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('2 ^ 3 = 8 (example from image)', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('any number to the power of 0 is 1', () => {
    expect(power(99, 0)).toBe(1);
  });

  test('any number to the power of 1 is itself', () => {
    expect(power(7, 1)).toBe(7);
  });

  test('0 to a positive power is 0', () => {
    expect(power(0, 5)).toBe(0);
  });

  test('handles negative exponent (reciprocal)', () => {
    expect(power(2, -2)).toBe(0.25);
  });

  test('handles negative base with even exponent', () => {
    expect(power(-3, 2)).toBe(9);
  });

  test('handles negative base with odd exponent', () => {
    expect(power(-3, 3)).toBe(-27);
  });

  test('handles fractional exponent (square root via power)', () => {
    expect(power(9, 0.5)).toBeCloseTo(3);
  });
});

describe('squareRoot', () => {
  test('√16 = 4 (example from image)', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('square root of 0 is 0', () => {
    expect(squareRoot(0)).toBe(0);
  });

  test('square root of 1 is 1', () => {
    expect(squareRoot(1)).toBe(1);
  });

  test('square root of a non-perfect square', () => {
    expect(squareRoot(2)).toBeCloseTo(1.41421356);
  });

  test('square root of a floating point number', () => {
    expect(squareRoot(6.25)).toBe(2.5);
  });

  test('throws on negative input', () => {
    expect(() => squareRoot(-1)).toThrow('Cannot compute square root of a negative number.');
  });

  test('throws on negative floating point input', () => {
    expect(() => squareRoot(-0.0001)).toThrow('Cannot compute square root of a negative number.');
  });
});
