import React from 'react'

import TextInput from '../../components/common/TextInput/TextInput'
import Button from '../../components/common/Button/Button'

import './LoginPage.css'
import banner from '../../assets/images/banner.svg'

function LoginPage(props) {
  function handleSubmit(e) {
    e.preventDefault()
    const {username, company} = e.target
    props.onLogin([username.value, company.value])
  }

  return (
    <div className="login">
      <h1 className="login__title">Warehouse</h1>
      <img className="login__banner" src={banner} alt="Warehouse Banner" />
      <form noValidate className="login__form" onSubmit={handleSubmit}>
        <TextInput
          required
          name="username"
          id="login-username"
          autocomplete="off"
          placeholder="Usuário"
        />
        <TextInput
          required
          name="company"
          id="login-company"
          autocomplete="off"
          placeholder="Empresa"
        />
        <Button type="submit" label="Entrar" />
      </form>
    </div>
  )
}

export default LoginPage
