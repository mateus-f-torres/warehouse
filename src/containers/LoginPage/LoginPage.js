import React from 'react'

function LoginPage(props) {
  function handleSubmit(e) {
    e.preventDefault()
    const {username, company} = e.target
    props.onLogin([username.value, company.value])
  }

  return (
    <div>
      <h1>Warehouse</h1>
      <img src="" alt="alt-test" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-user">Usuário</label>
        <input
          id="login-user"
          name="username"
          type="text"
          placeholder="Usuário"
        />
        <label htmlFor="login-company">Empresa</label>
        <input
          id="login-company"
          name="company"
          type="text"
          placeholder="Empresa"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginPage
