const add = require('./add.js');

test('add 2 from 2 to equal 4', () => {
  expect(add(2, 2)).toBe(4);
});