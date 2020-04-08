import React from 'react'

const formatter = new Intl.NumberFormat('pt-BR')

const COLUMNS = {
  stock: (value) => formatter.format(value),
  price: (value) => `R$ ${formatter.format(value)}`,
  total: (value) => `R$ ${formatter.format(value)}`,
}
// TODO: adicionar btn de editar
function ProductListItem(props) {
  const className = 'product__list__item'.concat(
    props.invisible ? ' -invisible' : '',
  )
  return (
    <tr
      className={className}
      onDoubleClick={(e) => props.toggleDetail(props.id)}
    >
      <td>{props.id}</td>
      <td>{props.product}</td>
      {props.columns.map((key, i) => (
        <td key={key.concat(i)}>{COLUMNS[key](props[key])}</td>
      ))}
      <td>
        <button onClick={() => props.toggleDetail(props.id)}>Editar</button>
      </td>
    </tr>
  )
}

export default ProductListItem
