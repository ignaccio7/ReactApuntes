
// import withResulst from '../mocks/result.json'
// import withoutResult from '../mocks/no-result.json'
// import { useState } from 'react'

// export function useMovies({search}) {
//     const [ responseMovies, setResponseMovies ] = useState([])
//     const movies = withResulst.Search

//     const mappedMovies = movies?.map(movie => {
//         return {
//             id: movie.imdbID,
//             title: movie.Title,
//             year: movie.Year,
//             poster: movie.Poster
//         }
//     })

//     const getMovies = ()=>{
//         if (search) {
//             setResponseMovies(mappedMovies)
//         }else{
//             setResponseMovies(withoutResult)
//         }
//     }

//     // return { movies: mappedMovies }
//     return { movies: responseMovies, getMovies }

// }

// --> refactorizando

import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const previousSearch = useRef(search)

    // ----> usando el useMemo
    // const getMovies = async () => {

    //     if (search === previousSearch.current) return

    //     try {
    //         setLoading(true)
    //         previousSearch.current = search
    //         const newMovies = await searchMovies({ search })
    //         setMovies(newMovies)
    //         setError(null)
    //     } catch (error) {
    //         setError(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // const getMovies = useMemo(() => {
    //     return async () => {

    //         if (search === previousSearch.current) return

    //         try {
    //             setLoading(true)
    //             previousSearch.current = search
    //             const newMovies = await searchMovies({ search })
    //             setMovies(newMovies)
    //             setError(null)
    //         } catch (error) {
    //             setError(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    // }, [search])
    //haciendo esto se renderiza cada vez que cambia el search
    //PERO deberia renderizarse una vez y solo cambiar el valor del search asi se lo podemos mandar por parametro
    // const getMovies = useMemo(() => {
    //     return async ({search}) => {

    //         if (search === previousSearch.current) return

    //         try {
    //             setLoading(true)
    //             previousSearch.current = search
    //             const newMovies = await searchMovies({ search })
    //             setMovies(newMovies)
    //             setError(null)
    //         } catch (error) {
    //             setError(error)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }
    // }, []) // asi solo se renderiza la primera vez
    //PERO tenemos un hook especial que usa useMemo por debajo que es especial para funciones useCallback
    const getMovies = useCallback(async ({ search }) => {

        if (search === previousSearch.current) return

        try {
            setLoading(true)
            previousSearch.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
            setError(null)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])


    //USE MEMO-> memoriza un valor para no tener que volverlo a calcular dependiendo de unas dependencias
    // usememo nose deberia utilizar en todos los sitios xq 1ro hay que asegurarnos de ver un problema de dependencia y ahi recien aqui podriamos imaginar un array de 1000 elementos 
    //pára ordenar por titulo
    // const sortedMovies = sort
    //     ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
    //     : movies
    // console.log("render");
    // -> este es un calculo que queremos memorizar y que se haga cuando cambia cierta informacion
    // asi evitamos que en el render este calculo se vuelva a crear y lo hacemos que sea mas optimo
    const sortedMovies = useMemo(() => {
        // console.log("renderMemoSortedMovies");
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies
    }, [sort, movies])

    // return { movies: mappedMovies }
    // return { movies, getMovies, loading, error }
    return { movies: sortedMovies, getMovies, loading, error }

}
