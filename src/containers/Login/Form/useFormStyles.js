import {makeStyles} from '@material-ui/core/styles'
import {GRID} from '../useLoginStyles'

const useFormStyles = makeStyles({
  form: {
    'max-width': '90vw',
    'grid-area': GRID.form,
    'display': 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
  },
  btn: {
    margin: '0.5rem 0',
    padding: '0.75rem 0',
  },
  text: {
    margin: '0.5rem 0',
  },
})

export default useFormStyles
