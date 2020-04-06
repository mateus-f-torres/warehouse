import React from 'react'
import ProductListItem from './ProductListItem'

const formatter = new Intl.NumberFormat('pt-BR')

function ProductListBody(props) {
  return (
    <tbody>
      {props.visible.map((item) => (
        <ProductListItem
          {...item}
          key={item.id}
          formatter={formatter}
          toggleDetail={props.toggleDetail}
        />
      ))}
      {props.invisible.map((item) => (
        <ProductListItem
          {...item}
          invisible
          key={item.id}
          formatter={formatter}
        />
      ))}
    </tbody>
  )
}

export default ProductListBody
