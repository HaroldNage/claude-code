const { add, subtract, multiply, divide, modulo, power, sqrt } = require("./calculator");

describe("add", () => {
  test("adds two positive numbers", () => expect(add(2, 3)).toBe(5));
  test("adds a positive and negative number", () => expect(add(5, -3)).toBe(2));
  test("adds two negative numbers", () => expect(add(-4, -6)).toBe(-10));
  test("adds floats", () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
  test("adds zero", () => expect(add(7, 0)).toBe(7));
});

describe("subtract", () => {
  test("subtracts two positive numbers", () => expect(subtract(10, 4)).toBe(6));
  test("subtracts a larger from a smaller", () => expect(subtract(3, 8)).toBe(-5));
  test("subtracts negative numbers", () => expect(subtract(-5, -3)).toBe(-2));
  test("subtracts floats", () => expect(subtract(0.3, 0.1)).toBeCloseTo(0.2));
  test("subtracts zero", () => expect(subtract(5, 0)).toBe(5));
});

describe("multiply", () => {
  test("multiplies two positive numbers", () => expect(multiply(3, 4)).toBe(12));
  test("multiplies by zero", () => expect(multiply(9, 0)).toBe(0));
  test("multiplies two negative numbers", () => expect(multiply(-3, -4)).toBe(12));
  test("multiplies positive and negative", () => expect(multiply(5, -2)).toBe(-10));
  test("multiplies floats", () => expect(multiply(0.5, 4)).toBeCloseTo(2));
});

describe("divide", () => {
  test("divides two positive numbers", () => expect(divide(10, 2)).toBe(5));
  test("divides resulting in a float", () => expect(divide(7, 2)).toBe(3.5));
  test("divides negative by positive", () => expect(divide(-9, 3)).toBe(-3));
  test("divides two negatives", () => expect(divide(-8, -4)).toBe(2));
  test("throws on divide by zero", () => {
    expect(() => divide(5, 0)).toThrow("Cannot divide by zero.");
  });
});

describe("modulo", () => {
  test("returns remainder of positive numbers", () => expect(modulo(10, 3)).toBe(1));
  test("returns zero when evenly divisible", () => expect(modulo(9, 3)).toBe(0));
  test("returns remainder with negative dividend", () => expect(modulo(-7, 3)).toBe(-1));
  test("throws on modulo by zero", () => {
    expect(() => modulo(5, 0)).toThrow("Cannot modulo by zero.");
  });
});

describe("power", () => {
  test("raises to a positive exponent", () => expect(power(2, 10)).toBe(1024));
  test("raises to the power of zero", () => expect(power(5, 0)).toBe(1));
  test("raises to the power of one", () => expect(power(7, 1)).toBe(7));
  test("raises to a negative exponent", () => expect(power(2, -2)).toBe(0.25));
  test("raises zero to a positive power", () => expect(power(0, 5)).toBe(0));
  test("raises to a fractional exponent", () => expect(power(8, 1 / 3)).toBeCloseTo(2));
});

describe("sqrt", () => {
  test("returns square root of a perfect square", () => expect(sqrt(9)).toBe(3));
  test("returns square root of a float", () => expect(sqrt(2)).toBeCloseTo(1.4142));
  test("returns zero for sqrt(0)", () => expect(sqrt(0)).toBe(0));
  test("throws on negative input", () => {
    expect(() => sqrt(-1)).toThrow("Cannot take square root of a negative number.");
  });
});

describe("round-trip", () => {
  test("sqrt(power(x, 2)) === x", () => expect(sqrt(power(5, 2))).toBeCloseTo(5));
});
