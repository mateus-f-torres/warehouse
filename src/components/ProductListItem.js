import React from 'react'

function ProductListItem(props) {
  const className = 'product__list__item'.concat(
    props.invisible ? ' -invisible' : '',
  )
  return (
    <tr className={className} onDoubleClick={(e) => props.editMode(props.id)}>
      <td>{props.id}</td>
      <td>{props.product}</td>
      <td>{props.formatter.format(props.stock)}</td>
      <td>&#82;&#36; {props.formatter.format(props.price)}</td>
      <td>&#82;&#36; {props.formatter.format(props.total)}</td>
      <td>
        <button onClick={() => props.editMode(props.id)}>Editar</button>
      </td>
      <td>
        <button onClick={() => props.onDelete(props.id)}>Deletar</button>
      </td>
    </tr>
  )
}

export default ProductListItem
