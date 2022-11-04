const productsArray = [
  {
    id: 'price_1M0WzFDYfpInpYc8thky2pOI',
    title: 'coffee',
    price: 3.99,
  },
  {
    id: 'price_1M0X0fDYfpInpYc8q75n4j6E',
    title: 'Sunglasses',
    price: 6.99,
  },
  {
    id: 'price_1M0X1KDYfpInpYc82aZoFh5O',
    title: 'Camera',
    price: 38.99,
  },
]

const getProductData = (id) => {
  const product = productsArray.find((product) => product.id === id)
  if (!product) {
    console.log('Product not found' + id)
    return undefined
  }
  return product
}

export { productsArray, getProductData }
