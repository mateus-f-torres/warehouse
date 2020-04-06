import React from 'react'
import ProductListItem from './ProductListItem'

function ProductListBody(props) {
  return (
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
