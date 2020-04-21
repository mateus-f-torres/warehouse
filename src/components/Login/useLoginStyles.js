import {makeStyles} from '@material-ui/core/styles'

export const GRID = {
  title: 'title',
  banner: 'banner',
  form: 'form',
}

const useLoginStyles = makeStyles({
  'login': {
    'margin-top': '1rem',
    'display': 'grid',
    'grid-template-rows': '240px min-content min-content',
    'grid-template-columns': 'auto',
    'grid-template-areas': `'${GRID.banner}' '${GRID.title}' '${GRID.form}'`,
    'grid-row-gap': '1rem',
    'justify-items': 'center',
  },
  'login-md': {
    'margin-top': '10vh',
    'grid-template-rows': '380px min-content min-content',
    'grid-row-gap': '2.5rem',
  },
})

export default useLoginStyles
