import _ from 'lodash';

export default function getObjectDiff(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  const keys = _.sortBy(_.union(obj1Keys, obj2Keys));

  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return [key, { type: 'added', value: obj2[key] }];
    }
    if (!_.has(obj2, key)) {
      return [key, { type: 'removed', value: obj1[key] }];
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return [key, { type: 'nested', children: getObjectDiff(obj1[key], obj2[key]) }];
    }
    if (obj1[key] !== obj2[key]) {
      return [key, { type: 'modified', oldValue: obj1[key], newValue: obj2[key] }];
    }
    return [key, { type: 'same', value: obj1[key] }];
  });
  return _.fromPairs(result);
}
