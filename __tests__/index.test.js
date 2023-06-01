import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').replace(/\r/g, '');

test('json diff with stylish formatter is success', () => {
  const filePath1 = getFixturePath('1.json');
  const filePath2 = getFixturePath('2.json');
  const result = readFile('stylish-result');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(result);
});

test('json diff with plain formatter is success', () => {
  const filePath1 = getFixturePath('1.json');
  const filePath2 = getFixturePath('2.json');
  const result = readFile('plain-result');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(result);
});

test('json diff with json formatter is success', () => {
  const filePath1 = getFixturePath('1.json');
  const filePath2 = getFixturePath('2.json');
  const result = readFile('result.json');

  expect(genDiff(filePath1, filePath2, 'json')).toBe(result);
});

test('yaml diff with stylish formatter is success', () => {
  const filePath1 = getFixturePath('1.yml');
  const filePath2 = getFixturePath('2.yaml');
  const result = readFile('stylish-result');

  expect(genDiff(filePath1, filePath2, 'stylish')).toBe(result);
});

test('yaml diff with plain formatter is success', () => {
  const filePath1 = getFixturePath('1.yml');
  const filePath2 = getFixturePath('2.yaml');
  const result = readFile('plain-result');

  expect(genDiff(filePath1, filePath2, 'plain')).toBe(result);
});

test('yaml diff with json formatter is success', () => {
  const filePath1 = getFixturePath('1.yml');
  const filePath2 = getFixturePath('2.yaml');
  const result = readFile('result.json');

  expect(genDiff(filePath1, filePath2, 'json')).toBe(result);
});

test('txt parse error', () => {
  const filePath1 = getFixturePath('1.txt');
  const filePath2 = getFixturePath('1.txt');

  expect(() => genDiff(filePath1, filePath2, 'stylish')).toThrow('Unknown format: txt');
});

test('unknown formatter error', () => {
  const filePath1 = getFixturePath('1.json');
  const filePath2 = getFixturePath('2.json');

  expect(() => genDiff(filePath1, filePath2, 'dummy')).toThrow('Unknown formatter: dummy');
});
