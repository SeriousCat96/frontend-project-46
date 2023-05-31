import _ from 'lodash';

function toString(value) {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
}

export default function format(data) {
  const iter = (currentValue, ancestry) => {
    const lines = Object
      .entries(currentValue)
      .flatMap(([key, val]) => {
        const newKey = `${ancestry}.${key}`;
        const property = _.trimStart(newKey, '.');

        switch (val.type) {
          case 'added':
            return `Property '${property}' was added with value: ${toString(val.value)}`;
          case 'removed':
            return `Property '${property}' was removed`;
          case 'modified':
            return `Property '${property}' was modified. From ${toString(val.oldValue)} to ${toString(val.newValue)}`;
          case 'nested':
            return `${iter(val.children, newKey)}`;
          default:
            return [];
        }
      }).join('\n');

    return lines;
  };

  return iter(data, '');
}
