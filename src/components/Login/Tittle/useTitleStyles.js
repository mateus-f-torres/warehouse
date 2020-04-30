import {makeStyles} from '@material-ui/core/styles'
import {GRID} from '../useLoginStyles'

const useTitleStyles = makeStyles({
  title: {
    'grid-area': GRID.title,
    'font-family': 'Montserrat Subrayada',
    'text-transform': 'uppercase',
  },
})

export default useTitleStyles
