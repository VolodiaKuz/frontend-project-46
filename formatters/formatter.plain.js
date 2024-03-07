import _ from 'lodash';

const getValueType = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || value === null || typeof value === 'number') return value;
  return `'${value}'`;
};

const getPlainDiff = (diffArray, name = []) => {
  const result = diffArray.flatMap((obj) => {
    if (obj.state === 'nested') {
      return getPlainDiff(obj.keyValue, name.concat(obj.keyName));
    }
    if (obj.state === 'updated') {
      const fullPath = name.concat(obj.keyName).join('.');
      const oldValue = getValueType(obj.oldValue);
      const newValue = getValueType(obj.newValue);
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
      const addedValue = getValueType(obj.keyValue);
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
  const objectWithPlainStrings = getPlainDiff(arr);
  const result = objectWithPlainStrings
    .filter((el) => el !== null)
    .map((el) => el.string);
  return result.join('\n');
};

export default getPlainFormat;
