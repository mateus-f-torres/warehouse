import React from 'react'

import visibleListReducer, {
  updateList,
  changeFilter,
  changeSort,
  defaultVisibleList,
} from '../reducers/visibleListReducer'
import ProductListHeader from './ProductListHeader'
import ProductListBody from './ProductListBody'

function ProductList(props) {
  const [state, dispatch] = React.useReducer(
    visibleListReducer,
    defaultVisibleList,
  )

  React.useEffect(() => {
    dispatch(updateList(props.list))
  }, [props.list])

  function handleSearch(e) {
    dispatch(changeFilter(e.target.value.trim()))
  }

  function handleHeaderClick(key) {
    dispatch(changeSort(key))
  }

  return (
    <div>
      <input className="search" placeholder="Buscar" onChange={handleSearch} />
      <table>
        <ProductListHeader onHeaderClick={handleHeaderClick} />
        <ProductListBody
          visible={state.visible}
          invisible={state.invisible}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      </table>
    </div>
  )
}

export default ProductList
