import React from 'react'
import ProductListItem from './ProductListItem'
import {normalizeString} from '../containers/App/App'
import {convertToNumber} from './ProductForm'

function ProductListBody(props) {
  const [visibleList, changeVisibleList] = React.useState([])
  React.useLayoutEffect(() => {
    const newVisibleList = props.list.filter(
      ({product}) => normalizeString(product).search(props.filter) >= 0,
    )
    changeVisibleList(newVisibleList)
  }, [props.list, props.filter])

  const formatter = new Intl.NumberFormat('pt-BR')

  const [editing, toggleEditMode] = React.useState(null)

  function completeModification(modifications) {
    props.onEdit(editing, modifications)
    toggleEditMode(null)
  }

  const [grid, changeGrid] = React.useState([])
  const tableBodyRef = React.createRef(null)

  React.useLayoutEffect(() => {
    const {left, top} = tableBodyRef.current.getBoundingClientRect()
    const newGrid = visibleList.map((item, index) => {
      return [left, top + index * 32]
    })
    changeGrid(newGrid)
  }, [visibleList])

  // function handleTouchDrag(y) {}

  // function handleTouchDrop(y) {}

  return (
    <tbody ref={tableBodyRef} style={{position: 'relative'}}>
      {visibleList.map((productInfo, index) =>
        productInfo.product !== editing ? (
          <ProductListItem
            key={productInfo.product}
            {...productInfo}
            onDelete={props.onDelete}
            editMode={toggleEditMode}
            formatter={formatter}
            position={grid[index]}
          />
        ) : (
          <Editing
            key={productInfo.product}
            {...productInfo}
            onComplete={completeModification}
            onCancel={() => toggleEditMode(null)}
            formatter={formatter}
          />
        ),
      )}
    </tbody>
  )
}

function Editing(props) {
  const [modifications, updateModifications] = React.useState({})

  React.useEffect(() => {
    updateModifications({
      product: props.product,
      stock: props.formatter.format(props.stock),
      price: props.formatter.format(props.price),
    })
  }, [])

  const total = calculateTotal(modifications.stock, modifications.price)

  function calculateTotal(stock, price) {
    if (stock && price) {
      const stockNumber = convertToNumber(stock)
      const priceNumber = convertToNumber(price)
      const totalNumber = (stockNumber * priceNumber).toFixed(2)
      return props.formatter.format(totalNumber)
    } else {
      return '00,00'
    }
  }

  function handleInput(e) {
    const {name, value} = e.target
    updateModifications((prevModifications) =>
      Object.assign({}, prevModifications, {[name]: value}),
    )
  }

  function completeModifications() {
    const {product, stock, price} = modifications
    const stockNumber = convertToNumber(stock)
    const priceNumber = convertToNumber(price)
    const totalNumber = Number((stockNumber * priceNumber).toFixed(2))
    props.onComplete({
      product,
      stock: stockNumber,
      price: priceNumber,
      total: totalNumber,
    })
  }

  // NOTE: colocar a cifra como ::before
  // TODO: colocar validação dos campos
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <input
          name="product"
          defaultValue={modifications.product}
          autoComplete="off"
          onInput={handleInput}
        />
      </td>
      <td>
        <input
          name="stock"
          defaultValue={modifications.stock}
          autoComplete="off"
          onInput={handleInput}
        />
      </td>
      <td>
        <input
          name="price"
          defaultValue={modifications.price}
          autoComplete="off"
          onInput={handleInput}
        />
      </td>
      <td>&#82;&#36; {total}</td>
      <td>
        <button onClick={props.onCancel}>Cancelar</button>
      </td>
      <td>
        <button onClick={completeModifications}>Concluir</button>
      </td>
    </tr>
  )
}

export default ProductListBody
