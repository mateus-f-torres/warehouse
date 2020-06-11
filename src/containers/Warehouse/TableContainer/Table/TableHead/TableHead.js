import React from 'react'
import {TableHead, TableRow, TableCell, TableSortLabel} from '@material-ui/core'

import {ORDER, HEAD} from '../config'

function EnhancedTableHead(props) {
  return (
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
  )
}

export default EnhancedTableHead
