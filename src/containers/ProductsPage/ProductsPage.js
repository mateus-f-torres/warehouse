import React from 'react'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

import {UserContext} from '../App/App'
import useDatabase from '../../hooks/useDatabase'

import Header from '../../components/Header'
import Table from '../../components/Table'
import CustomDialog from '../../components/CustomDialog'
import SmallScreenFAB from '../../components/SmallScreenFAB'

const useStyle = makeStyles({
  search: {'margin-top': '5rem', 'margin-bottom': '1rem'},
})

function ProductsPage(props) {
  const classes = useStyle()

  const draft = React.useRef()
  const user = React.useContext(UserContext)
  const [database, dispatch] = useDatabase(user, draft)

  const [list, setList] = React.useState([])
  const [sort, setSort] = React.useState('')
  const [filter, setFilter] = React.useState('')
  const [visibleIndex, setVisibleIndex] = React.useState(null)

  const [detail, toggleDetail] = React.useState(null)

  React.useEffect(() => {
    if (database) {
      const normalized = database.map((item) => ({
        ...item,
        normalized: normalize(item.product),
      }))

      const [visible, invisible] = filterList(normalized, filter)

      sortList(visible, sort)
      setVisibleIndex(visible.length)
      setList([...visible, ...invisible])
    }
  }, [database])

  React.useEffect(() => {
    draft.current = list
  })

  function repeatedProductCheck(name) {
    return database.find(({product}) => product == name) !== undefined
  }

  function handleFilter(e) {
    const value = e.target.value.trim()
    const [visible, invisible] = filterList(list, value)
    sortList(visible, sort)
    setFilter(value)
    setVisibleIndex(visible.length)
    setList([...visible, ...invisible])
  }

  function handleSort(key) {
    const isSortInverted = sort.startsWith('!')
    const sortKey = isSortInverted ? sort.slice(1) : sort
    const visibleList = list.slice(0, visibleIndex || undefined)
    const invisibleList = list.slice(visibleIndex || list.length)

    if (sortKey !== key) {
      sortList(visibleList, key)
      setSort(key)
    } else if (!isSortInverted) {
      const invertedKey = '!' + key
      sortList(visibleList, invertedKey)
      setSort(invertedKey)
    } else {
      sortList(visibleList, key)
      setSort(sortKey)
    }

    setList([...visibleList, ...invisibleList])
  }

  function handleReorder(source, destination) {
    const reordered = list.filter((_, i) => i !== source)
    reordered.splice(destination, 0, list[source])
    setList(reordered)
    setSort('custom')
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
        onChange={handleFilter}
        className={classes.search}
      />
      <Table
        list={list}
        loading={loading}
        sortKey={sort}
        visibleIndex={visibleIndex}
        toggleDetail={toggleDetail}
        onListReorder={handleReorder}
        onHeaderClick={handleSort}
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

function sortList(list, key) {
  if (key.startsWith('!')) {
    list.sort(fromHighestToLowest(key.slice(1)))
  } else {
    list.sort(fromLowestToHighest(key))
  }
}

function fromLowestToHighest(key) {
  return function (a, b) {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function fromHighestToLowest(key) {
  return function (a, b) {
    if (a[key] > b[key]) {
      return -1
    } else if (a[key] < b[key]) {
      return 1
    } else {
      return 0
    }
  }
}

function filterList(list, value = '.') {
  const key = value == normalize(value) ? 'normalized' : 'product'
  const regex = new RegExp(value, 'ig')
  const filteredIn = []
  const filteredOut = []

  for (const i of list) {
    i[key].search(regex) >= 0 ? filteredIn.push(i) : filteredOut.push(i)
  }

  return [filteredIn, filteredOut]
}

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default ProductsPage
