import React from 'react'
import './Table/LoadingTable/LoadingTable.css'

const EMPTY_COLUMNS = [null, null, null, null, null]

function LoadingTable() {
  const ref = React.useRef(null)
  const [loadingRows, setLoadingRows] = React.useState([])

  React.useEffect(() => {
    if (ref.current) {
      const emptyArray = []
      const tbodyTop = ref.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const rows = Math.floor((windowHeight - tbodyTop) / 32)
      for (let i = 0; i < rows; i++) emptyArray[i] = null
      setLoadingRows(emptyArray)
    }
  }, [ref.current])

  return (
    <tbody ref={ref} className="loadingTable">
      {loadingRows.map((_, i) => (
        <tr key={i} style={{animationDelay: `${i * 2}50ms`}}>
          {EMPTY_COLUMNS.map((__, j) => (
            <td key={j} />
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default LoadingTable
