#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .name('gendiff')
  .description('  Compares two configuration files and shows the difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, keys) => {
    const format = keys.format;
    // const { format } = keys.format;
    genDiff(filepath1, filepath2, format);
  });

program.parse();
