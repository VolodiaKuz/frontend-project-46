import { pathResolver, fileReader, checkFileType } from './src/utils.js';
import parser from './src/parsers.js';
import _ from 'lodash';

const printObject = (value, spacesCount = 1) => {
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

const getDiff = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const union = _.union(keys).sort();
  // console.log(union);
  const obj = union.map((key) => {

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        state: 'nested',
        keyName: key,
        keyValue: getDiff(obj1[key], obj2[key])
      };
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        state: 'deleted',
        keyName: key,
        keyValue: obj1[key],
      };
    }

    if (!Object.hasOwn(obj1, key)) {
      return {
        state: 'add',
        keyName: key,
        keyValue: obj2[key],
      };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        state: 'changed',
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

  })
  return obj;
}

const printDiff = (diffArray, replacer = ' ', spacesCount = 2) => {
  let result = '\n';
  let str = '{\n';

  const iter = (node1, depth) => {
    for (const obj of node1.values()) {
      if (obj.state === 'similar') {
        str += replacer.repeat(depth * 4 - 2) + `  ${obj.keyName}: ${obj.keyValue}\n`
      }
      if (obj.state === 'changed') {
        if (_.isObject(obj.oldValue)) {
          str += replacer.repeat(depth * 4 - 2) + `- ${obj.keyName}: `;
          str += printObject(obj.oldValue, depth * 4) + '\n';
        } else {
          str += replacer.repeat(depth * 4 - 2) + `- ${obj.keyName}: ${obj.oldValue}\n`
          // str += replacer.repeat(depth * 4) + '}\n';
        }
        if (_.isObject(obj.newValue)) {
          str += replacer.repeat(depth * 4 - 2) + `- ${obj.keyName}: `;
          str += printObject(obj.newValue, depth * 4) + '\n';
        } else {
          str += replacer.repeat(depth * 4 - 2) + `+ ${obj.keyName}: ${obj.newValue}\n`;            // add
          // str += replacer.repeat(depth * 4) + '}\n';
        }
      }
      if (obj.state === 'deleted') {
        if (_.isObject(obj.keyValue)) {
          str += replacer.repeat(depth * 4 - 2) + `- ${obj.keyName}: `;
          str += printObject(obj.keyValue, depth * 4) + '\n';
        }
        else str += replacer.repeat(depth * 4 - 2) + `- ${obj.keyName}: ${obj.keyValue}\n`
      }
      if (obj.state === 'add') {
        if (_.isObject(obj.keyValue)) {
          str += replacer.repeat(depth * 4 - 2) + `+ ${obj.keyName}: `;
          str += printObject(obj.keyValue, depth * 4) + '\n';
        }
        else str += replacer.repeat(depth * 4 - 2) + `+ ${obj.keyName}: ${obj.keyValue}\n`
      }
      if (obj.state === 'nested') {
        str += replacer.repeat(depth * 4 - 2) + `  ${obj.keyName}: {\n`
        iter(obj.keyValue, depth + 1);
        str += replacer.repeat(depth * 4) + '}\n';
      }
    }
    return str;
  }
  return result + iter(diffArray, 1) + '}';
}

// const file1 = fileReader(pathResolver('nested1.json'));
const file3 = fileReader(pathResolver('nested2.json'));
const file1 = fileReader(pathResolver('nested.file1.json'));
const file2 = fileReader(pathResolver('nested.file2.json'));

const parsedObj1 = parser(file1, checkFileType('nested.file1.json'));
const parsedObj2 = parser(file2, checkFileType('nested.file2.json'));
const parsedObj3 = parser(file3, checkFileType('nested.file2.json'));

const result = getDiff(parsedObj1, parsedObj2);
// console.log(JSON.stringify(result, null, 2));
console.log(printDiff(result));