import React from 'react'
import Login from '../../pages/Login/Login'
import './App.css'
import Products from '../../pages/Products/Products'

function App(props) {
  const [userIsLoggedIn, setUserLoginStatus] = React.useState(false)
  const [company, setCompany] = React.useState('')
  const [user, setUser] = React.useState('')

  React.useLayoutEffect(() => {
    if (localStorage.getItem('user')) {
      setCompany(localStorage.getItem('company'))
      setUser(localStorage.getItem('user'))

      setUserLoginStatus(true)
    }
  }, [])

  function loginUser([newUser, newCompany]) {
    setUser(newUser)
    setCompany(newCompany)

    localStorage.setItem('user', newUser)
    localStorage.setItem('company', newCompany)

    setUserLoginStatus(true)
  }

  return (
    <div className="container">
      {!userIsLoggedIn ? (
        <Login handleLogin={loginUser} />
      ) : (
        <Products user={user} company={company} />
      )}
    </div>
  )
}

export default App
