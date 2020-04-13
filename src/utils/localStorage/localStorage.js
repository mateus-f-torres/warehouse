export function readFromLocalStorage(keys) {
  return keys.map((k) => localStorage.getItem(k))
}

export function writeToLocalStorage(map) {
  for (const [key, value] of Object.entries(map)) {
    localStorage.setItem(key, value)
  }
}

export function removeFromLocalStorage(keys) {
  for (const k of keys) localStorage.removeItem(k)
}
