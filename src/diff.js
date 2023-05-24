import _ from 'lodash';

export default function getObjectDiff (obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const getDiff = (acc, key) => {
    if (obj1Keys.includes(key) && obj2Keys.includes(key)) {
      return obj1[key] === obj2[key]
        ? [...acc, `    ${key}: ${obj1[key]}`]
        : [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    return obj1Keys.includes(key) ? [...acc, `  - ${key}: ${obj1[key]}`] : [...acc, `  + ${key}: ${obj2[key]}`];
  };

  const result = keys.reduce(getDiff, []);

  return `{\n${result.join('\n')}\n}`;
}
