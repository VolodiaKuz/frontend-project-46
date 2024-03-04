import _ from 'lodash';

const check = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || value === null || typeof value === 'number') return value;
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
  const objectWithPlainStrings = getPlainFormat1(arr);
  const result = objectWithPlainStrings
    .filter((el) => el !== null)
    .map((el) => el.string);
  return result.join('\n');
};

export default getPlainFormat;
