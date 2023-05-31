import fs from 'fs';
import path from 'path';
import parseObject from './parsers.js';
import getObjectDiff from './diff.js';

function resolvePath(filepath) {
  if (!path.isAbsolute(filepath)) {
    return path.resolve(process.cwd(), filepath);
  }

  return filepath;
}

function importObject(objPath) {
  return fs.readFileSync(objPath, 'utf8');
}

function getObjectFormat(objPath) {
  return path.extname(objPath).slice(1);
}

export default function genDiff(objPath1, objPath2) {
  const objFormat1 = getObjectFormat(objPath1);
  const objFormat2 = getObjectFormat(objPath2);

  const path1 = resolvePath(objPath1);
  const path2 = resolvePath(objPath2);

  const obj1 = parseObject(importObject(path1), objFormat1);
  const obj2 = parseObject(importObject(path2), objFormat2);

  return getObjectDiff(obj1, obj2);
}
