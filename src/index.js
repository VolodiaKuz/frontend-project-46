#!/usr/bin/env node
import { pathResolver, fileReader, checkFileType } from './utils.js';
import parser from './parsers.js';

// const file3 = fileReader(pathResolver('flat.result.txt'));
// console.log(parser(file3, '.json'));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = fileReader(pathResolver(filepath1));
  const file2 = fileReader(pathResolver(filepath2));

  const obj1 = parser(file1, checkFileType(filepath1));
  const obj2 = parser(file2, checkFileType(filepath2));

  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();
  let result = '\n';
  if (format === 'plain') {
    console.log('gendiff started with option plain');
    return result;
  }
  if (format === 'stylish') {
    result += '{';
    for (const key of sortedKeys1) {
      if (Object.hasOwn(obj2, key) && obj1[key] === obj2[key]) {
        result += `\n    ${key}: ${obj1[key]}`;
      } else if (Object.hasOwn(obj2, key) && obj1[key] !== obj2[key]) {
        result += `\n  - ${key}: ${obj1[key]}`;
        result += `\n  + ${key}: ${obj2[key]}`;
      } else if (!Object.hasOwn(obj2, key)) {
        result += `\n  - ${key}: ${obj1[key]}`;
      }
    }
    for (const key of sortedKeys2) {
      if (!Object.hasOwn(obj1, key)) {
        result += `\n  + ${key}: ${obj2[key]}`;
      }
    }
    result += '\n}';
  }
  console.log(result);
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
