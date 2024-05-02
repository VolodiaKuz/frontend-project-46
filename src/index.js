#!/usr/bin/env node
import * as fs from 'node:fs';
import {
  checkFileType, getDiff,
}
  from './utils.js';
import getParsedFile from './parsers.js';
import getFormattedDiff from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // const file1 = readFile(getAbsolutePath(filepath1));
  // const file2 = readFile(getAbsolutePath(filepath2));
  const file1 = fs.readFileSync(filepath1, 'utf-8');
  const file2 = fs.readFileSync(filepath2, 'utf-8');
  const parsedObj1 = getParsedFile(file1, checkFileType(filepath1));
  const parsedObj2 = getParsedFile(file2, checkFileType(filepath2));

  const result = getFormattedDiff(getDiff(parsedObj1, parsedObj2), format);
  return result;
};

export default genDiff;
