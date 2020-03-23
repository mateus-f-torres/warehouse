import React from 'react'

function ProductList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Estoque</th>
          <th>Unidade</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.list.map(({id, name, stock, price}) => (
          <tr key={name}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{stock}</td>
            <td>{price}</td>
            <td>{(stock * price).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductList
