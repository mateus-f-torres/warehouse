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
          required
          type="text"
          id="login-user"
          name="username"
          placeholder="Usuário"
        />
        <label htmlFor="login-company">Empresa</label>
        <input
          required
          type="text"
          id="login-company"
          name="company"
          placeholder="Empresa"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}

export default LoginPage
