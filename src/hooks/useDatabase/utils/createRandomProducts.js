import faker from 'faker'

function createRandomProducts(id, quantity = 1) {
  const randoms = []

  for (let i = 0; i < quantity; i++) {
    randoms.push(randomProduct())
  }

  return randoms.map((r) => ({...r, id: id++})).reverse()
}

function randomProduct() {
  const price = Number(faker.commerce.price() / 100).toFixed(2)
  const stock = Math.floor(faker.finance.amount() / 10)
  const total = Number((stock * price).toFixed(2))
  return {
    product: faker.commerce.product(),
    stock,
    price,
    total,
  }
}

export default createRandomProducts
