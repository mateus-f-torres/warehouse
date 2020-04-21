import {makeStyles} from '@material-ui/core/styles'
import {GRID} from '../useLoginStyles'

const useLoginBannerStyles = makeStyles({
  banner: {
    'grid-area': GRID.banner,
    'align-self': 'end',
    'width': '100%',
    'height': '100%',
  },
})

export default useLoginBannerStyles
