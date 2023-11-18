
export function ListOfMovies({ movies }) {
    return (
        <section className="movies">
            {movies.map(movie => {
                return (
                    <div
                        className='movie'
                        key={movie.id}
                    >
                        <h3>{movie.title}</h3>
                        <span>{movie.year}</span>
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                )
            })}
        </section>
    )
}

export function NoMoviesResult() {
    return (
        <p>No se encontraron peliculas</p>
    )
}

export function Movies({ movies }) {
    // solo verificara la longitud si movies es diferente de null o undefined
    const hasMovies = movies?.length > 0
    
    return (
        hasMovies
          ? <ListOfMovies movies={movies}/>
          : <NoMoviesResult/>
    )

}