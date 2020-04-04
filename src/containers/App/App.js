import React from 'react'
import LoginPage from '../LoginPage/LoginPage'
import ProductsPage from '../ProductsPage/ProductsPage'
import useUserInfo from '../../hooks/useUserInfo'
import useDatabase from '../../hooks/useDatabase'
import './App.css'

function App() {
  const user = useUserInfo()
  const database = useDatabase()

  return (
    <div className="container">
      {!user.username ? (
        <LoginPage onLogin={user.createNewUser} />
      ) : (
        <ProductsPage
          list={database.list}
          sort={database.sort}
          company={user.company}
          username={user.username}
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
