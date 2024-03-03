import * as fs from 'node:fs';
import genDiff from '../src/index.js';
import { pathResolver } from '../src/utils.js';

let result;
let nestedResultStylish;
let nestedResultPlain;
let nestedResultJson;

beforeEach(() => {
  result = fs.readFileSync(pathResolver('__fixtures__/flat.result.txt'), 'utf-8');
  nestedResultStylish = fs.readFileSync(pathResolver('nested.result.stylish.txt'), 'utf-8');
  nestedResultPlain = fs.readFileSync(pathResolver('nested.result.plain.txt'), 'utf-8');
  nestedResultJson = fs.readFileSync(pathResolver('nested.result.json.txt'), 'utf-8');
});

test('genDiff of flat file with .json format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
});

test('genDiff of flat file with with .yaml format', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
});

test('genDiff of nested file with with .json format and stylish flag', () => {
  expect(genDiff('__fixtures__/nested.file1.json', '__fixtures__/nested.file2.json')).toEqual(nestedResultStylish);
});

test('genDiff of nested file with with .yaml format and stylish flag', () => {
  expect(genDiff('__fixtures__/nested.file1.yaml', '__fixtures__/nested.file2.yaml')).toEqual(nestedResultStylish);
});

test('genDiff of nested file with with .json format and plain flag', () => {
  expect(genDiff('__fixtures__/nested.file1.json', '__fixtures__/nested.file2.json', 'plain')).toEqual(nestedResultPlain);
});

test('genDiff of nested file with with .yaml format and plain flag', () => {
  expect(genDiff('__fixtures__/nested.file1.yaml', '__fixtures__/nested.file2.yaml', 'plain')).toEqual(nestedResultPlain);
});

test('genDiff of nested file with with .json format and json flag', () => {
  expect(genDiff('__fixtures__/nested.file1.json', '__fixtures__/nested.file2.json', 'json')).toEqual(nestedResultJson);
});
