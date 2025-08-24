const ESCAPED_DOT = /\\\./g
const ANY_DOT = /\./g

function hasKeyPath (object, keyPath) {
  const keys = splitKeyPath(keyPath)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (object == null || !object.hasOwnProperty(key)) {
      return false
    }
    object = object[key]
  }
  return true
}

function getValueAtKeyPath (object, keyPath) {
  if (!keyPath) return object

  const keys = splitKeyPath(keyPath)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    object = object[key]
    if (object == null) {
      return object
    }
  }
  return object
}

function setValueAtKeyPath (object, keyPath, value) {
  const keys = splitKeyPath(keyPath)
  while (keys.length > 1) {
    const key = keys.shift()
    if (object[key] == null) {
      object[key] = {}
    }
    object = object[key]
  }
  object[keys.shift()] = value
}

function deleteValueAtKeyPath (object, keyPath) {
  const keys = splitKeyPath(keyPath)
  while (keys.length > 1) {
    const key = keys.shift()
    if (object[key] == null) return;
    object = object[key]
  }
  delete object[keys.shift()];
}

function splitKeyPath (keyPath) {
  if (keyPath == null) return []

  let startIndex = 0, keyPathArray = []
  for (var i = 0; i < keyPath.length; i++) {
    const char = keyPath[i]
    if (char === '.' && (i === 0 || keyPath[i - 1] !== '\\')) {
      keyPathArray.push(keyPath.substring(startIndex, i).replace(ESCAPED_DOT, '.'))
      startIndex = i + 1
    }
  }
  keyPathArray.push(keyPath.substr(startIndex, keyPath.length).replace(ESCAPED_DOT, '.'))

  return keyPathArray
}

function pushKeyPath (keyPath, key) {
  key = key.replace(ANY_DOT, '\\.');
  if (keyPath && keyPath.length > 0)
    return keyPath + '.' + key;
  else
    return key;
}

module.exports = {
  hasKeyPath: hasKeyPath,
  getValueAtKeyPath: getValueAtKeyPath,
  setValueAtKeyPath: setValueAtKeyPath,
  deleteValueAtKeyPath: deleteValueAtKeyPath,
  splitKeyPath: splitKeyPath,
  pushKeyPath: pushKeyPath
}
