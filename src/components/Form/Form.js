import React from 'react'

import TextInput from '../common/TextInput/TextInput'
import Button from '../common/Button/Button'

import validateProductName from './validations/validateProductName'
import validateProductStock from './validations/validateProductStock'
import validateProductPrice from './validations/validateProductPrice'
import './Form.css'

// A-Z | a-z | vogais acentuadas caixa-alta e caixa-baixa
// const nameRegex = /([\u0041-\u005A\u0061-\u007A\u00C0-\u00FF])+/gu
// ao menos um numero | pode ter ponto para dividir centenas | pode ter virgula para dividir decimal
// const numberRegex = /^\d+(?:\.\d{3})*(?:,\d{1,2})?$/

/*
function calculateTotal(stock, price) {
  if (stock && price) {
    const stockNumber = convertToNumber(stock)
    const priceNumber = convertToNumber(price)
    const totalNumber = (stockNumber * priceNumber).toFixed(2)
    return formatter.format(totalNumber)
  } else {
    return '00,00'
  }
}
 */

function convertToNumber(str) {
  return Number(str.replace(/\./g, '').replace(',', '.'))
}

const formatter = new Intl.NumberFormat('pt-BR')

function allInputsAreValid(inputArray) {
  return inputArray.every((input) => input.validity.valid === true)
}

function Form(props) {
  const [errorsVisible, toggleErrorsVisibility] = React.useState(false)
  const [errors, changeErrors] = React.useState({})

  React.useEffect(() => {
    // TODO: js router
    // NOTE: initial draft of client-side vanilla js router
    window.onpopstate = function () {
      if (window.location.pathname == '/') props.toggleDetail(null)
    }
    window.history.pushState(
      {},
      '',
      props.detail ? props.detail.product : 'novo-produto',
    )
    return () => {
      if (window.location.pathname != '/') window.history.back()
    }
  }, [])

  function _handleSubmission(e) {
    e.preventDefault()
    const {product, stock, price} = e.target
    if (allInputsAreValid([product, stock, price])) {
      toggleErrorsVisibility(false)
      const numberStock = convertToNumber(stock.value)
      const numberPrice = convertToNumber(price.value)
      // NOTE: edit mode
      if (props.detail) {
        props.updateProduct(props.detail.id, {
          product: product.value,
          stock: numberStock,
          price: numberPrice,
          total: Number((numberStock * numberPrice).toFixed(2)),
        })
        // NOTE: create mode
      } else {
        props.addProduct({
          product: product.value,
          stock: numberStock,
          price: numberPrice,
        })
      }
      props.toggleDetail(null)

      // NOTE: invalid
    } else {
      toggleErrorsVisibility(true)
      changeErrors({
        product: product.validationMessage,
        stock: stock.validationMessage,
        price: price.validationMessage,
      })
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') props.toggleDetail(null)
  }

  const formClass = 'form'.concat(errorsVisible ? ` -validate` : '')

  return (
    <div className="modal">
      <form
        noValidate
        className={formClass}
        onSubmit={_handleSubmission}
        onKeyDown={handleKeyDown}
      >
        <h3 className="form__title">
          <span>#{props.detail ? props.detail.id : '_'}</span>{' '}
          <span>{props.detail ? props.detail.product : 'Novo produto'}</span>
        </h3>
        <button
          data-testid="cancel"
          type="button"
          className="form__exit"
          autoFocus
          onClick={() => props.toggleDetail(null)}
        >
          X
        </button>
        <label htmlFor="product">
          Nome do produto
          <TextInput
            required
            id="product"
            name="product"
            default={props.detail ? props.detail.product : ''}
            autocomplete="off"
            pattern="([\u0000-\u00FF])+"
            onInput={validateProductName}
          />
          {errors.product && <p>{errors.product}</p>}
        </label>
        <label htmlFor="stock">
          Quantidade em estoque
          <TextInput
            required
            name="stock"
            inputmode="decimal"
            default={props.detail ? formatter.format(props.detail.stock) : ''}
            autocomplete="off"
            pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
            onInput={validateProductStock}
          />
          {errors.stock && <p>{errors.stock}</p>}
        </label>
        <label htmlFor="price">
          Preço unitário
          <TextInput
            required
            name="price"
            inputmode="decimal"
            default={props.detail ? formatter.format(props.detail.price) : ''}
            autocomplete="off"
            pattern="\d+(?:\.\d{3})*(,\d{1,2})?"
            onInput={validateProductPrice}
          />
          {errors.price && <p>{errors.price}</p>}
        </label>
        <div className="form__buttons">
          {props.detail && (
            <Button
              type="button"
              label="Deletar"
              onClick={() => {
                props.removeProduct(props.detail.id)
                props.toggleDetail(null)
              }}
            />
          )}
          <Button type="submit" label={props.detail ? 'Editar' : 'Criar'} />
        </div>
      </form>
    </div>
  )
}

export default Form
