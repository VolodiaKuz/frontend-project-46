#!/usr/bin/env node
import { pathResolver, fileReader } from './utils.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1 = fileReader(pathResolver(filepath1));
  const file2 = fileReader(pathResolver(filepath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();
  let result = '\n';
  if (format === 'plain') {
    console.log('gendiff started with option plain');
    return result;
  }
  if (format === undefined) {
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
    console.log(result);
  }
  return result;
};

export default genDiff;
