import React from 'react'
import LoginPage from '../LoginPage/LoginPage'
import ProductsPage from '../ProductsPage/ProductsPage'
import useUserInfo from '../../hooks/useUserInfo'
import './App.css'

function App(props) {
  const [userInfo, createNewUser] = useUserInfo()

  return (
    <div className="container">
      {!userInfo.username ? (
        <LoginPage onLogin={createNewUser} />
      ) : (
        <ProductsPage userInfo={userInfo} />
      )}
    </div>
  )
}

export default App
