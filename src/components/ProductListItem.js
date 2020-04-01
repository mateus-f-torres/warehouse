import React from 'react'
import './ProductListItem.css'

function ProductListItem(props) {
  const [touchY, setTouchY] = React.useState(null)
  const [dragging, toggleDragging] = React.useState(false)
  const rowRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (props.position) {
      rowRef.current.style.setProperty('--top', props.position[1] + 'px')
    }
  }, [props.position])

  function handleTouchStart(e) {
    setTouchY(e.targetTouches[0].pageY)
    toggleDragging(true)
  }

  function handleTouchMove(e) {
    const prevTop = Number(
      e.currentTarget.style.getPropertyValue('--top').slice(0, -2),
    )
    const {pageY} = e.targetTouches[0]
    const distance = touchY - pageY
    const movement = Math.abs(distance)

    distance < 0
      ? e.currentTarget.style.setProperty('--top', prevTop + movement + 'px')
      : e.currentTarget.style.setProperty('--top', prevTop - movement + 'px')

    // props.onTouchDrag(pageY)
    setTouchY(pageY)
  }

  function handleTouchEnd(e) {
    setTouchY(null)
    toggleDragging(false)
  }

  const itemClass = 'dnd-row'.concat(dragging ? ' -dragging' : '')

  return (
    <tr
      ref={rowRef}
      className={itemClass}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={(e) => props.editMode(props.product)}
    >
      <td>{props.id}</td>
      <td>{props.product}</td>
      <td>{props.formatter.format(props.stock)}</td>
      <td>&#82;&#36; {props.formatter.format(props.price)}</td>
      <td>&#82;&#36; {props.formatter.format(props.total)}</td>
      <td>
        <button onClick={() => props.editMode(props.product)}>Editar</button>
      </td>
      <td>
        <button onClick={() => props.onDelete(props.product)}>Deletar</button>
      </td>
    </tr>
  )
}

export default ProductListItem
