import React from 'react'

const COLUMNS = {
  stock: 'Estoque',
  price: 'Unidade',
  total: 'Total',
}

const change = ['stock', 'price', 'total']

function TableHeader(props) {
  const [popupOpen, togglePopupOpen] = React.useState(null)

  function _handleChangeColumn(newColumn) {
    props.changeColumn([popupOpen, newColumn])
    togglePopupOpen(null)
  }

  return (
    <thead>
      <tr>
        <th onClick={() => props.changeSort('id')}>ID</th>
        <th onClick={() => props.changeSort('product')}>Produto</th>
        {props.columns.map((key, i) => (
          <th key={key.concat(i)} onClick={() => props.changeSort(key)}>
            {COLUMNS[key]}
          </th>
        ))}
      </tr>
      {popupOpen && (
        <tr className="options">
          {change.map((option) => (
            <th key={option} onClick={() => _handleChangeColumn(option)}>
              {COLUMNS[option]}
            </th>
          ))}
        </tr>
      )}
    </thead>
  )
}

// TODO: achar uma forma melhor de double touch
// ruim essa tatica...mudar
/*
function getClickHandler(onClick, onDblClick, delay = 250) {
  let timeoutID = null
  return function (event) {
    if (!timeoutID) {
      timeoutID = setTimeout(function () {
        onClick(event)
        timeoutID = null
      }, delay)
    } else {
      timeoutID = clearTimeout(timeoutID)
      onDblClick(event)
    }
  }
}
 */

export default TableHeader
