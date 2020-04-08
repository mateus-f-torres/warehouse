import React from 'react'
import LoadingTable from './table/LoadingTable/LoadingTable'
import ProductListItem from './ProductListItem'

function ProductListBody(props) {
  return props.loading ? (
    <LoadingTable />
  ) : (
    <tbody>
      {props.visible.map((item) => (
        <ProductListItem
          {...item}
          key={item.id}
          columns={props.columns}
          toggleDetail={props.toggleDetail}
        />
      ))}
      {props.invisible.map((item) => (
        <ProductListItem
          {...item}
          invisible
          key={item.id}
          columns={props.columns}
        />
      ))}
    </tbody>
  )
}

export default ProductListBody
