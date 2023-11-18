
import { useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'

import { useMovies } from './hooks/useMovies'

const API_URL = `https://www.omdbapi.com/?apikey=4287ad07&s=avengers`


function App() {  
  
  const { movies } = useMovies()
  // controlado porque react controla mediante sus hooks 
  const inputRef = useRef() // <-- HAY MUCHA GENTE QUE ABUSA DE ESTO PORQUE PODRIAMOS TENER 10 INPUTS Y TENDRIAMOS 10 REFERENCIAS --> PARA ESO USAREMOS LO NO CONTROLADO

  const handleSubmit = (event)=>{
    event.preventDefault()
    const inputElement = inputRef.current
    const value = inputElement.value
    console.log(value);
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="search">Put the movie name to search</label> */}
          <label htmlFor="search">Coloca el nombre de la película</label>
          <input ref={inputRef} type="text" className='search' name="search" id="search" placeholder='Avengers, Star Wars, Matrix ....' style={{ width: '80%' }} />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <h2>Listado de peliculas</h2>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App
