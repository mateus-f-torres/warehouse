import React from 'react'
import Table from '../../components/Table'

import useDatabase from '../../hooks/useDatabase'
import Header from '../../components/Header'
import {UserContext} from '../App/App'
import SmallScreenFAB from '../../components/SmallScreenFAB'
import CustomDialog from '../../components/CustomDialog'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const useStyle = makeStyles({
  search: {'margin-top': '5rem', 'margin-bottom': '1rem'},
})

function ProductsPage(props) {
  const classes = useStyle()
  const user = React.useContext(UserContext)
  const [database, dispatch] = useDatabase(user)

  const [list, setList] = React.useState([])
  const [filter, setFilter] = React.useState(/./)
  const [visibleIndex, setVisibleIndex] = React.useState(null)

  const [detail, toggleDetail] = React.useState(null)

  // NOTE: add/edit/remove resetam a visualização
  React.useEffect(() => {
    if (database) {
      setList(database)
    }
  }, [database])

  function repeatedProductCheck(name) {
    return database.find(({product}) => product == name) !== undefined
  }

  function filterList(e) {
    const value = e.target.value.trim()
    if (filter) {
      const focusList = []
      const unfocusList = []
      const newFilter = new RegExp(normalizeString(value), 'ig')
      for (const item of database) {
        normalizeString(item.product).search(newFilter) >= 0
          ? focusList.push(item)
          : unfocusList.push(item)
      }
      setFilter(newFilter)
      setVisibleIndex(focusList.length)
      setList([...focusList, ...unfocusList])
    } else {
      setFilter(/./)
      setVisibleIndex(null)
      setList(database)
    }
  }

  const loading = database === null

  return (
    <div className="products">
      <Header
        user={user}
        onLogout={props.onLogout}
        onClearAllProducts={dispatch.clearAllProducts}
      />
      <TextField
        fullWidth
        placeholder="Buscar"
        onChange={filterList}
        className={classes.search}
      />
      <Table
        list={list}
        loading={loading}
        visibleIndex={visibleIndex}
        toggleDetail={toggleDetail}
        onListReorder={setList}
      />
      <CustomDialog
        open={detail !== null}
        onClose={() => toggleDetail(null)}
        addProduct={dispatch.addProduct}
        removeProduct={dispatch.removeProduct}
        updateProduct={dispatch.updateProduct}
        toggleDetail={toggleDetail}
        detail={detail ? database.find(({id}) => id === detail) : null}
        checkForRepeatedProduct={repeatedProductCheck}
      />
      <SmallScreenFAB visible={!loading} onClick={() => toggleDetail({})} />
    </div>
  )
}

export default ProductsPage
