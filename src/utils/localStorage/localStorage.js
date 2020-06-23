export function read(keys) {
  return keys.map((k) => window.localStorage.getItem(k))
}

export function write(map) {
  for (const [key, value] of Object.entries(map)) {
    window.localStorage.setItem(key, value)
  }
}

export function remove(keys) {
  for (const k of keys) window.localStorage.removeItem(k)
}
