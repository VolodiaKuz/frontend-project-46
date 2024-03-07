import * as yaml from 'js-yaml';

const getParsedFile = (file, fileType) => {
  if (fileType === '.json') {
    return JSON.parse(file);
  }
  if (fileType === '.yml' || fileType === '.yaml') {
    return yaml.load(file);
  }
  return null;
};
export default getParsedFile;
