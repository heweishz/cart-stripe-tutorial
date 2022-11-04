import { createContext, useState } from 'react'
import { getProductData } from '../productsStore'

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteItemFromCart: () => {},
  getTotalCost: () => {},
})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])
  //{id:x,quantity:y}
  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteItemFromCart,
    getTotalCost,
  }

  function getProductQuantity(id) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity

    if (quantity === undefined) return 0
    return quantity
  }
  function addOneToCart(id) {
    const quantity = getProductQuantity(id)
    if (quantity === 0) {
      setCartProducts([...cartProducts, { id, quantity: 1 }])
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      )
    }
  }
  function removeOneFromCart(id) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity
    if (quantity === undefined) {
      throw new Error('there is no such product')
    }
    if (quantity === 1) {
      deleteItemFromCart(id)
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id ? { ...product, quantity: quantity - 1 } : product
        )
      )
    }
  }
  function deleteItemFromCart(id) {
    setCartProducts(cartProducts.filter((product) => product.id !== id))
  }
  function getTotalCost() {
    let total = 0
    cartProducts.forEach((product) => {
      const productData = getProductData(product.id)
      total += product.quantity * productData.price
    })
    return total
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}
export default CartProvider
