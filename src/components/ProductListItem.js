import React from 'react'

function ProductListItem(props) {
  return (
    <tr onDoubleClick={(e) => props.editMode(props.product)}>
      <td>{props.id}</td>
      <td>{props.product}</td>
      <td>{props.formatter.format(props.stock)}</td>
      <td>{`&#82;&#36; ${props.formatter.format(props.price)}`}</td>
      <td>{`&#82;&#36; ${props.formatter.format(props.total)}`}</td>
      <td>
        <button onClick={() => props.editMode(props.product)}>Editar</button>
      </td>
      <td>
        <button onClick={() => props.onDelete(props.product)}>Deletar</button>
      </td>
    </tr>
  )
}

export default ProductListItem
