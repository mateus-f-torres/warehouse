const initialState = {
  verb: '',
  message: '',
}

/*
status: {
  verb: 'RESOLVED',
  message: 'Produto adicionado com sucesso!',
},
status: {
  verb: 'RESOLVED',
  message: 'Produto removido com sucesso!',
},
status: {
  verb: 'RESOLVED',
  message: 'Produto modificado com sucesso!',
},
*/

export function requestStarted(state, motive) {
  return {
    message: motive,
    verb: 'REQUESTING',
  }
}

export function requestFailed(state, error) {
  console.error(error)
  return {
    verb: 'REJECTED',
    message: error.message,
  }
}

export function requestReset(state) {
  return {
    verb: 'IDLE',
    message: '',
  }
}

export default initialState
