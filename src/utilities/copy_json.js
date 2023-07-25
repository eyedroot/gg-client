import {toRaw} from "vue";
import {typeArray, typeObject, typeScalar} from "@/utilities/data_type";

function __toArray(data) {
  const result = Array.isArray(data)
    ? []
    : {}

  const iterable = Array.isArray(data)
    ? data.entries()
    : Object.entries(data)

  for (const [key, value] of iterable) {
    if (Array.isArray(result)) {
      result.push(unpack(value))
    } else {
      result[key] = unpack(value)
    }
  }

  return result
}

function __toObject(data) {
  const result = {}

  for (const [key, value] of Object.entries(data)) {
    const propertyNames = key.split('@')

    result[propertyNames[propertyNames.length - 1]] = unpack(value)
  }

  return result
}

function __toScalar(data) {
  return data
}

function unpack(data) {
  if (typeScalar(data)) {
    return __toScalar(data.value)
  }
  else if (typeArray(data)) {
    return __toArray(data.value)
  }
  else if (typeObject(data)) {
    return __toObject(data.value)
  }
}

export default function copyJson(data) {
  const clone = toRaw(data)

  return unpack(clone)
}
