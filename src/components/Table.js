import React from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  transparent: {opacity: '0.3'},
})

function MyTable(props) {
  const classes = useStyle()
  function handleDragEnd(result) {
    console.log(result)
    if (result.destination) {
      const sourceIndex = result.source.index
      const destinationIndex = result.destination.index
      const reordered = props.list.filter((_, i) => i !== sourceIndex)
      reordered.splice(destinationIndex, 0, props.list[sourceIndex])
      props.onListReorder(reordered)
    }
  }

  const ORDER = ['id', 'product', 'stock', 'price', 'total']
  const HEAD = {
    id: 'ID',
    product: 'Produto',
    stock: 'Estoque',
    price: 'Unidade',
    total: 'Total',
  }
  const formatter = new Intl.NumberFormat('pt-BR')
  const BODY = {
    id: (value) => value,
    product: (value) => value,
    stock: (value) => formatter.format(value),
    price: (value) => `R$ ${formatter.format(value)}`,
    total: (value) => `R$ ${formatter.format(value)}`,
  }

  return (
    <TableContainer>
      <Table>
        {/* NOTE: Table Head */}
        {/* TODO: add sorting */}
        <TableHead>
          <TableRow>
            <TableCell>Ações</TableCell>
            {ORDER.map((key) => (
              <TableCell key={key}>{HEAD[key]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* NOTE: Table Body */}
        {/* TODO: add loading table skeleton */}
        {/* TODO: add empty table */}
        {/* TODO: add dnd re-order */}
        {/* TODO: add edit button */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="product-tbody">
            {(dropProvided) => (
              <>
                <TableBody
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                >
                  {!props.loading &&
                    props.list.map((item, index) => (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={String(item.id)}
                        isDragDisabled={
                          props.visibleIndex && index >= props.visibleIndex
                        }
                      >
                        {(dragProvided) => (
                          <TableRow
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className={
                              props.visibleIndex && index >= props.visibleIndex
                                ? classes.transparent
                                : ''
                            }
                          >
                            <TableCell>
                              <IconButton
                                onClick={() => props.toggleDetail(item.id)}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            {ORDER.map((key) => (
                              <TableCell key={key}>
                                {BODY[key](item[key])}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                  {dropProvided.placeholder}
                </TableBody>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </TableContainer>
  )
}
/*
function sortList(list, key) {
  const isSortInverted = state.sort.startsWith('!')
  const sortKey = isSortInverted ? state.sort.slice(1) : state.sort

  if (sortKey !== key) {
    const sortedList = [...state.visible].sort(fromLowestToHighest(key))
    return {...state, sort: key, visible: sortedList}
  } else if (isSortInverted === false) {
    const invertSort = '!' + key
    const sortedList = [...state.visible].sort(fromHighestToLowest(key))
    return {...state, sort: invertSort, visible: sortedList}
  } else {
    const sortedList = [...state.visible].sort(fromLowestToHighest(key))
    return {...state, sort: sortKey, visible: sortedList}
  }
}


function fromLowestToHighest(key) {
  return function (a, b) {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function fromHighestToLowest(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1
    } else if (a[key] < b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

*/
export default MyTable
