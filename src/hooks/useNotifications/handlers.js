const initialState = {
  code: '',
  verb: 'IDLE',
  message: '',
}

export function start(motive) {
  return {
    code: motive,
    verb: 'REQUESTING',
    message: getMessage(motive),
  }
}

export function done(state) {
  const doneCode = state.code + '.DONE'
  return {
    code: doneCode,
    verb: 'RESOLVED',
    message: getMessage(doneCode),
  }
}

export function fail(state, error) {
  const failCode = state.code + '.FAIL'
  console.error(error)
  return {
    code: failCode,
    verb: 'REJECTED',
    message: getMessage(failCode),
  }
}

export function reset() {
  return {...initialState}
}

const MESSAGES = {
  PRODUCT: {
    ADD: {
      START: 'Adicionando novo produto...',
      DONE: 'Produto adicionando com sucesso!',
      FAIL: 'Erro ao adicionar novo produto.',
    },
    DEL: {
      START: 'Removendo produto...',
      DONE: 'Produto removido com sucesso!',
      FAIL: 'Erro ao remover produto.',
    },
    PUT: {
      START: 'Modificando produto...',
      DONE: 'Produto modificado com sucesso!',
      FAIL: 'Erro ao modificar produto.',
    },
  },
}

function getMessage(code) {
  const [domain, action, resolution] = code.split('.')
  return !resolution
    ? MESSAGES[domain][action].START
    : MESSAGES[domain][action][resolution]
}

export default initialState
