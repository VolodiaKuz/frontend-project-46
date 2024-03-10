import _ from 'lodash';

const getValueType = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || value === null || typeof value === 'number') return value;
  return `'${value}'`;
};

const getDiffString = (obj, name) => {
  const resultObject = {};
  if (obj.state === 'updated') {
    const fullPath = name.concat(obj.keyName).join('.');
    const oldValue = getValueType(obj.oldValue);
    const newValue = getValueType(obj.newValue);
    const str = `Property '${fullPath}' was updated. From ${oldValue} to ${newValue}`;
    resultObject.string = str;
  }
  if (obj.state === 'removed') {
    const fullPath = name.concat(obj.keyName).join('.');
    const str = `Property '${fullPath}' was removed`;
    resultObject.string = str;
  }
  if (obj.state === 'added') {
    const fullPath = name.concat(obj.keyName).join('.');
    const addedValue = getValueType(obj.keyValue);
    const str = `Property '${fullPath}' was added with value: ${addedValue}`;
    resultObject.string = str;
  }
  return resultObject;
};

const getPlainDiff = (diffArray, name = []) => {
  const result = diffArray.flatMap((diffObject) => {
    if (diffObject.state === 'nested') {
      return getPlainDiff(diffObject.keyValue, name.concat(diffObject.keyName));
    }
    return getDiffString(diffObject, name);
  });
  return result;
};

const getPlainFormat = (arr) => {
  const objectWithPlainStrings = getPlainDiff(arr);
  const result = objectWithPlainStrings
    .filter((el) => Object.keys(el).length !== 0)
    .map((el) => el.string);
  return result.join('\n');
};

export default getPlainFormat;
