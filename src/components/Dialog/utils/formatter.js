const formatter = new Intl.NumberFormat('pt-BR')

const INPUT_FORMATTER = {
  product: (value) => value,
  stock: (value) => formatter.format(value),
  price: (value) => formatter.format(value),
}

export default INPUT_FORMATTER
