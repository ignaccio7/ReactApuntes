
import { useEffect, useState } from "react"
import { BASE_URL_IMAGE } from "../composables/constants"

export function useCatImage({ fact }) {
    const [urlImage, setUrlImage] = useState('')
    useEffect(() => {
        if (!fact) return

        const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
        fetch(`${BASE_URL_IMAGE}/${threeFirstWords}`)
            .then(response => {
                setUrlImage(threeFirstWords)
            })
    }, [fact])

    // return { urlImage: urlImage ? `${BASE_URL_IMAGE}/${urlImage}` : '' }
    return { urlImage: `${BASE_URL_IMAGE}/${urlImage}` }
    // return { urlImage, setUrlImage } tambien podrias devolver el setUrlImage pero siempre que puedas hay que evitarlo
} // devuelve el imageUrl: 'https://...'