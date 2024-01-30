import * as fs from 'node:fs';
import * as path from 'node:path';

export const pathResolver = (filepath) => {
  return path.resolve(filepath);
};

export const fileReader = (file) => {
  return fs.readFileSync(path.resolve(file));
};
