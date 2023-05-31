import yaml from 'js-yaml';

export default function parseObject(obj, format) {
  switch (format) {
    case 'json':
      return JSON.parse(obj);
    case 'yml':
    case 'yaml':
      return yaml.load(obj);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}
