function createRandomProducts(quantity = 1) {
  const randoms = []
  for (let i = 0; i < quantity; i++) randoms.push(randomProduct())
  return randoms
}

function randomProduct() {
  return {
    product: 'MOCK',
    stock: 10,
    price: 10,
    total: 100,
  }
}

export default createRandomProducts
