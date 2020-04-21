function validateProductName(e) {
  const input = e.target
  const name = input.value
  switch (true) {
    case name.trim() === '':
      input.setCustomValidity('Nome precisa ser preenchido')
      input.checkValidity()
      break

    // TODO: do this in useDatabase, and dispatch error
    /*
    case props.checkForRepeatedProduct(name):
      input.setCustomValidity('produto já existente')
      input.checkValidity()
      break
     */

    default:
      input.setCustomValidity('')
      input.checkValidity()
      break
  }
}

export default validateProductName
