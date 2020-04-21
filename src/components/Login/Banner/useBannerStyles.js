import {makeStyles} from '@material-ui/core/styles'
import {GRID} from '../useLoginStyles'

const useBannerStyles = makeStyles({
  banner: {
    'grid-area': GRID.banner,
    'align-self': 'end',
    'height': '100%',
  },
})

export default useBannerStyles
