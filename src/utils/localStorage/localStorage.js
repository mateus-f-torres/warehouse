export function read(keys) {
  return keys.map((k) => localStorage.getItem(k))
}

export function write(map) {
  for (const [key, value] of Object.entries(map)) {
    localStorage.setItem(key, value)
  }
}

export function remove(keys) {
  for (const k of keys) localStorage.removeItem(k)
}
