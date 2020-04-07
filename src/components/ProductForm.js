import React from 'react'

import TextInput from './common/TextInput/TextInput'
import Button from './common/Button/Button'

// A-Z | a-z | vogais acentuadas caixa-alta e caixa-baixa
// const nameRegex = /([\u0041-\u005A\u0061-\u007A\u00C0-\u00FF])+/gu
// ao menos um numero | pode ter ponto para dividir centenas | pode ter virgula para dividir decimal
// const numberRegex = /^\d+(?:\.\d{3})*(?:,\d{1,2})?$/

export function convertToNumber(str) {
  return Number(str.replace(/\./g, '').replace(',', '.'))
}

// TODO: pegar o formatter do ProductListBody
/*
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
 */

// TODO: edit ? stock <= 0 deleta
// TODO: adicionar botão deletar

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
      props.addProduct({
        product: product.value,
        stock: convertToNumber(stock.value),
        price: convertToNumber(price.value),
      })
      props.toggleDetail(null)
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

  return (
    <form noValidate className={formClass} onSubmit={_handleSubmission}>
      <TextInput
        required
        name="product"
        default={props.detail ? props.detail.product : ''}
        autocomplete="off"
        pattern="([\u0000-\u00FF])+"
        placeholder="Nome do Produto"
        onInput={validateProductName}
      />
      {errors.product && <span>{errors.product}</span>}
      <TextInput
        required
        name="stock"
        default={props.detail ? props.detail.stock : ''}
        autocomplete="off"
        pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
        placeholder="Quantidade em Estoque"
        onInput={validateProductStock}
      />
      {errors.stock && <span>{errors.stock}</span>}
      <TextInput
        required
        name="price"
        default={props.detail ? props.detail.price : ''}
        autocomplete="off"
        pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
        placeholder="Preço Unitário"
        onInput={validateProductPrice}
      />
      {errors.price && <span>{errors.price}</span>}
      <Button
        type="button"
        label="Deletar"
        onClick={() => props.removeProduct(props.detail.id)}
      />
      <Button
        type="button"
        label="Cancelar"
        onClick={() => props.toggleDetail(null)}
      />
      <Button type="submit" label="Criar" />
    </form>
  )
}

export default ProductForm
