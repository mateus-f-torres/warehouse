import React from 'react'
import './ProductListItem.css'

/* exemplo de implementação
document.querySelectorAll('tr').forEach((row) => {
  row.style.position = 'absolute'
  row.addEventListener('touchmove', function(e) {
    row.style.top = e.targetTouches[0].pageY + 'px'
    row.style.left = e.targetTouches[0].pageX + 'px'
  })
})
*/

function handleTouchMove(e) {
  console.log(e.targetTouches[0])
  const {pageY, pageX} = e.targetTouches[0]
  e.currentTarget.style.setProperty('--top', pageY + 'px')
  e.currentTarget.style.setProperty('--left', pageX + 'px')
}

function ProductListItem(props) {
  console.log(props.position)
  const rowRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (props.position) {
      rowRef.current.style.setProperty('--left', props.position[0] + 'px')
      rowRef.current.style.setProperty('--top', props.position[1] + 'px')
    }
  }, [props.position])

  return (
    <tr
      ref={rowRef}
      className="dnd-row"
      onTouchMove={handleTouchMove}
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
