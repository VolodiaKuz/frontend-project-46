#!/usr/bin/env node
import { pathResolver, fileReader, checkFileType, printObject, getDiff, printDiff } from './utils.js';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fileReader(pathResolver(filepath1));
  const file2 = fileReader(pathResolver(filepath2));

  const parsedObj1 = parser(file1, checkFileType(filepath1));
  const parsedObj2 = parser(file2, checkFileType(filepath2));
  let result;

  if (format === 'stylish') {
    result = printDiff(getDiff(parsedObj1, parsedObj2));
  }
  if (format === 'plain') {
    console.log('gendiff with flag plain');
  }
  // console.log(result);
  return result;
};

export default genDiff;
// gendiff __fixtures__/file1.yml __fixtures__/file2.yaml
// gendiff __fixtures__/file1.json __fixtures__/file2.json
// gendiff __fixtures__/nested.file1.json __fixtures__/nested.file2.json

// gendiff -f plain file1.yml file2.json
// gendiff -f stylish file1.yml file2.json

// gendiff file1.json file2.json
// gendiff file1.yml file2.yaml

// gendiff nested.file1.json nested.file2.json
// gendiff nested.file1.yaml nested.file2.yaml
