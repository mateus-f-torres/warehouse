import React from 'react'
import ProductListHeader from './ProductListHeader'
import ProductListBody from './ProductListBody'

function ProductList(props) {
  return (
    <table>
      <ProductListHeader onHeaderClick={props.reOrder} />
      <ProductListBody
        list={props.list}
        filter={props.filter}
        onDelete={props.onDelete}
      />
    </table>
  )
}

export default ProductList
