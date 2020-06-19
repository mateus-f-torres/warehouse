/* NOTE:
  This is a illusion of asynchronicity for the IndexedDB API
  Normally we would fake the API responses to invoke errors and delays
  That way we could tests for those cases in Cypress

  To allow that same level of control we use mock company names
  Associating each one with a level of delay or error

  e.g.
  maxDelay: 5
    at most 5000ms of delay before executing callback
  successRate: 0.9
    90% chance of NOT throwing an error
 */

const CONFIG = {
  TEST_COMPANY: {maxDelay: 0, successRate: 1},
  DEFAULT: {maxDelay: 5, successRate: 0.9},
}

const promisify = (fn) => new Promise(fn)

function fakeAPI(fn) {
  return async function (...args) {
    await promisify(randomDelay)
    await promisify(randomError)

    return fn.apply(null, args)
  }
}

function randomDelay(resolve) {
  window.setTimeout(resolve, timer())
}

function randomError(resolve, reject) {
  if (Math.random() > getConfig('successRate')) {
    reject(new Error('Erro Aleatório!'))
  } else {
    resolve()
  }
}

function timer() {
  return Math.ceil(Math.random() * getConfig('maxDelay')) * 1000
}

function getConfig(key) {
  const name = localStorage.getItem('company')
  if (CONFIG[name]) {
    return CONFIG[name][key]
  } else {
    return CONFIG.DEFAULT[key]
  }
}

export default fakeAPI
