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

function getConfig(key) {
  const name = localStorage.getItem('company')
  if (CONFIG[name]) {
    return CONFIG[name][key]
  } else {
    return CONFIG.DEFAULT[key]
  }
}

export default {
  asyncDelay() {
    return Math.ceil(Math.random() * getConfig('maxDelay')) * 1000
  },
  throwRandomError() {
    if (Math.random() > getConfig('successRate')) throw new Error('Oh no!')
  },
}
