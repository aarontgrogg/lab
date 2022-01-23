import React, { useContext } from "react"
import PropTypes from 'prop-types'

import { Context } from '../Context'
import useHover from '../hooks/useHover'


function CartItem({ item }) {
    //const [isHovering, setIsHovering] = useHover(false)
    const [isHovering, ref] = useHover(false)
    const { toggleCart } = useContext(Context)

    const iconClassName = isHovering ? 'ri-delete-bin-fill' : 'ri-delete-bin-line'

    return (
        <div className="cart-item">
            <i
                className={iconClassName}
                onClick={() => toggleCart(item)}
                // onMouseEnter={toggleHover}
                // onMouseLeave={toggleHover}
                ref={ref}
            ></i>
            <img src={item.url} width="130px" alt="" />
            <p>$5.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem