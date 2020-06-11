import React from 'react'
import Box from '@material-ui/core/Box'
import TableContainer from '@material-ui/core/TableContainer'

import Table from './Table/Table'
import Filter from './Filter/Filter'

import sortList from './utils/sortList'
import filterList from './utils/filterList'
import normalizeList from './utils/normalizeList'

function EnhancedTableContainer(props) {
  const [list, setList] = React.useState([])
  const [sort, setSort] = React.useState('')
  const [filter, setFilter] = React.useState('')
  const [visibleIndex, setVisibleIndex] = React.useState(null)

  React.useEffect(() => {
    if (Array.isArray(props.data)) {
      const normalized = normalizeList(props.data)
      const [visible, invisible] = filterList(normalized, filter)

      sortList(visible, sort)

      setVisibleIndex(visible.length)
      setList([...visible, ...invisible])
    }
  }, [props.data])

  React.useEffect(() => {
    props.dataRef.current = list
  })

  function handleFilter(e) {
    const value = e.target.value.trim()
    const [visible, invisible] = filterList(list, value)

    sortList(visible, sort)

    setFilter(value)
    setVisibleIndex(visible.length)
    setList([...visible, ...invisible])
  }

  function handleSort(key) {
    const isSortInverted = sort.startsWith('!')
    const sortKey = isSortInverted ? sort.slice(1) : sort
    const visibleList = list.slice(0, visibleIndex || undefined)
    const invisibleList = list.slice(visibleIndex || list.length)

    if (sortKey !== key) {
      sortList(visibleList, key)
      setSort(key)
    } else if (!isSortInverted) {
      const invertedKey = '!' + key
      sortList(visibleList, invertedKey)
      setSort(invertedKey)
    } else {
      sortList(visibleList, key)
      setSort(sortKey)
    }

    setList([...visibleList, ...invisibleList])
  }

  function handleReorder(source, destination) {
    const reordered = list.filter((_, i) => i !== source)
    reordered.splice(destination, 0, list[source])
    setList(reordered)
    setSort('custom')
  }

  return (
    <Box>
      <Filter onFilter={handleFilter} />
      <TableContainer>
        <Table
          list={list}
          sortKey={sort}
          status={props.status}
          isFiltered={Boolean(filter)}
          visibleIndex={visibleIndex}
          onEdit={props.onEdit}
          onHeaderClick={handleSort}
          onDragAndDrop={handleReorder}
        />
      </TableContainer>
    </Box>
  )
}

export default EnhancedTableContainer
