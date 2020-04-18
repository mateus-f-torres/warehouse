import React from 'react'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'

import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles({
  transparent: {opacity: '0.3'},
})

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

function MyTable(props) {
  const classes = useStyle()

  function handleDragEnd(result) {
    if (result.destination) {
      const from = result.source.index
      const to = result.destination.index
      props.onListReorder(from, to)
    }
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ações</TableCell>
            {ORDER.map((key) => (
              <TableCell key={key}>
                <TableSortLabel
                  active={props.sortKey.includes(key)}
                  direction={props.sortKey.includes('!') ? 'asc' : 'desc'}
                  onClick={() => props.onHeaderClick(key)}
                >
                  {HEAD[key]}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/* NOTE: Table Body */}
        {/* TODO: add loading table skeleton */}
        {/* TODO: add empty table */}
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

export default MyTable
