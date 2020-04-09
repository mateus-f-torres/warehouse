import React from 'react'
import LoadingTable from '../LoadingTable/LoadingTable'
import TableBodyItem from './TableBodyItem/TableBodyItem'

function TableBody(props) {
  return props.loading ? (
    <LoadingTable />
  ) : (
    <tbody>
      {props.visible.map((item) => (
        <TableBodyItem
          {...item}
          key={item.id}
          columns={props.columns}
          toggleDetail={props.toggleDetail}
        />
      ))}
      {props.invisible.map((item) => (
        <TableBodyItem
          {...item}
          invisible
          key={item.id}
          columns={props.columns}
        />
      ))}
    </tbody>
  )
}

export default TableBody
