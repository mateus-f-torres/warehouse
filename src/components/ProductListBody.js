import React from 'react'
import ProductListItem from './ProductListItem'
import {normalizeString} from '../containers/ProductsPage/ProductsPage'
import {convertToNumber} from './ProductForm'

function ProductListBody(props) {
  const [list, changeList] = React.useState([[], []])

  React.useEffect(() => {
    const visible = []
    const invisible = []

    for (const item of props.list) {
      normalizeString(item.product).search(props.filter) >= 0
        ? visible.push(item)
        : invisible.push(item)
    }

    changeList([visible, invisible])
  }, [props.list, props.filter])

  const formatter = new Intl.NumberFormat('pt-BR')

  const [editing, toggleEditMode] = React.useState(null)

  function completeModification(modifications) {
    props.onEdit(editing, modifications)
    toggleEditMode(null)
  }

  return (
    <tbody>
      {list[0].map((productInfo) =>
        productInfo.id !== editing ? (
          <ProductListItem
            key={productInfo.id}
            {...productInfo}
            onDelete={props.onDelete}
            editMode={toggleEditMode}
            formatter={formatter}
          />
        ) : (
          <Editing
            key={productInfo.id}
            {...productInfo}
            onComplete={completeModification}
            onCancel={() => toggleEditMode(null)}
            formatter={formatter}
          />
        ),
      )}
      {list[1].map((p) => (
        <ProductListItem
          key={p.product}
          formatter={formatter}
          invisible
          {...p}
        />
      ))}
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
