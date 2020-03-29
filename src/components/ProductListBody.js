import React from 'react'
import ProductListItem from './ProductListItem'
import {normalizeString} from '../containers/App/App'

function ProductListBody(props) {
  const visibleList = props.list.filter(
    ({product}) => normalizeString(product).search(props.filter) >= 0,
  )

  const formatter = new Intl.NumberFormat('pt-BR')

  return (
    <tbody>
      {visibleList.map((productInfo) => (
        <ProductListItem
          key={productInfo.product}
          {...productInfo}
          onDelete={props.onDelete}
          formatter={formatter}
        />
      ))}
    </tbody>
  )
}

export default ProductListBody
