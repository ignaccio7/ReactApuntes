
import { getRandomFact } from "../composables/randomFact"
import { useState, useEffect } from "react"

// no colocar useCatFetch o useFetchCatFact xq los custom hooks no pueden ir atados a la implementacion(lo que hace por dentro el custom hook)
// es como si fuera una caja negra lo que hace dentro
export function useCatFact() {
    const [fact, setFact] = useState('')

    const refreshFact = () => {
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(refreshFact, [])
    return { fact, refreshFact }
}