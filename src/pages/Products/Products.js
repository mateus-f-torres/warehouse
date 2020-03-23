import React from 'react'

function Products(props) {
  return (
    <div>
      <p>{`Olá ${props.username}`}</p>
      <p>{`da empresa ${props.company}`}</p>
    </div>
  )
}

export default Products
