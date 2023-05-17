// Sample Test file
// In this file, we are testing the sum function

// Define sum function
//  Example1:
//    sum(1, 2) => 3
//  Example2:
//    sum(5, 5) => 10
export const sum = (a: number, b: number) => {
  return a + b;
};

// Test the sum function
// Case1: sum(1, 2) => 3
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// Case2: sum(5, 5) => 10
test("adds 5 + 5 to equal 10", () => {
  expect(sum(5, 5)).toBe(10);
});

// Case3: sum(5, 5) => not 3
test("adds 5 + 5 to not equal 3", () => {
  expect(sum(5, 5)).not.toBe(3);
});
