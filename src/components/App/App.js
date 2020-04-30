import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import useUser from '../../hooks/useUser'
import Login from '../Login/Login'
import Warehouse from '../Warehouse/Warehouse'

import MontserratSubrayadaWoff2 from '../../assets/fonts/montserrat-subrayada-v9-latin-700.woff2'
import MontserratSubrayadaWoff from '../../assets/fonts/montserrat-subrayada-v9-latin-700.woff'

export const UserContext = React.createContext(null)

/*
 * TODO: read more about
 *    unicode-range, font-display, <link rel="preload" />, Font Loading API
 *    should I hash fonts as well ?
 *    that prevents rel=preload...kinda
 */

const montserratSubrayada = {
  fontFamily: 'Montserrat Subrayada',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('MontserratSubrayada-Bold'),
    url(${MontserratSubrayadaWoff2}) format('woff2'),
    url(${MontserratSubrayadaWoff}) format('woff')
  `,
  unicodeRange:
    'U+0057, U+0041, U+0052, U+0045, U+0048, U+004F, U+0055, U+0053',
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Montserrat Subrayada, sans-serif',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [montserratSubrayada],
      },
    },
  },
})

function App() {
  const [user, {createUser, deleteUser}] = useUser()
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  )
}

export default App
