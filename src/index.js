#!/usr/bin/env node
import {
  fileReader, checkFileType, getDiff, getAbsolutePath,
}
  from './utils.js';
import parser from './parsers.js';
import getFormattedDiff from '../formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  // const file1 = fileReader(pathResolver(filepath1));
  // const file2 = fileReader(pathResolver(filepath2));
  const file1 = fileReader(getAbsolutePath(filepath1));
  const file2 = fileReader(getAbsolutePath(filepath2));

  const parsedObj1 = parser(file1, checkFileType(filepath1));
  const parsedObj2 = parser(file2, checkFileType(filepath2));

  // console.log(JSON.stringify(getDiff(parsedObj1, parsedObj2), null, 2));
  const result = getFormattedDiff(getDiff(parsedObj1, parsedObj2), format);
  // console.log(result);
  return result;
};

export default genDiff;
