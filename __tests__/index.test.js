import * as fs from 'node:fs';
import genDiff from '../src/index.js';
import { pathResolver } from '../src/utils.js';

const json1 = '__fixtures__/nested.file1.json';
const json2 = '__fixtures__/nested.file2.json';
const yaml1 = '__fixtures__/nested.file1.yaml';

test('nested files with with .json format and stylish flag', () => {
  const nestedResultStylish = fs.readFileSync(pathResolver('nested.result.stylish.txt'), 'utf-8');
  expect(genDiff(json1, json2)).toEqual(nestedResultStylish);
});

test('nested files with with .yaml format and stylish flag', () => {
  const nestedResultStylish = fs.readFileSync(pathResolver('nested.result.stylish.txt'), 'utf-8');
  expect(genDiff(yaml1, '__fixtures__/nested.file2.yml', 'stylish')).toEqual(nestedResultStylish);
});

test('nested files with with .json format and plain flag', () => {
  const nestedResultPlain = fs.readFileSync(pathResolver('nested.result.plain.txt'), 'utf-8');
  expect(genDiff(json1, json2, 'plain')).toEqual(nestedResultPlain);
});

test('nested files with with .yaml format and plain flag', () => {
  const nestedResultPlain = fs.readFileSync(pathResolver('nested.result.plain.txt'), 'utf-8');
  expect(genDiff('__fixtures__/nested.file1.yaml', '__fixtures__/nested.file2.yml', 'plain')).toEqual(nestedResultPlain);
});

test('nested files with with .json format and json flag', () => {
  const nestedResultJson = fs.readFileSync(pathResolver('nested.result.json.txt'), 'utf-8');
  expect(genDiff(json1, json2, 'json')).toEqual(nestedResultJson);
});

test('nested files with with .yaml format and json flag', () => {
  const nestedResultJson = fs.readFileSync(pathResolver('nested.result.json.txt'), 'utf-8');
  expect(genDiff('__fixtures__/nested.file1.yaml', '__fixtures__/nested.file2.yml', 'json')).toEqual(nestedResultJson);
});
