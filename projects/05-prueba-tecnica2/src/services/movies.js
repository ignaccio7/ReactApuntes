
const API_URL = 'https://www.omdbapi.com/?apikey=4287ad07&';

const searchMovies = async ({ search }) => {

    if(search==='') return []

    try {
        const response = await fetch(`${API_URL}s=${search}`)
        const movies = await response.json()
        if (!movies.Search) {
            return []
        }else{
            return movies?.Search.map(movie=>({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                poster: movie.Poster
            }))
        }
    } catch {        
        console.warn('Error nose pudo encontrar las peliculas')
        return []
    }
}

export {
    searchMovies
}