import './index.css'

const CartSummary = props => {
  const {cartList} = props
  const orderTotal = cartList.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  )

  return (
    <div className="summary-container">
      <h1 className="total-content">
        Order Total: <span className="order-total">Rs {orderTotal}/-</span>
      </h1>
      <p className="cart-count">{cartList.length} items in cart</p>
      <button type="button" className="checkout-btn">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
