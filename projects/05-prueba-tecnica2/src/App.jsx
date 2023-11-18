import './App.css'

import { Movies } from './components/Movies';
import { useSearch } from './hooks/useSearch.js';
import { useMovies } from './hooks/useMovies';
import { useCallback, useEffect, useState } from 'react';

import debounce from 'just-debounce-it'


function App() {

  const debounceGetMovies = useCallback(
    debounce(({ search }) => {
      getMovies({ search })
    }, 500),
    [])

  const { search, setSearch, errorSearch } = useSearch()
  const [sortedMovies, setSortedMovies] = useState(false)
  const { movies, getMovies, loading } = useMovies({ search, sortedMovies })

  const handleSearch = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debounceGetMovies({ search:newSearch })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    getMovies({ search })
  }


  const handleSort = () => {
    setSortedMovies(!sortedMovies)
  }

  useEffect(() => {
    console.log("getmoviesreceived");
  }, [getMovies])

  return (
    <main>
      <h1>Buscador de peliculas</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="search">Buscar Pelicula :</label>
        <input value={search} onChange={handleSearch} type="text" id='search' className='search' placeholder='Avengers, Matrix, Jurasic, ...' autoFocus />
        {errorSearch && <span style={{ color: 'red' }}>{errorSearch}</span>}
        <div><label htmlFor="sort">Ordenar</label> <input type="checkbox" name="sort" id="sort" onChange={handleSort} /> </div>
        <button type='submit'>Buscar pelicula</button>
      </form>
      <section className="movies">
        {loading ? <p>Cargando peliculas...</p>
          : <Movies movies={movies} />}
      </section>
    </main>
  )
}

export default App
