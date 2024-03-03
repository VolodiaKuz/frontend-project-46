import _ from 'lodash';
import * as yaml from 'js-yaml';
import { printObjectWithoutBraces } from '../src/utils.js';

const getObjFromDiff = (diffArray) => {
  const result = '';
  const replacer = ' ';
  let str = '\n';

  const iter = (node1, depth) => {
    for (const obj of node1.values()) {
      if (obj.state === 'similar') {
        str += `${replacer.repeat(depth)}${obj.keyName}: ${obj.keyValue}\n`;
      }
      if (obj.state === 'changed') {
        if (_.isObject(obj.newValue)) {
          str += `${replacer.repeat(depth)}"${obj.keyName}": `;
          str += `${printObjectWithoutBraces(obj.newValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth)}${obj.keyName}: ${obj.newValue}\n`;
      }
      if (obj.state === 'add') {
        if (_.isObject(obj.keyValue)) {
          str += `${replacer.repeat(depth)}${obj.keyName}: `;
          str += `${printObjectWithoutBraces(obj.keyValue, depth * 4)}\n`;
        } else str += `${replacer.repeat(depth - 2)}  ${obj.keyName}: ${obj.keyValue}\n`;
      }
      if (obj.state === 'nested') {
        str += `${replacer.repeat(depth)}${obj.keyName}: \n`;
        iter(obj.keyValue, depth + 1);
        str += `${replacer.repeat(depth)}\n`;
      }
    }
    console.log(str);
    return str;
  };
  return `${result}${iter(diffArray, 1)}`;
};

const getJsonFormat = (diff) => {
  const parsed = getObjFromDiff(diff);
  const json = yaml.load(parsed);
  // console.log(JSON.stringify(json));
  return JSON.stringify(json);
};

export default getJsonFormat;
