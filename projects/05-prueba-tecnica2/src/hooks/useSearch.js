import { useRef, useState, useEffect } from "react"


export function useSearch() {
    const [search, setSearch] = useState('')

    const [errorSearch, setErrorSearch] = useState()
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = search === ''
            return
        }

        if (search === '') {
            setErrorSearch('Nose puede buscar una pelicula vacia')
            return
        }

        if (search.match(/^\d/)) {
            setErrorSearch("Nose puede buscar una pelicula que inicie con un numero")
            return
        }

        if (search.length < 3) {
            setErrorSearch('Nose puede buscar una pelicula con menos de 3 caracteres')
            return
        }

        setErrorSearch(null)
        return

    }, [search])

    return { search, setSearch, errorSearch }
}