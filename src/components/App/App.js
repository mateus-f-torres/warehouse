import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import {Container, CssBaseline} from '@material-ui/core'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Login from '../Login/Login'
import Warehouse from '../Warehouse/Warehouse'

import useUser from '../../hooks/useUser/useUser'
import theme from './theme'

export const UserContext = React.createContext(null)

function App() {
  const [user, {createUser, deleteUser}] = useUser()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <UserContext.Provider value={user}>
          <BrowserRouter>
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
          </BrowserRouter>
        </UserContext.Provider>
      </Container>
    </ThemeProvider>
  )
}

export default App
