import '@testing-library/cypress/add-commands'

beforeEach(() => {
  const request = indexedDB.open('DigitalWarehouse', 1)
  // handle errors
  request.onerror = () => {}
  // handle new DB opening
  request.onupgradeneeded = () => {}
  // onSuccess getAll and dispatch
  request.onsuccess = (event) => {
    const clearRequest = event.target.result
      .transaction(['products'], 'readwrite')
      .objectStore('products')
      .clear()
    clearRequest.onerror = () => {}
    clearRequest.onsuccess = () => {}
  }
})
