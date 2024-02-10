import * as yaml from 'js-yaml';

const parser = (file, fileType) => {
  let result;
  if (fileType === '.json') {
    result = JSON.parse(file);
  }
  if (fileType === '.yml' || fileType === '.yaml') {
    result = yaml.load(file);
  }
  return result;
};
export default parser;
