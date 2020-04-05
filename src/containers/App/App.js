import React from 'react'

import useUser from '../../hooks/useUser'
import useDatabase from '../../hooks/useDatabase'

import LoginPage from '../LoginPage/LoginPage'
import ProductsPage from '../ProductsPage/ProductsPage'
import './App.css'

export const UserContext = React.createContext(null)

function App() {
  const [user, {createNewUser}] = useUser()
  const [list, {addProduct, removeProduct, updateProduct}] = useDatabase()

  return (
    <div className="container">
      <UserContext.Provider value={user}>
        {!user.username ? (
          <LoginPage onLogin={createNewUser} />
        ) : (
          <ProductsPage
            list={list}
            addProduct={addProduct}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />
        )}
      </UserContext.Provider>
    </div>
  )
}

export default App
