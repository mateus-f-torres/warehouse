import React from 'react'
import Login from '../../pages/Login/Login'
import Products from '../../pages/Products/Products'
import useUserInfo from '../../hooks/useUserInfo/useUserInfo'
import './App.css'

function App() {
  const [userInfo, setUserInfo] = useUserInfo()

  return (
    <div className="container">
      {!userInfo.username ? (
        <Login onLogin={setUserInfo} />
      ) : (
        <Products user={userInfo} />
      )}
    </div>
  )
}

export default App
