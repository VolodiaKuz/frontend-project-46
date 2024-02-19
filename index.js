import { pathResolver, fileReader, checkFileType } from './src/utils.js';
import parser from './src/parsers.js';
import _ from 'lodash';


// const print = (obj, spaces = 2) => {
//   let result = '';
//   let str = '';
//   const replacer = ' ';

//   const iter = (node, depth) => {

//     // str += replacer.repeat(depth) + `  ${replacer}: {\n`;;
//     for (const [key, value] of Object.entries(node)) {
//       if (typeof value === 'object') {
//         str += replacer.repeat(depth + 2) + `${key}: {\n`;
//         iter(value, depth + 2);
//       }
//       if (typeof value !== 'object') {
//         str += replacer.repeat(depth) + `  ${key}: ${value}\n`;
//       }
//     }
//     // str += replacer.repeat(depth) + '}\n';
//     if (str.endsWith('\n')) str += replacer.repeat(depth) + '}';
//     else str += '\n' + replacer.repeat(depth - 2) + '}';
//     return str;
//   }
//   return result + iter(obj, spaces);
// }

const print = (value, spacesCount = 2) => {
  const replacer = ' ';
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth;
    const currentIndent = replacer.repeat(indentSize + 4);
    const bracketIndent = replacer.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 4)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 4);
};

const file1 = fileReader(pathResolver('nested.file1.json'));
const file2 = fileReader(pathResolver('nested.file2.json'));
// const file1 = fileReader(pathResolver('file1.json'));
// const file2 = fileReader(pathResolver('file2.json'));

const parsedObj1 = parser(file1, checkFileType('nested.file1.json'));
const parsedObj2 = parser(file2, checkFileType('nested.file2.json'));

const stringify = (obj1, obj2) => {
  const replacer = ' ';
  const spacesCount = 2;
  let result = '\n';
  let str = '{\n';

  const iter = (node1, node2, depth) => {

    const sortedKeys1 = Object.keys(node1).sort();
    const sortedKeys2 = Object.keys(node2).sort();
    const union = _.union(sortedKeys1, sortedKeys2);

    for (const value of union) {

      if (Object.hasOwn(node1, value) && Object.hasOwn(node2, value)) {
        str += replacer.repeat(depth) + `  ${value}: {\n`;

        const arr = [];
        for (const [key1, value1] of Object.entries(node1[value]).sort()) {
          for (const [key2, value2] of Object.entries(node2[value]).sort()) {

            if (!arr.includes(key2) && !arr.includes(key1)) {

              if (key1 === key2) {  // 1 условие
                if (value1 === value2 && typeof value1 !== 'object' && typeof value2 !== 'object') {
                  str += replacer.repeat(depth + 4) + `  ${key1}: ${value1}\n`;
                  arr.push(key2, key1);
                }
                else if (typeof value1 !== 'object' && typeof value2 !== 'object' && value1 !== value2) {
                  str += replacer.repeat(depth + 4) + `- ${key1}: ${value1}\n`;
                  str += replacer.repeat(depth + 4) + `+ ${key1}: ${value2}\n`;
                  arr.push(key2, key1);
                }

                else if (value1 !== value2 && (value1 === null || value2 === null)) {
                  str += replacer.repeat(depth + 4) + `- ${key1}: ${value1}\n`;
                  str += replacer.repeat(depth + 4) + `+ ${key1}: ${value2}\n`;
                  arr.push(key2, key1);
                }

                else if (typeof value1 === 'object' && typeof value2 !== 'object') {
                  str += replacer.repeat(depth + 4) + `- ${key1}: `;
                  str += print(value1, depth) + '\n';
                  str += replacer.repeat(depth + 4) + `+ ${key1}: ${value2}\n`;
                  arr.push(key2, key1);
                }
                else if (typeof value1 !== 'object' && typeof value2 === 'object') {
                  str += replacer.repeat(depth + 4) + `- ${key1}: ${value1}\n`;
                  str += replacer.repeat(depth + 4) + `+ ${key2}: `;
                  str += print(value2, depth) + '\n';
                  arr.push(key2, key1);
                }

                else {
                  str += replacer.repeat(depth + 4) + `  ${key1}: {\n`
                  iter(value1, value2, depth + 8);
                }
              }

              if (!Object.hasOwn(node2[value], key1)) {   // 2 условие 
                if (typeof value1 !== 'object') {
                  str += replacer.repeat(depth + 4) + `- ${key1}: ${value1}\n`;
                  arr.push(key1);
                } else {
                  str += replacer.repeat(depth + 4) + `+ ${key1}: `;
                  str += print(value1, depth) + '\n';
                  arr.push(key1);
                }
              }

              if (!Object.hasOwn(node1[value], key2)) {     // 3 условие
                if (typeof value2 !== 'object') {
                  str += replacer.repeat(depth + 4) + `+ ${key2}: ${value2}\n`;
                  arr.push(key2);
                } else {
                  str += replacer.repeat(depth + 4) + `+ ${key2}: `;
                  str += print(value2, depth + 4) + '\n';
                  arr.push(key2);
                }
              }

            }

          }

        }
        str += replacer.repeat(depth + 4) + `}\n`;
      }

      if (!Object.hasOwn(node2, value)) {
        str += '\n' + replacer.repeat(depth) + `- ${value}: `;
        str += print(node1[value], depth);
      }

      if (!Object.hasOwn(node1, value)) {
        str += '\n' + replacer.repeat(depth) + `+ ${value}: `;
        str += print(node2[value], depth);
      }
    }

    if (str.endsWith('\n')) str += replacer.repeat(depth - spacesCount) + '}\n';
    else str += '\n' + replacer.repeat(depth - spacesCount) + '}';
    return str;
  }
  return result + iter(obj1, obj2, spacesCount);

}

console.log(stringify(parsedObj1, parsedObj2));
