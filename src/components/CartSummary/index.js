import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {MdClose} from 'react-icons/md'
import {
  FaCreditCard, // Card
  FaUniversity, // Net Banking
  FaMobileAlt, // UPI
  FaWallet, // Wallet
  FaMoneyBillWave, // Cash on Delivery
} from 'react-icons/fa'

import CartContext from '../../context/CartContext'
import './index.css'

const paymentOptions = [
  {id: 1, label: 'Card', icon: FaCreditCard, disable: true},
  {id: 2, label: 'Net Banking', icon: FaUniversity, disable: true},
  {id: 3, label: 'UPI', icon: FaMobileAlt, disable: true},
  {id: 4, label: 'Wallet', icon: FaWallet, disable: true},
  {id: 5, label: 'Cash on Delivery', icon: FaMoneyBillWave, disable: false},
]

class CartSummary extends Component {
  state = {selectedOptionId: null, orderConfirmed: false}

  componentWillUnmount() {
    clearTimeout(this.timerId)
  }

  onOptionSelection = id => this.setState({selectedOptionId: id})

  onOrderConfirmed = close => {
    this.setState({orderConfirmed: true})

    this.timerId = setTimeout(() => {
      const {removeAllCartItems} = this.context

      removeAllCartItems()

      close()

      const {history} = this.props
      history.replace('/products')
    }, 2000)
  }

  renderPaymentOptions = () => {
    const {selectedOptionId} = this.state

    return (
      <ul className="payment-options">
        {paymentOptions.map(option => {
          const Icon = option.icon
          return (
            <li key={option.id}>
              <label
                className={`option-label ${
                  selectedOptionId === option.id ? 'active-option' : ''
                } ${option.disable ? 'disabled-option' : ''}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  disabled={option.disable}
                  checked={selectedOptionId === option.id}
                  onChange={() => this.onOptionSelection(option.id)}
                />
                <span className="payment-name">{option.label}</span>
                <Icon size={28} />
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {cartList} = this.props
    const {selectedOptionId, orderConfirmed} = this.state

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
        <Popup
          trigger={
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          }
          modal
          onOpen={() => this.setState({selectedOptionId: null})}
          closeOnDocumentClick
        >
          {close => (
            <div>
              <button type="button" className="close-btn" onClick={close}>
                <MdClose size={24} />
              </button>
              {orderConfirmed ? (
                <div className="success-container">
                  <h2>Your order has been placed successfully</h2>
                  <p>Redirecting...</p>
                </div>
              ) : (
                <>
                  <h2>Select Payment Method</h2>
                  {this.renderPaymentOptions()}
                  <button
                    type="button"
                    className="confirm-btn"
                    onClick={() => this.onOrderConfirmed(close)}
                    disabled={selectedOptionId === null}
                  >
                    Confirm Order
                  </button>
                </>
              )}
            </div>
          )}
        </Popup>
      </div>
    )
  }
}

CartSummary.contextType = CartContext

export default withRouter(CartSummary)
