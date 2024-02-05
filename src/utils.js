import * as fs from 'node:fs';
import * as path from 'node:path';

export const pathResolver = (filepath) => path.resolve(filepath);

export const fileReader = (file) => fs.readFileSync(path.resolve(file));
