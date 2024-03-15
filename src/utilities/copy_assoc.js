import { toRaw } from 'vue';
import { isExceptionData, typeArray, typeObject, typeScalar } from '@/utilities/data_type';

function __toArray(data, depth = 1) {
  const space = depth * 4;

  let result = '[\n';

  const iterable = Array.isArray(data) ? data.entries() : Object.entries(data);

  for (const [key, value] of iterable) {
    let line = ' '.repeat(space);
    let objectKey = '';

    if (typeof key !== 'number') {
      const propertyNames = key.split('@');
      objectKey = propertyNames[propertyNames.length - 1];
    }

    line += typeof key === 'number' ? String(key) : `"${objectKey}"`;
    line += ' => ';
    line += unpack(value, depth + 1) + ',\n';

    result += line;
  }

  result += ' '.repeat((depth - 1) * 4) + ']';

  if (depth === 1) {
    result += ';';
  }

  return result;
}

function __toScalar(data) {
  return typeof data === 'string' ? `"${data}"` : data;
}

function unpack(data, depth = 1) {
  if (isExceptionData(data)) {
    return __toScalar(data);
  } else if (typeScalar(data)) {
    return __toScalar(data.value);
  } else if (typeArray(data)) {
    return __toArray(data.value, depth);
  } else if (typeObject(data)) {
    return __toArray(data.value, depth);
  }
}

export default function copyAssoc(data) {
  const clone = toRaw(data);

  return unpack(clone);
}
