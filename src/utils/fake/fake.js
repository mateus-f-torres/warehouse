import getConfig from './config'

export default {
  asyncDelay() {
    return Math.ceil(Math.random() * getConfig('delay')) * 1000
  },
  throwRandomError() {
    if (Math.random() > getConfig('error')) throw new Error('Oh no!')
  },
}
