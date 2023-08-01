export function isExceptionData(data) {
  return data === null || typeof data !== "object"
}

export function typeScalar(data) {
  return data?.isScalar === true
    || data.type === 'null'
    || data.type === 'undefined'
    || data.type === 'integer'
    || data.type === 'number'
    || data.type === 'string'
    || data.type === 'boolean'
    || data.type === 'float'
    || data.type === 'double'
}

export function typeObject(data) {
  return data.type === 'object'
}

export function typeArray(data) {
  return data.type === 'array'
}
