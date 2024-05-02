import * as fs from 'node:fs';
import { fileURLToPath } from 'url';
import * as path from 'node:path';
import { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const json1 = '__fixtures__/nested.file1.json';
const json2 = '__fixtures__/nested.file2.json';
const yaml1 = '__fixtures__/nested.file1.yaml';
const yaml2 = '__fixtures__/nested.file2.yml';
const nestedResultStylish = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'nested.result.stylish.txt'), 'utf-8');
const nestedResultPlain = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'nested.result.plain.txt'), 'utf-8');
const nestedResultJson = fs.readFileSync(path.join(__dirname, '..', '__fixtures__', 'nested.result.json.txt'), 'utf-8');

test('nested files with .json format and stylish flag', () => {
  expect(genDiff(json1, json2)).toEqual(nestedResultStylish);
});

test('nested files with .yaml format and stylish flag', () => {
  expect(genDiff(yaml1, yaml2, 'stylish')).toEqual(nestedResultStylish);
});

test('nested files with .json format and plain flag', () => {
  expect(genDiff(json1, json2, 'plain')).toEqual(nestedResultPlain);
});

test('nested files with .yaml format and plain flag', () => {
  expect(genDiff(yaml1, yaml2, 'plain')).toEqual(nestedResultPlain);
});

test('nested files with .json format and json flag', () => {
  expect(genDiff(json1, json2, 'json')).toEqual(nestedResultJson);
});

test('nested files with .yaml format and json flag', () => {
  expect(genDiff(yaml1, yaml2, 'json')).toEqual(nestedResultJson);
});
