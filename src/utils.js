import * as fs from 'node:fs';
import * as path from 'node:path';
import { dirname } from 'path';
// import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const pathResolver = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

export const fileReader = (file) => fs.readFileSync(path.resolve(file));

export const checkFileType = (file) => {
  let fileType;
  if (file.endsWith('.json')) fileType = '.json';
  if (file.endsWith('.yml') || file.endsWith('.yaml')) fileType = '.yml';
  return fileType;
};
