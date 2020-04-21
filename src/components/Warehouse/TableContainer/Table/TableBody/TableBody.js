import React from 'react'
import TableBody from '@material-ui/core/TableBody'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import TableBodyRow from './TableBodyRow/TableBodyRow'

function EnhancedTableBody(props) {
  function handleDragEnd(result) {
    if (result.destination) {
      const source = result.source.index
      const destination = result.destination.index
      props.onDragAndDrop(source, destination)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="product-tbody">
        {(provided) => (
          <TableBody ref={provided.innerRef} {...provided.droppableProps}>
            {props.list.map((item, index) => (
              <TableBodyRow
                key={item.id}
                item={item}
                index={index}
                disabled={props.isFiltered && index >= props.visibleIndex}
                onEdit={props.onEdit}
              />
            ))}
            {provided.placeholder}
          </TableBody>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default EnhancedTableBody
