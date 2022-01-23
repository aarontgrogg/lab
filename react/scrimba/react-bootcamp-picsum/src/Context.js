import React, {useState, useEffect} from 'react'

const Context = React.createContext()

function ContextProvider({ children }) {
    // setup state
    const [photos, setPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    // set API url
    const url = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'
    /*
        [
            {
                "url": "https://github.com/bobziroll/scrimba-react-bootcamp-images/blob/master/pic1.jpg?raw=true",
                "id": "1",
                "isFavorite": false
            }, ...
        ]
    */

    // setup the API fetch
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPhotos(data)
            })
    }, [])

    // toggle favorite icon, updating state
    function toggleFavorite(id) {
        setPhotos(prev => {
            return prev.map(item => { 
                if (item.id === id) {
                    item.isFavorite = !item.isFavorite
                }
                return item
            })
        })
    }

    // toggle cart status, updating state
    function toggleCart(image) {
        // check if already in cart
        const inCart = cartItems.some(item => item.id === image.id)
        if (!inCart) {
            // if not, add it
            setCartItems(prev => [...prev, image])
        } else {
            // if so, remove it
            setCartItems(prev => prev.filter(item => item.id !== image.id))
        }
    }

    function clearCart() {
        setCartItems([])
    }

    //console.log(cartItems)

    // return context via a provider
    return (
        <Context.Provider value={{
            photos,
            toggleFavorite,
            cartItems,
            toggleCart,
            clearCart
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}