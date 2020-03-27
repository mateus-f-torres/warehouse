import React from 'react'
import LoginPage from '../LoginPage/LoginPage'
import ProductsPage from '../ProductsPage/ProductsPage'
import useUserInfo from '../../hooks/useUserInfo'
import useDatabase from '../../hooks/useDatabase'
import './App.css'

function App() {
  const [userInfo, createNewUser] = useUserInfo()
  const database = useDatabase()

  function initializeNewUser(user) {
    database.clearAllProducts()
    createNewUser(user)
  }

  return (
    <div className="container">
      {!userInfo.username ? (
        <LoginPage onLogin={initializeNewUser} />
      ) : (
        <ProductsPage
          list={database.list}
          sort={database.sort}
          company={userInfo.company}
          username={userInfo.username}
          reOrder={database.reOrder}
          addProduct={database.addProduct}
          updateProduct={database.updateProduct}
          removeProduct={database.removeProduct}
        />
      )}
    </div>
  )
}

export default App
