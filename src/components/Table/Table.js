import React from 'react'

import listReducer, {
  updateList,
  changeFilter,
  changeSort,
  changeColumn,
  defaultList,
} from '../../reducers/listReducer'
import TableHeader from './TableHeader/TableHeader'
import TableBody from './TableBody/TableBody'
import addProduct from '../../assets/icons/add_product.svg'
import './Table.css'

function Table(props) {
  const [state, dispatch] = React.useReducer(listReducer, defaultList)

  React.useEffect(() => {
    if (!props.loading) {
      dispatch(updateList(props.list))
    }
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
      <button
        className="add"
        onClick={() => props.toggleDetail({})}
        disabled={props.loading}
      >
        <img src={addProduct} alt="Adicionar novo produto" />
      </button>
      <table>
        <TableHeader
          columns={state.columns}
          changeSort={handleChangeSort}
          changeColumn={handleChangeColumn}
        />
        <TableBody
          loading={props.loading}
          columns={state.columns}
          visible={state.visible}
          invisible={state.invisible}
          toggleDetail={props.toggleDetail}
        />
      </table>
    </>
  )
}

export default Table
