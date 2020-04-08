// NOTE: since this is just an illusion of asynchronicity
//        we can read the localStorage company to change how we react

const CONFIG = {
  TEST_COMPANY: {delay: 0, error: 1},
  DEFAULT: {delay: 10, error: 0.9},
}

function getConfig(key) {
  const name = localStorage.getItem('company')
  if (CONFIG[name]) {
    return CONFIG[name][key]
  } else {
    return CONFIG.DEFAULT[key]
  }
}

export default getConfig
