import { getRandomColorArray, restart, check, startRound } from './ind';

test('should return array of colors', () => {
  const round = 4;
  expect(getRandomColorArray(round).length).toEqual(round);
});

test('array should consists of int digits', () => {
  const round = 5;
  const arr = getRandomColorArray(round);
  expect(arr.every(value => Number.isInteger(value))).toEqual(true);
});

test('should nullify values', () => {
  const obj = {
    round: 4,
    randomColorArray: [2, 3, 1],
    arr: [1, 6],
    waiting: true,
  };
  restart.call(obj);
  expect(obj).toEqual({
    round: null,
    randomColorArray: [],
    arr: null,
    waiting: false
  });
});

test('should return true if arrays are equal', () => {
  const obj = {
    randColorArray: [1, 6, 1],
    arr: [1, 6, 1],
  };
  expect(check.call(obj)).toEqual(true);
});

test('should return false if waiting is true', () => {
  const obj = {
    round: 4,
    waiting: true,
  };
  expect(startRound.call(obj)).not.toEqual(true);
});