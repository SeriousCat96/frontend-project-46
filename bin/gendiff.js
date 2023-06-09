#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format [stylish | plain]', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(
    (filepath1, filepath2) => console.log(
      genDiff(filepath1, filepath2, program.opts().format),
    ),
  );

program.parse();
