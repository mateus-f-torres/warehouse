import {makeStyles} from '@material-ui/core/styles'

const useLoginPageStyles = makeStyles({
  'login': {
    'margin-top': '1rem',
    'display': 'grid',
    'grid-template-rows': '240px min-content min-content',
    'grid-template-columns': 'auto',
    'grid-template-areas': "'banner' 'title' 'form'",
    'grid-row-gap': '1rem',
    'justify-items': 'center',
  },
  'login-md': {
    'margin-top': '10vh',
    'grid-template-rows': '380px min-content min-content',
    'grid-row-gap': '2.5rem',
  },
  'banner': {
    'grid-area': 'banner',
    'align-self': 'end',
    'width': '100%',
    'height': '100%',
  },
  'title': {
    'grid-area': 'title',
  },
  'form': {
    'grid-area': 'form',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'center',
  },
  'btn': {
    margin: '0.5rem 0',
    padding: '0.75rem 0',
  },
  'text': {
    margin: '0.5rem 0',
  },
})

export default useLoginPageStyles
