import * as fs from 'node:fs';
import genDiff from '../src/index.js';
import { pathResolver } from '../src/utils.js';

let result;
let nestedResult;

beforeEach(() => {
  result = fs.readFileSync(pathResolver('flat.result.txt'), 'utf-8');
  nestedResult = fs.readFileSync(pathResolver('nested.result.txt'), 'utf-8');
});

test('genDiff of flat file with .json format', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('genDiff of flat file with with .yaml format', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(result);
});

test('genDiff of nested file with with .json format', () => {
  expect(genDiff('nested.file1.json', 'nested.file2.json')).toEqual(nestedResult);
});

test('genDiff of nested file with with .yaml format', () => {
  expect(genDiff('nested.file1.yaml', 'nested.file2.yaml')).toEqual(nestedResult);
});
