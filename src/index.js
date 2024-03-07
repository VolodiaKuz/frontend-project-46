#!/usr/bin/env node
import {
  readFile, checkFileType, getDiff, getAbsolutePath,
}
  from './utils.js';
import getParsedFile from './parsers.js';
import getFormattedDiff from '../formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = readFile(getAbsolutePath(filepath1));
  const file2 = readFile(getAbsolutePath(filepath2));

  const parsedObj1 = getParsedFile(file1, checkFileType(filepath1));
  const parsedObj2 = getParsedFile(file2, checkFileType(filepath2));

  const result = getFormattedDiff(getDiff(parsedObj1, parsedObj2), format);
  console.log(result);
  return result;
};

export default genDiff;
