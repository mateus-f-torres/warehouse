import React from 'react'
import Table from '@material-ui/core/Table'

import TableHead from './TableHead/TableHead'
import TableBody from './TableBody/TableBody'

function EnhancedTable(props) {
  return (
    <Table>
      <TableHead sortKey={props.sortKey} onHeaderClick={props.onHeaderClick} />
      {/* TODO: add loading table skeleton */}
      {/* TODO: add empty table */}
      {props.status == 'RESOLVED' && (
        <TableBody
          list={props.list}
          isFiltered={props.isFiltered}
          visibleIndex={props.visibleIndex}
          onEdit={props.onEdit}
          onDragAndDrop={props.onDragAndDrop}
        />
      )}
    </Table>
  )
}

export default EnhancedTable
