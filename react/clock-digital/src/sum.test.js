const sum = require('./sum');

test('properly adds two numbers', () => {
  expect(sum(2, 2)).toBe(4);
});