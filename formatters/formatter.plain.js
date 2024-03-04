import _ from 'lodash';

const check = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || value === null) return value;
  return `'${value}'`;
};

const getPlainFormat1 = (diffArray, name = []) => {
  const result = diffArray.flatMap((obj) => {
    if (obj.state === 'nested') {
      return getPlainFormat1(obj.keyValue, name.concat(obj.keyName));
    }
    if (obj.state === 'updated') {
      const fullPath = name.concat(obj.keyName).join('.');
      const oldValue = check(obj.oldValue);
      const newValue = check(obj.newValue);
      const str = `Property '${fullPath}' was updated. From ${oldValue} to ${newValue}`;
      return {
        string: str,
        fullPath,
      };
    }
    if (obj.state === 'removed') {
      const fullPath = name.concat(obj.keyName).join('.');
      const str = `Property '${fullPath}' was removed`;
      return {
        string: str,
        fullPath,
      };
    }
    if (obj.state === 'added') {
      const fullPath = name.concat(obj.keyName).join('.');
      const addedValue = check(obj.keyValue);
      const str = `Property '${fullPath}' was added with value: ${addedValue}`;
      return {
        string: str,
        fullPath,
      };
    }
    return null;
  });
  return result;
};

const getPlainFormat = (arr) => {
  const result = getPlainFormat1(arr);
  const resultArr = [];
  result.forEach((obj) => {
    if (obj !== null) {
      resultArr.push(obj.string);
    }
  });
  return resultArr.join('\n');
};

export default getPlainFormat;
