import React from 'react'

function ProductListItem(props) {
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.product}</td>
      <td>{props.formatter.format(props.stock)}</td>
      <td>&#82;&#36; {props.formatter.format(props.price)}</td>
      <td>
        &#82;&#36;{' '}
        {props.formatter.format((props.stock * props.price).toFixed(2))}
      </td>
      <td>
        <button onClick={() => props.onDelete(props.product)}>Deletar</button>
      </td>
    </tr>
  )
}

export default ProductListItem
