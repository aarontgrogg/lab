import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { Context } from '../Context'
import useHover from '../hooks/useHover'

function Image({ image, className }) {
    //const [isHovering, setIsHovering] = useHover(false)
    const [isHovering, ref] = useHover(false)
    const { toggleFavorite, cartItems, toggleCart } = useContext(Context)

    function heartIcon() {
        const show = (isHovering || image.isFavorite)
        const className = (image.isFavorite ? 'ri-heart-fill' : 'ri-heart-line')
        return show &&
            <i
                className={`${className} favorite`}
                onClick={() => { toggleFavorite(image.id) }}
            ></i>
    }

    function cartIcon() {
        const inCart = cartItems.some(item => item.id === image.id)
        const show = (isHovering || inCart)
        const className = (inCart ? 'ri-shopping-cart-fill' : 'ri-add-circle-line')
        return show &&
            <i
                className={`${className} cart`}
                onClick={() => {toggleCart(image)}}
            ></i>
    }

    return (
        <div
            className={`image-container ${className}`}
            // onMouseEnter={() => setIsHovering(true)}
            // onMouseLeave={() => setIsHovering(false)}
            ref={ref}
        >
            {heartIcon()}
            {cartIcon()}
            <img
                className="image-grid"
                src={image.url}
                alt=""
            />
        </div>
    )
}

Image.propTypes = {
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    }),
    className: PropTypes.string
}

export default Image