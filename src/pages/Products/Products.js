import React from 'react'
import ProductList from '../../organisms/ProductList/ProductList'

const MOCK_PRODUCT_LIST = [
  {id: 1, name: 'Wine', stock: 4, price: 47.99},
  {id: 2, name: 'Butterscotch', stock: 2, price: 22.39},
  {id: 3, name: 'Coconut Butter', stock: 5, price: 6.19},
  {id: 4, name: 'Egg Roll', stock: 3, price: 2.99},
  {id: 5, name: 'Eggplant', stock: 4, price: 4.29},
  {id: 6, name: 'Mamão', stock: 2, price: 3.49},
  {id: 7, name: 'Café em pó', stock: 2, price: 15.47},
  {id: 8, name: 'Caroço de mamão', stock: 87, price: 0.07},
  {id: 9, name: 'Filtro de café', stock: 2, price: 3.99},
]

function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function Products(props) {
  const [filteredList, changeFilteredList] = React.useState(MOCK_PRODUCT_LIST)
  function handleSearch(e) {
    const input = e.target.value.trim()
    if (input) {
      const normalizedInput = normalizeString(input)
      const inputRegex = new RegExp(normalizedInput, 'ig')
      changeFilteredList(
        MOCK_PRODUCT_LIST.filter(
          ({name}) => normalizeString(name).search(inputRegex) >= 0,
        ),
      )
    } else {
      changeFilteredList(MOCK_PRODUCT_LIST)
    }
  }

  return (
    <div>
      <p>{`Olá ${props.username}`}</p>
      <p>{`da empresa ${props.company}`}</p>
      <input placeholder="Buscar" onChange={handleSearch} />
      <button>Adicionar novo produto</button>
      <ProductList list={filteredList} />
    </div>
  )
}

export default Products
