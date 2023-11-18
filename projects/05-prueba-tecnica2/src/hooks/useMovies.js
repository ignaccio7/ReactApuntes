import { useCallback, useMemo, useRef, useState } from "react"
import { searchMovies } from '../services/movies';

export function useMovies({ search, sortedMovies }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)

    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return

        try {
            setLoading(true)
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
            previousSearch.current = search
        } catch (error) {
            throw new Error('Error al obtener las peliculas')
        } finally {
            setLoading(false)
        }
    },[]) 

    const renderMovies = useMemo(() => {
        return sortedMovies
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sortedMovies, movies])

    return { movies: renderMovies, getMovies, loading }
}