import React from 'react'
import ProductList from '../../organisms/ProductList/ProductList'

const MOCK_PRODUCT_LIST = [
  {id: 1, name: 'Peanut Butter', stock: 2, price: 22.39},
  {id: 2, name: 'Wine', stock: 4, price: 47.99},
  {id: 3, name: 'Post-it notes', stock: 387, price: 0.09},
  {id: 4, name: 'Eggs', stock: 17, price: 0.69},
  {id: 5, name: 'Pens', stock: 8, price: 2.99},
  {id: 6, name: 'Peanut Butter Jelly Sandwich', stock: 5, price: 6.19},
  {id: 7, name: 'Mamão', stock: 2, price: 3.49},
  {id: 8, name: 'Café em pó', stock: 2, price: 15.47},
  {id: 9, name: 'Caroço de mamão', stock: 87, price: 0.07},
]

function Products(props) {
  return (
    <div>
      <p>{`Olá ${props.username}`}</p>
      <p>{`da empresa ${props.company}`}</p>
      <input placeholder="Buscar" />
      <button>Adicionar novo produto</button>
      <ProductList list={MOCK_PRODUCT_LIST} />
    </div>
  )
}

export default Products
