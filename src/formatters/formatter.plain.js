import _ from 'lodash';

const getValueType = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'boolean' || value === null || typeof value === 'number') return value;
  return `'${value}'`;
};

const getDiffString = (obj, name) => {
  const fullPath = name.concat(obj.key).join('.');
  switch (obj.state) {
    case 'updated': {
      const oldValue = getValueType(obj.oldValue);
      const newValue = getValueType(obj.newValue);
      return { string: `Property '${fullPath}' was updated. From ${oldValue} to ${newValue}` };
    }
    case 'removed':
      return { string: `Property '${fullPath}' was removed` };
    case 'added': {
      const addedValue = getValueType(obj.value);
      return { string: `Property '${fullPath}' was added with value: ${addedValue}` };
    }
    default:
      return {};
  }
};

const getPlainDiff = (diffArray, name = []) => {
  const result = diffArray.flatMap((diffObject) => {
    if (diffObject.state === 'nested') {
      return getPlainDiff(diffObject.value, name.concat(diffObject.key));
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
