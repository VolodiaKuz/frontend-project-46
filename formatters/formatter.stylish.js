import _ from 'lodash';
import { printObject } from '../src/utils.js';

const getStylishFormat = (diffArray, replacer = ' ') => {
  const result = '\n';
  let str = '{\n';

  const iter = (node1, depth) => {
    for (const obj of node1.values()) {
      if (obj.state === 'similar') {
        str += `${replacer.repeat(depth * 4 - 2)}  ${obj.keyName}: ${obj.keyValue}\n`;
      }
      if (obj.state === 'updated') {
        if (_.isObject(obj.oldValue)) {
          str += `${replacer.repeat(depth * 4 - 2)}- ${obj.keyName}: `;
          str += `${printObject(obj.oldValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth * 4 - 2)}- ${obj.keyName}: ${obj.oldValue}\n`;
        if (_.isObject(obj.newValue)) {
          str += `${replacer.repeat(depth * 4 - 2)}+ ${obj.keyName}: `; // возможно здесь должен быть плюс
          str += `${printObject(obj.newValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth * 4 - 2)}+ ${obj.keyName}: ${obj.newValue}\n`;
      }
      if (obj.state === 'removed') {
        if (_.isObject(obj.keyValue)) {
          str += `${replacer.repeat(depth * 4 - 2)}- ${obj.keyName}: `;
          str += `${printObject(obj.keyValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth * 4 - 2)}- ${obj.keyName}: ${obj.keyValue}\n`;
      }
      if (obj.state === 'added') {
        if (_.isObject(obj.keyValue)) {
          str += `${replacer.repeat(depth * 4 - 2)}+ ${obj.keyName}: `;
          str += `${printObject(obj.keyValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth * 4 - 2)}+ ${obj.keyName}: ${obj.keyValue}\n`;
      }
      if (obj.state === 'nested') {
        str += `${replacer.repeat(depth * 4 - 2)}  ${obj.keyName}: {\n`;
        iter(obj.keyValue, depth + 1);
        str += `${replacer.repeat(depth * 4)}}\n`;
      }
    }
    return str;
  };
  return `${result}${iter(diffArray, 1)}}`;
};
export default getStylishFormat;
