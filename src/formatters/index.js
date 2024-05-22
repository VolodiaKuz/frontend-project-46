import getPlainFormat from './formatter.plain.js';
import getStylishFormat from './formatter.stylish.js';

const getFormattedDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return getStylishFormat(diff);
    case 'plain':
      return getPlainFormat(diff);
    case 'json':
      return JSON.stringify(getStylishFormat(diff));
    default:
      throw new Error(`Invalid format - ${format}`);
  }
};
export default getFormattedDiff;
