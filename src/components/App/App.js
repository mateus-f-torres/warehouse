import React from 'react'
import Login from '../../pages/Login/Login'
import Products from '../../pages/Products/Products'
import './App.css'

function App(props) {
  const [userInfo, setUserInfo] = React.useState({})

  React.useLayoutEffect(() => {
    if (localStorage.getItem('username')) {
      setUserInfo({
        username: localStorage.getItem('username'),
        company: localStorage.getItem('company'),
      })
    }
  }, [])

  function loginUser([username, company]) {
    localStorage.setItem('username', username)
    localStorage.setItem('company', company)
    setUserInfo({username, company})
  }

  return (
    <div className="container">
      {!userInfo.username ? (
        <Login handleLogin={loginUser} />
      ) : (
        <Products username={userInfo.username} company={userInfo.company} />
      )}
    </div>
  )
}

export default App
