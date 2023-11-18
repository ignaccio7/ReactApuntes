import { useState } from "react"

export function Movies({ movies }) {

    if (movies.length === 0) return ("No se encontraron peliculas ...")
    
    return (
        movies.map(movie => {
            return (
                <div className="movie"
                    key={movie.id}
                >
                    <div className="description">
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                    </div>
                    <div className="frame">
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                </div>
            )
        })
    )
}