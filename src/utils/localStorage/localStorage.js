export function readFromLocalStorage(keys) {
  return keys.map((k) => localStorage.getItem(k))
}

export function writeToLocalStorage(map) {
  for (const [key, value] of Object.entries(map)) {
    localStorage.setItem(key, value)
  }
}
