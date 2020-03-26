import React from 'react'
import './Login.css'
import bannerImg from '../../assets/images/banner.svg'

function Login(props) {
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
          className="login-input"
          id="login-user"
          name="username"
          type="text"
          placeholder="Usuário"
        />
        <label className="login-label" htmlFor="login-company">
          Empresa
        </label>
        <input
          className="login-input"
          id="login-company"
          name="company"
          type="text"
          placeholder="Empresa"
        />
        <button className="login-btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
