import React, {useState, useContext} from "react"

import { Context } from '../Context'
import CartItem from '../components/CartItem'

function Cart() {

    const [buttonText, setButtontext] = useState('Place Order')
    const { cartItems, clearCart } = useContext(Context)

    const totalCost = cartItems.length * 5.99
    const displayCost = totalCost.toLocaleString("en-US", { style: "currency", currency: "USD" })

    const cartContent = cartItems.map(item => (
        <CartItem key={item.id} item={item} />
    ))

    function handleClick() {
        setButtontext('Processing...')
        setTimeout(() => {
            setButtontext('Order Placed!')
        }, 3000)
        setTimeout(() => {
            clearCart()
            setButtontext('Place Order')
        }, 6000)
    }

    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartContent}
            <p className="total-cost">Total: {displayCost}</p>
            {
                cartItems.length > 0 ?
                    <div className="order-button">
                        <button onClick={handleClick}>{buttonText}</button>
                    </div> :
                    <p>You have no items in your cart.</p>
            }
        </main>
    )
}

export default Cart