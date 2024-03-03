import _ from 'lodash';

const getPlainFormat = (diffArray) => {
  const result = '';
  let str = '';

  const iter = (node1, name = []) => {
    for (const obj of node1.values()) {
      if (obj.state === 'updated') {
        const fullPath = name.concat(obj.keyName).join('.');
        let changedFrom;
        let changedTo;

        if (typeof obj.oldValue === 'boolean' || obj.oldValue === null || typeof obj.oldValue === 'number') changedFrom = obj.oldValue;
        else changedFrom = _.isObject(obj.oldValue) ? '[complex value]' : `'${obj.oldValue}'`;

        if (typeof obj.newValue === 'boolean' || obj.newValue === null || typeof obj.newValue === 'number') changedTo = obj.newValue;
        else changedTo = _.isObject(obj.newValue) ? '[complex value]' : `'${obj.newValue}'`;
        str += `Property '${fullPath}' was updated. From ${changedFrom} to ${changedTo}\n`;
      }
      if (obj.state === 'removed') {
        const fullPath = name.concat(obj.keyName).join('.');
        str += `Property '${fullPath}' was removed\n`;
      }
      if (obj.state === 'added') {
        const fullPath = name.concat(obj.keyName).join('.');
        let addedValue;
        if (typeof obj.keyValue === 'boolean' || obj.keyValue === null) addedValue = obj.keyValue;
        else addedValue = _.isObject(obj.keyValue) ? '[complex value]' : `'${obj.keyValue}'`;
        str += `Property '${fullPath}' was added with value: ${addedValue}\n`;
      }
      if (obj.state === 'nested') {
        iter(obj.keyValue, name.concat(obj.keyName));
      }
    }
    return str;
  };
  return `${result}${iter(diffArray)}`.slice(0, -1);
};
export default getPlainFormat;
