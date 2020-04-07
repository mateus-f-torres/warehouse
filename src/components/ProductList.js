import React from 'react'

import listReducer, {
  updateList,
  changeFilter,
  changeSort,
  changeColumn,
  defaultList,
} from '../reducers/listReducer'
import ProductListHeader from './ProductListHeader'
import ProductListBody from './ProductListBody'
import addProduct from '../assets/icons/add_product.svg'

function ProductList(props) {
  const [state, dispatch] = React.useReducer(listReducer, defaultList)

  React.useEffect(() => {
    dispatch(updateList(props.list))
  }, [props.list])

  function handleSearch(e) {
    dispatch(changeFilter(e.target.value.trim()))
  }

  function handleChangeSort(key) {
    dispatch(changeSort(key))
  }

  function handleChangeColumn(pair) {
    dispatch(changeColumn(pair))
  }

  return (
    <>
      <input className="search" placeholder="Buscar" onChange={handleSearch} />
      <button className="add" onClick={() => props.toggleDetail({})}>
        <img src={addProduct} />
      </button>
      <table>
        <ProductListHeader
          columns={state.columns}
          changeSort={handleChangeSort}
          changeColumn={handleChangeColumn}
        />
        <ProductListBody
          columns={state.columns}
          visible={state.visible}
          invisible={state.invisible}
          toggleDetail={props.toggleDetail}
        />
      </table>
    </>
  )
}

export default ProductList
