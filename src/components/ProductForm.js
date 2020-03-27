import React from 'react'

// const nameRegex = /([\u0000-\u0019\u0021-\uFFFF])+/gu
// const numberRegex = /^\d+(?:\.\d{3})*(?:,\d{1,2})?$/

function convertToNumber(str) {
  return Number(str.replace(/\./g, '').replace(',', '.'))
}

function allInputsAreValid(inputArray) {
  return inputArray.every((input) => input.validity.valid === true)
}

function ProductForm(props) {
  const [errorsVisible, toggleErrorsVisibility] = React.useState(false)
  const [errors, changeErrors] = React.useState({})

  function _handleSubmission(e) {
    e.preventDefault()
    const {product, stock, price} = e.target
    if (allInputsAreValid([product, stock, price])) {
      toggleErrorsVisibility(false)
      props.onSubmission({
        product: product.value,
        stock: convertToNumber(stock.value),
        price: convertToNumber(price.value),
      })
    } else {
      toggleErrorsVisibility(true)
      changeErrors({
        product: product.validationMessage,
        stock: stock.validationMessage,
        price: price.validationMessage,
      })
    }
  }

  function validateProductName(e) {
    const input = e.target
    const name = input.value
    if (props.checkForRepeatedProduct(name)) {
      input.setCustomValidity('produto já existente')
      input.checkValidity()
    } else {
      input.setCustomValidity('')
      input.checkValidity()
    }
  }

  function validateProductStock(e) {
    const input = e.target
    // const stock = input.value
    input.checkValidity()
  }

  function validateProductPrice(e) {
    const input = e.target
    // const price = input.value
    input.checkValidity()
  }

  const formClass = 'form'.concat(errorsVisible ? ` -validate` : '')

  /* NOTE:
      name
        should NOT be empty []
        should NOT be repeated [OK, ]
        should NOT be only numerical []
      stock
        should NOT be LESS THAN || EQUAL TO 0
        should only be numeric
      price
        should NOT be LESS THAN || EQUAL TO 0
        should only be numeric
  */

  // .form.-validate input:invalid { some style }

  return (
    <form className={formClass} noValidate onSubmit={_handleSubmission}>
      <SuperInput
        required
        type="text"
        name="product"
        error={errors.product}
        placeholder="Nome do Produto"
        pattern="([\u0000-\u0019\u0021-\uFFFF])+"
        validation={validateProductName}
      />
      <SuperInput
        required
        pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
        type="text"
        name="stock"
        placeholder="Quantidade em Estoque"
        validation={validateProductStock}
        error={errors.stock}
      />
      <SuperInput
        required
        pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
        type="text"
        name="price"
        error={errors.price}
        placeholder="Preço Unitário"
        validation={validateProductPrice}
      />
      <button type="submit">Criar</button>
    </form>
  )
}

function SuperInput(props) {
  return (
    <label>
      <input
        required={props.required}
        pattern={props.pattern}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onInput={props.validation}
      />
      {props.error && <span>{props.error}</span>}
    </label>
  )
}

export default ProductForm
