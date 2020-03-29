import React from 'react'

// A-Z | a-z | vogais acentuadas caixa-alta e caixa-baixa
// const nameRegex = /([\u0041-\u005A\u0061-\u007A\u00C0-\u00FF])+/gu
// ao menos um numero | pode ter ponto para dividir centenas | pode ter virgula para dividir decimal
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
    switch (true) {
      case name.trim() === '':
        input.setCustomValidity('produto precisa de um nome')
        input.checkValidity()
        break

      case props.checkForRepeatedProduct(name):
        input.setCustomValidity('produto já existente')
        input.checkValidity()
        break

      default:
        input.setCustomValidity('')
        input.checkValidity()
        break
    }
  }

  function validateProductStock(e) {
    const input = e.target
    const stock = input.value
    switch (true) {
      case input.validity.patternMismatch:
        input.setCustomValidity('quantidade precisa ser numerica')
        input.checkValidity()
        break

      case convertToNumber(stock) <= 0:
        input.setCustomValidity('quantidade em estoque não pode ser 0')
        input.checkValidity()
        break

      default:
        input.setCustomValidity('')
        input.checkValidity()
        break
    }
  }

  function validateProductPrice(e) {
    const input = e.target
    const price = input.value
    switch (true) {
      case input.validity.patternMismatch:
        input.setCustomValidity('valor unitário precisa ser numerico')
        input.checkValidity()
        break

      case convertToNumber(price) <= 0:
        input.setCustomValidity('valor unitário não pode ser 0')
        input.checkValidity()
        break

      default:
        input.setCustomValidity('')
        input.checkValidity()
        break
    }
  }

  const formClass = 'form'.concat(errorsVisible ? ` -validate` : '')

  // .form.-validate input:invalid { some style }

  return (
    <form className={formClass} noValidate onSubmit={_handleSubmission}>
      <SuperInput
        required
        type="text"
        name="product"
        error={errors.product}
        placeholder="Nome do Produto"
        pattern="([\u0000-\u00FF])+"
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
        placeholder="Preço Unitário"
        validation={validateProductPrice}
        error={errors.price}
      />
      <button type="button" onClick={props.closeModal}>
        Cancelar
      </button>
      <button type="submit">Criar</button>
    </form>
  )
}

function SuperInput(props) {
  return (
    <label>
      <input
        autoComplete="off"
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
