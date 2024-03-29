import getPlainFormat from './formatter.plain.js';
import getStylishFormat from './formatter.stylish.js';

const getFormattedDiff = (diff, format) => {
  if (format === 'stylish') return getStylishFormat(diff);
  if (format === 'plain') return getPlainFormat(diff);
  if (format === 'json') return JSON.stringify(getStylishFormat(diff));
  return null;
};
export default getFormattedDiff;
