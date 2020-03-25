import React from 'react'
import ProductList from '../../components/ProductList'
import useDatabase from '../../hooks/useDatabase'

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

function ProductsPage(props) {
  const [filteredList, changeFilteredList] = React.useState(MOCK_PRODUCT_LIST)
  const database = useDatabase()

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

  const [userIsAddingProduct, toggleUserIsAddingProduct] = React.useState(false)

  function handleNewProductSubmission(e) {
    e.preventDefault()
    const {
      product: {value: product},
      stock: {value: stock},
      price: {value: price},
    } = e.target
    addNewProductToList({product, stock, price})
    toggleUserIsAddingProduct(!userIsAddingProduct)
  }

  function addNewProductToList({product, stock, price}) {
    console.log(database.getAllProducts())
    database.addProduct({
      stock,
      price,
      name: product,
      id: 10,
    })
  }

  return (
    <div>
      <p>{`Olá ${props.userInfo.username}`}</p>
      <p>{`da empresa ${props.userInfo.company}`}</p>
      <input placeholder="Buscar" onChange={handleSearch} />
      <button onClick={() => toggleUserIsAddingProduct(!userIsAddingProduct)}>
        Adicionar novo produto
      </button>
      {userIsAddingProduct && (
        <form onSubmit={handleNewProductSubmission}>
          <input type="text" placeholder="Nome do Produto" name="product" />
          <input
            type="number"
            placeholder="Quantidade em Estoque"
            name="stock"
          />
          <input
            type="number"
            step="0.01"
            placeholder="Preço Unitário"
            name="price"
          />
          <button type="submit">Criar</button>
        </form>
      )}
      <ProductList list={filteredList} />
    </div>
  )
}

export default ProductsPage