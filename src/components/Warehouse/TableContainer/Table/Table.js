import React from 'react'
import Table from '@material-ui/core/Table'

import TableHead from './TableHead/TableHead'
import TableBody from './TableBody/TableBody'
import TableSkeleton from './TableSkeleton/TableSkeleton'
import {AsyncContext} from '../../Warehouse'

function EnhancedTable(props) {
  const status = React.useContext(AsyncContext)
  return (
    <Table>
      <TableHead sortKey={props.sortKey} onHeaderClick={props.onHeaderClick} />
      {status.verb == 'REQUESTING' ? (
        <TableSkeleton rows={props.list.length} />
      ) : (
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
