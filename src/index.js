#!/usr/bin/env node
//  const path = require('path');
import { pathResolver, fileReader } from './utils.js';

const gendiff = (filepath1, filepath2) => {
  const file1 = fileReader(pathResolver(filepath1));
  const file2 = fileReader(pathResolver(filepath2));
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  console.log(obj1);
  console.log(obj2);
  return obj1;
};

export default gendiff;
