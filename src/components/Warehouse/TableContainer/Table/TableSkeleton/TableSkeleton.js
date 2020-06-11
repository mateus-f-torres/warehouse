import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import {TableBody, TableRow, TableCell} from '@material-ui/core'

const EMPTY_COLUMNS = [null, null, null, null, null, null]

function TableSkeleton(props) {
  const ref = React.useRef(null)
  const [loadingRows, setLoadingRows] = React.useState([])

  React.useEffect(() => {
    if (ref.current) {
      const emptyArray = []
      let rows = 0

      if (!props.rows) {
        rows = calculateHowManyRows(ref.current, 70)
      } else {
        rows = props.rows
      }

      for (let i = 0; i < rows; i++) emptyArray[i] = null
      setLoadingRows(emptyArray)
    }
  }, [ref.current])

  return (
    <TableBody ref={ref}>
      {loadingRows.map((_, i) => (
        <TableRow key={i}>
          {EMPTY_COLUMNS.map((__, j) => (
            <TableCell key={j}>
              <Skeleton variant="rect" height={45} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

function calculateHowManyRows(ref, cellHeight) {
  const tbodyTop = ref.getBoundingClientRect().top
  const windowHeight = window.screen.height
  return Math.floor((windowHeight - tbodyTop) / cellHeight)
}

export default TableSkeleton
