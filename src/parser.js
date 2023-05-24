export default function parseObject(obj, format) {
  switch (format) {
    case 'json':
      return JSON.parse(obj);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}
