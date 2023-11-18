
const API_URL = `https://www.omdbapi.com/?apikey=4287ad07&s=`

const searchMovies = async ({ search }) => {

    if (search === '') return null

    try {
        const response = await fetch(API_URL + search)
        const movies = await response.json()
        return movies?.Search.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster

        }));
    } catch (error) {
        throw new Error('Error al buscar las movies')
    }
}

export { searchMovies }