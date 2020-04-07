import React from 'react'
import './LoginPage.css'
import bannerImg from '../../assets/images/banner.svg'

function LoginPage(props) {
  function handleSubmit(e) {
    e.preventDefault()
    const {username, company} = e.target
    props.onLogin([username.value, company.value])
  }

  return (
    <div className="login">
      <h1 className="login-title">Warehouse</h1>
      <img className="login-img" src={bannerImg} alt="hi" />
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="login-user">
          Usuário
        </label>
        <input
          autoComplete="off"
          required
          type="text"
          className="login-input"
          id="login-user"
          name="username"
          placeholder="Usuário"
        />
        <label className="login-label" htmlFor="login-company">
          Empresa
        </label>
        <input
          autoComplete="off"
          className="login-input"
          required
          type="text"
          id="login-company"
          name="company"
          placeholder="Empresa"
        />
        <button className="login-btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginPage
