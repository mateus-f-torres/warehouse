const formatter = new Intl.NumberFormat('pt-BR')

export const ORDER = ['id', 'product', 'stock', 'price', 'total']

export const HEAD = {
  id: 'ID',
  product: 'Produto',
  stock: 'Estoque',
  price: 'Unidade',
  total: 'Total',
}

export const BODY = {
  id: (value) => value,
  product: (value) => value,
  stock: (value) => formatter.format(value),
  price: (value) => `R$ ${formatter.format(value)}`,
  total: (value) => `R$ ${formatter.format(value)}`,
}
