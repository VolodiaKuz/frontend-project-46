import * as path from 'node:path';
import _ from 'lodash';

export const getDiff = (obj1, obj2) => {
  const keys = Object.keys(obj1).concat(Object.keys(obj2));
  const union = _.sortBy(_.union(keys));
  const obj = union.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) return { state: 'nested', key, value: getDiff(obj1[key], obj2[key]) };

    if (!Object.hasOwn(obj2, key)) return { state: 'removed', key, value: obj1[key] };

    if (!Object.hasOwn(obj1, key)) return { state: 'added', key, value: obj2[key] };

    if (obj1[key] !== obj2[key]) {
      return {
        state: 'updated',
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }

    return { state: 'similar', key, value: obj1[key] };
  });
  return obj;
};

export const getAbsolutePath = (filePath) => path.resolve(filePath);
