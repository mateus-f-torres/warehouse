import React from 'react'
import './ProductListItem.css'

function ProductListItem(props) {
  const [touchY, setTouchY] = React.useState(null)
  const [dragging, toggleDragging] = React.useState(false)
  const rowRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (props.position) {
      rowRef.current.style.setProperty('--top', props.position + 'px')
    }
  }, [props.position, props.positionLocked])

  function handleTouchStart(e) {
    setTouchY(e.changedTouches[0].pageY)
    toggleDragging(true)
    props.onTouchStart()
  }

  function handleTouchMove(e) {
    const prevTop = Number(
      e.currentTarget.style.getPropertyValue('--top').slice(0, -2),
    )

    const {pageY} = e.changedTouches[0]
    const distance = touchY - pageY
    const movement = Math.abs(distance)
    const newTop = distance < 0 ? prevTop + movement : prevTop - movement

    e.currentTarget.style.setProperty('--top', newTop + 'px')

    setTouchY(pageY)
    props.onTouchDrag(newTop, props.index)
  }

  function handleTouchEnd(e) {
    setTouchY(null)
    toggleDragging(false)
    props.onTouchDrop()
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
