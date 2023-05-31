import stylish from './stylish.js';
import plain from './plain.js';

export default function getFormatter(data, formatName) {
  switch (formatName) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unknown formatter: ${formatName}`);
  }
}
