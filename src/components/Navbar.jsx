import { useState, useContext } from 'react'
import { Button, Container, Navbar, Modal } from 'react-bootstrap'
import { CartContext } from '../context/CartContext-back'
import CartProduct from './CartProduct'

export default function NavbarComponent() {
  const [show, setShow] = useState(false)
  const handleOpen = () => setShow(true)
  const handleClose = () => setShow(false)
  const cart = useContext(CartContext)
  const totalQuantity = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  )
  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url)
        }
      })
  }

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={handleOpen}>Cart ({totalQuantity} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>this is the modal body</h1>
          {cart.items.map((item, idx) => {
            return <CartProduct product={item} key={idx} />
          })}
          <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
          <Button variant='success' onClick={checkout}>
            Purchase Items
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}
