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

export const getDiff = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const union = _.sortBy(_.union(keys));
  const obj = union.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        state: 'nested',
        keyName: key,
        keyValue: getDiff(obj1[key], obj2[key]),
      };
    }

    if (!Object.hasOwn(obj2, key)) {
      return {
        state: 'removed',
        keyName: key,
        keyValue: obj1[key],
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

export const getAbsolutePath = (filePath) => path.resolve(filePath);
