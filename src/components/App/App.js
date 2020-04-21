import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import useUser from '../../hooks/useUser'
import Login from '../Login/Login'
import Warehouse from '../Warehouse/Warehouse'

export const UserContext = React.createContext(null)

function App() {
  const [user, {createUser, deleteUser}] = useUser()
  return (
    <>
      <CssBaseline />
      <Container>
        <UserContext.Provider value={user}>
          <Router>
            <Switch>
              <Route exact path="/login">
                {!user.username ? (
                  <Login onLogin={createUser} />
                ) : (
                  <Redirect to="/app" />
                )}
              </Route>
              <Route exact path="/app">
                {user.username ? (
                  <Warehouse onLogout={deleteUser} />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route>
                <Redirect to="/login" />
              </Route>
            </Switch>
          </Router>
        </UserContext.Provider>
      </Container>
    </>
  )
}

export default App
