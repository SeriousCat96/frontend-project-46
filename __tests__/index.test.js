import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').replace(/\r/g, '');

test('json diff success', () => {
  const filePath1 = getFixturePath('1.json');
  const filePath2 = getFixturePath('2.json');
  const result = readFile('result');

  expect(genDiff(filePath1, filePath2)).toBe(result);
});

test('yaml diff success', () => {
  const filePath1 = getFixturePath('1.yml');
  const filePath2 = getFixturePath('2.yaml');
  const result = readFile('result');

  expect(genDiff(filePath1, filePath2)).toBe(result);
});

test('txt parse error', () => {
  const filePath1 = getFixturePath('1.txt');
  const filePath2 = getFixturePath('1.txt');

  expect(() => genDiff(filePath1, filePath2)).toThrow('Unknown format: txt');
});
