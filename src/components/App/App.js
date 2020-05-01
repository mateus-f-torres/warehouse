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

export const UserContext = React.createContext(null)

const montserratSubrayada = {
  fontFamily: 'Montserrat Subrayada',
  fontStyle: 'normal',
  fontDisplay: 'block',
  fontWeight: 700,
  src: `
    local('MontserratSubrayada-Bold'),
    url(fonts/montserrat-subrayada-v9-latin-700.woff2) format('woff2'),
    url(fonts/montserrat-subrayada-v9-latin-700.woff) format('woff')
  `,
  unicodeRange:
    'U+0057, U+0041, U+0052, U+0045, U+0048, U+004F, U+0055, U+0053',
}

const robotoLight = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 300,
  src: `
    local('Roboto Light'),
    local('Roboto-Light'),
    url('fonts/roboto-v20-latin-300.woff2') format('woff2'),
    url('fonts/roboto-v20-latin-300.woff') format('woff'),
   `,
}

const robotoRegular = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Roboto'),
    local('Roboto-Regular'),
    url('fonts/roboto-v20-latin-regular.woff2') format('woff2'),
    url('fonts/roboto-v20-latin-regular.woff') format('woff')
   `,
}

const robotoMedium = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Roboto Medium'),
    local('Roboto-Medium'),
    url('fonts/roboto-v20-latin-500.woff2') format('woff2'),
    url('fonts/roboto-v20-latin-500.woff') format('woff')
   `,
}

const robotoBold = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 700,
  src: `
    local('Roboto Bold'),
    local('Roboto-Bold'),
    url('fonts/roboto-v20-latin-700.woff2') format('woff2'),
    url('fonts/roboto-v20-latin-700.woff') format('woff')
   `,
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Montserrat Subrayada, sans-serif',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [
          robotoLight,
          robotoRegular,
          robotoMedium,
          robotoBold,
          montserratSubrayada,
        ],
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
