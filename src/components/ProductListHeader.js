import React from 'react'

function ProductListHeader(props) {
  return (
    <thead>
      <tr>
        <th onClick={() => props.onHeaderClick('id')}>Id</th>
        <th onClick={() => props.onHeaderClick('product')}>Nome</th>
        <th onClick={() => props.onHeaderClick('stock')}>Estoque</th>
        <th onClick={() => props.onHeaderClick('price')}>Unidade</th>
        <th onClick={() => props.onHeaderClick('total')}>Total</th>
      </tr>
    </thead>
  )
}

export default ProductListHeader
