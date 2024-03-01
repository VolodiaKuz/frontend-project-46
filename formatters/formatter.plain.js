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

        if (typeof obj.oldValue === 'boolean' || obj.oldValue === null) changedFrom = obj.oldValue;
        else changedFrom = _.isObject(obj.oldValue) ? '[complex value]' : `'${obj.oldValue}'`;

        if (typeof obj.newValue === 'boolean' || obj.newValue === null) changedTo = obj.newValue;
        else changedTo = _.isObject(obj.newValue) ? '[complex value]' : `'${obj.newValue}'`;
        str += `\nProperty '${fullPath}' was updated. From ${changedFrom} to ${changedTo}`;
      }
      if (obj.state === 'removed') {
        const fullPath = name.concat(obj.keyName).join('.');
        str += `\nProperty '${fullPath}' was removed`;
      }
      if (obj.state === 'added') {
        const fullPath = name.concat(obj.keyName).join('.');
        let addedValue;
        if (typeof obj.keyValue === 'boolean' || obj.keyValue === null) addedValue = obj.keyValue;
        else addedValue = _.isObject(obj.keyValue) ? '[complex value]' : `'${obj.keyValue}'`;
        str += `\nProperty '${fullPath}' was added with value: ${addedValue}`;
      }
      if (obj.state === 'nested') {
        iter(obj.keyValue, name.concat(obj.keyName));
      }
    }
    return str;
  };
  return `${result}${iter(diffArray)}`;
};
export default getPlainFormat;
