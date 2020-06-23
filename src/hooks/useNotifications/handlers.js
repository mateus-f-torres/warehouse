const initialState = {
  verb: 'IDLE',
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

  ('Adicionando novo produto...'))
  ('Removendo produto...'))
  ('Modificando produto...'))
*/

export function start(state, motive) {
  return {
    message: motive,
    verb: 'REQUESTING',
  }
}

export function fail(state, error) {
  console.error(error)
  return {
    verb: 'REJECTED',
    message: error.message,
  }
}

export function reset(state) {
  return {
    verb: 'IDLE',
    message: '',
  }
}

export default initialState
