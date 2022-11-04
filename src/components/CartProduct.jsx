import Button from 'react-bootstrap/button'
import { getProductData } from '../productsStore'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext-back'

const CartProduct = ({ product }) => {
  const productData = getProductData(product.id)
  const cart = useContext(CartContext)
  return (
    <div>
      <h3>{productData.title}</h3>
      <p>{product.quantity} total</p>
      <p>${(product.quantity * productData.price).toFixed(2)}</p>
      <Button size='sm' onClick={() => cart.deleteItemFromCart(product.id)}>
        Remove
      </Button>
      <hr />
    </div>
  )
}
export default CartProduct
