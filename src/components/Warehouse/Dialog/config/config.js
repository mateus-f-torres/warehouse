import validateProductName from '../validations/validateProductName'
import validateProductStock from '../validations/validateProductStock'
import validateProductPrice from '../validations/validateProductPrice'
import BR_NUMBER_PATTERN from '../utils/brNumberPattern'

export const INPUT_NAMES = ['product', 'stock', 'price']

// NOTE: based on Material-UI TextField API
const INPUTS = [
  {
    id: 'product',
    name: 'product',
    required: true,
    autoComplete: 'off',
    label: 'Nome do produto',
    onInput: validateProductName,
    inputProps: {pattern: '([\u0000-\u00FF])+'},
  },
  {
    id: 'stock',
    name: 'stock',
    required: true,
    autoComplete: 'off',
    label: 'Quantidade em estoque',
    onInput: validateProductStock,
    inputProps: {
      inputMode: 'decimal',
      pattern: BR_NUMBER_PATTERN,
    },
  },
  {
    id: 'price',
    name: 'price',
    required: true,
    autoComplete: 'off',
    label: 'Preço unitário',
    onInput: validateProductPrice,
    inputProps: {
      inputMode: 'decimal',
      pattern: BR_NUMBER_PATTERN,
    },
  },
]

export default INPUTS
