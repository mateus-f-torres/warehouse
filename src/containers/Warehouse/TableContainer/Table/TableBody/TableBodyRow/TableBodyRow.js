import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import {makeStyles} from '@material-ui/core/styles'
import {TableRow, TableCell, IconButton} from '@material-ui/core'

import {Draggable} from 'react-beautiful-dnd'

import {BODY, ORDER} from '../../config'

const useStyle = makeStyles({
  transparent: {opacity: '0.3'},
})

function EnhancedTableBodyRow(props) {
  const classes = useStyle()
  return (
    <Draggable
      index={props.index}
      draggableId={String(props.item.id)}
      isDragDisabled={props.disabled}
    >
      {(provided) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={props.disabled ? classes.transparent : ''}
        >
          <TableCell>
            <IconButton onClick={() => props.onEdit(props.item.id)}>
              <EditIcon />
            </IconButton>
          </TableCell>
          {ORDER.map((key) => (
            <TableCell key={key}>{BODY[key](props.item[key])}</TableCell>
          ))}
        </TableRow>
      )}
    </Draggable>
  )
}

export default EnhancedTableBodyRow
