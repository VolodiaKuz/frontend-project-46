import * as fs from 'node:fs';
import genDiff from '../src/index.js';
import { pathResolver } from '../src/utils.js';

let result;

beforeEach(() => {
  result = fs.readFileSync(pathResolver('flat.result.txt'), 'utf-8');
});

test('genDiff with .json format', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('genDiff with .yaml format', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});
