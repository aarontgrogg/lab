import { useState, useEffect, useRef } from 'react'

function useHover(init = false) {
    const [hovered, setHovered] = useState(init)
    const ref = useRef(null)

    function toggleHover() {
        setHovered(prev => !prev)
    }

    useEffect(() => {
        const current = ref.current
        
        current.addEventListener('mouseenter', toggleHover)
        current.addEventListener('mouseleave', toggleHover)

        return () => {
            current.removeEventListener('mouseenter', toggleHover)
            current.removeEventListener('mouseleave', toggleHover)
        }
    }, [])

    return [hovered, ref]
}

export default useHover