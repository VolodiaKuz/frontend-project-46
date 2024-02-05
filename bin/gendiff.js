#!/usr/bin/env node
import genDiff from '../src/index.js';
import { program } from 'commander';

program
  .name('gendiff')
  .description('  Compares two configuration files and shows the difference.')
  .version('1.0.0')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    
    const options = program.opts();
    if (options.format) {
      console.log('gendiff started with options')
    } else

    console.log(result);
  })

  program.command('join')
  .action(() => {
    console.log('gendiff started with extra command');
  });

program.parse(process.argv);
