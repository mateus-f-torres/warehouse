import {createMuiTheme} from '@material-ui/core/styles'

import montserratSubrayada from './fonts/montserratSubrayada'
import {
  robotoLight,
  robotoRegular,
  robotoMedium,
  robotoBold,
} from './fonts/roboto'

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

export default theme
