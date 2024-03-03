import * as fs from 'node:fs';
import * as path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pathResolver = (filename) => {
  if (filename.includes('__fixtures__')) {
    return path.join(__dirname, '..', filename);
  }
  const resultPath = path.join(__dirname, '..', '__fixtures__', filename);
  return resultPath;
};

export const fileReader = (file) => fs.readFileSync(file, 'utf-8');
// export const fileReader = (file) => fs.readFileSync(path.resolve(file), 'utf-8');

export const checkFileType = (file) => {
  let fileType;
  if (file.endsWith('.json')) fileType = '.json';
  if (file.endsWith('.yml') || file.endsWith('.yaml')) fileType = '.yml';
  return fileType;
};

export const printObject = (value, spacesCount = 1) => {
  const replacer = ' ';
  const iter = (currentValue, depth) => {
    // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + 4);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export const printObjectWithoutBraces = (value, spacesCount = 1) => {
  const replacer = ' ';
  const iter = (currentValue, depth) => {
    // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize + 4);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '',
      ...lines,
      `${bracketIndent}`,
    ].join('\n');
  };

  return iter(value, 1);
};

export const getDiff = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const union = _.union(keys).sort();
  // console.log(union);
  const obj = union.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        state: 'nested',
        keyName: key,
        keyValue: getDiff(obj1[key], obj2[key]),
        fullKey: _.findKey(obj1, obj1[key]),
      };
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        state: 'removed',
        keyName: key,
        keyValue: obj1[key],
        fullKey: _.findKey(obj1, obj1[key]),
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        state: 'added',
        keyName: key,
        keyValue: obj2[key],
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        state: 'updated',
        keyName: key,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }

    if (obj1[key] === obj2[key]) {
      return {
        state: 'similar',
        keyName: key,
        keyValue: obj1[key],
      };
    }
    return null;
  });
  return obj;
};

export const printDiff = (diffArray) => {
  const result = '\n';
  let str = '{\n';

  const iter = (node1, depth, name = []) => {
    for (const obj of node1.values()) {
      if (obj.state === 'updated') {
        const fullPath = name.concat(obj.keyName).join('.');
        console.log(fullPath);
        const changedFrom = _.isObject(obj.oldValue) ? '[complex value]' : `'${obj.oldValue}'`;
        const changedTo = _.isObject(obj.newValue) ? '[complex value]' : `'${obj.newValue}'`;
        str += `Property ${fullPath} was updated. From ${changedFrom} to ${changedTo}\n`;
      }
      if (obj.state === 'removed') {
        const fullPath = name.concat(obj.keyName).join('.');
        str += `Property ${fullPath} was removed\n`;
      }
      if (obj.state === 'added') {
        const fullPath = name.concat(obj.keyName).join('.');
        const addedValue = _.isObject(obj.keyValue) ? '[complex value]' : `'${obj.keyValue}'`;
        str += `Property ${fullPath} was added with value: ${addedValue}\n`;
      }
      if (obj.state === 'nested') {
        iter(obj.keyValue, depth + 1, name.concat(obj.keyName));
      }
    }
    return str;
  };
  return `${result}${iter(diffArray, 1)}}`;
};

export const getAbsolutePath = (filePath) => path.resolve(filePath);
