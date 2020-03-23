import React from 'react'

function Login(props) {
  function handleSubmit(e) {
    e.preventDefault()
    const user = e.target.querySelector('#login-user').value
    const company = e.target.querySelector('#login-company').value
    props.handleLogin([user, company])
  }

  return (
    <div>
      <h1>Warehouse</h1>
      <img src="" alt="alt-test" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-user">Usuário</label>
        <input id="login-user" type="text" placeholder="Usuário" />
        <label htmlFor="login-company">Empresa</label>
        <input id="login-company" type="text" placeholder="Empresa" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default Login
