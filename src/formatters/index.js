import stylish from './stylish.js';
import plain from './plain.js';

export default function getFormatter(data, name) {
  switch (name) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown formatter: ${name}`);
  }
}
