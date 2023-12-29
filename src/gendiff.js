#!/usr/bin/env node
import { program } from 'commander';

console.log('hello Volodia');

const gendiff = (filepath1, filepath2) => {
  console.log('hello Volod');
};

program
  .name('gendiff')
  .description('  Compares two configuration files and shows a difference.')
  .version('1.0.0');

// program
//   .command('diff')
//   .description('This command generates the difference between 2 files')
//   .argument('<first>', 'path to first file')
//   .argument('<second>', 'path to second file')
//   .action((first, second) => {
//     const result = gendiff();
//     console.log(result);
//   });

program.parse();

export default gendiff;
