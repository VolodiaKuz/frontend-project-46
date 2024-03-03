import * as yaml from 'js-yaml';

const parser = (file, fileType) => {
  if (fileType === '.json') {
    return JSON.parse(file);
  }
  if (fileType === '.yml' || fileType === '.yaml') {
    return yaml.load(file);
  }
  return null;
};
export default parser;
