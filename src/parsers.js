import * as yaml from 'js-yaml';

const getParsedFile = (file, fileType) => {
  switch (fileType) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Invalid extension - ${fileType}`);
  }
};
export default getParsedFile;
