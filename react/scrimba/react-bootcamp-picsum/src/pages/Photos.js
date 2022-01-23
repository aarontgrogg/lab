import React, {useContext} from "react"

import Image from '../components/Image'
import {Context} from '../Context'
import {getClass} from '../utils'

function Photos() {
    const { photos } = useContext(Context)
    const images = photos.map((image, i) => {
        return <Image
            key={image.id}
            image={image}
            className={getClass(i)}
        />
    })
    return (
        <main className="photos">
            {images}
        </main>
    )
}

export default Photos