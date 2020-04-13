import React from 'react'

import useUser from '../../hooks/useUser'
import LoginPage from '../LoginPage/LoginPage'
import ProductsPage from '../ProductsPage/ProductsPage'
import './App.css'

export const UserContext = React.createContext(null)

function App() {
  const [user, {createNewUser, deleteUser}] = useUser()

  return (
    <div className="container">
      <UserContext.Provider value={user}>
        {!user.username ? (
          <LoginPage onLogin={createNewUser} />
        ) : (
          <ProductsPage onLogout={deleteUser} />
        )}
      </UserContext.Provider>
    </div>
  )
}

export default App
