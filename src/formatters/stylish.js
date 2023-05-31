import _ from 'lodash';

const placeholder = ' ';
const indentsCount = 4;

const prefixes = {
  added: '+ ',
  removed: '- ',
  same: '  ',
};

function getIndent(depth) {
  return placeholder.repeat(depth * indentsCount - 2);
}

export default function format(data) {
  const iter = (curentValue, depth) => {
    if (!_.isPlainObject(curentValue)) {
      return `${curentValue}`;
    }

    const bracketIndent = placeholder.repeat((depth - 1) * indentsCount);
    const lines = Object
      .entries(curentValue)
      .map(([key, val]) => {
        switch (val.type) {
          case 'added':
          case 'removed':
          case 'same':
            return `${getIndent(depth)}${prefixes[val.type]}${key}: ${iter(val.value, depth + 1)}`;
          case 'modified':
            return `${getIndent(depth)}- ${key}: ${iter(val.oldValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${iter(val.newValue, depth + 1)}`;
          case 'nested':
            return `${getIndent(depth)}  ${key}: ${iter(val.children, depth + 1)}`;
          default:
            return `${getIndent(depth)}  ${key}: ${iter(val.value || val, depth + 1)}`;
        }
      });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
}
