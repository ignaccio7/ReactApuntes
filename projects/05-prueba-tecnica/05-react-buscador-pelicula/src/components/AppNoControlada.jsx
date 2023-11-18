
import { useRef } from 'react'
import './App.css'
import { Movies } from './components/Movies'

import { useMovies } from './hooks/useMovies'

const API_URL = `https://www.omdbapi.com/?apikey=4287ad07&s=avengers`


function App() {  
  
  const { movies } = useMovies()
  // esta seria la forma no controlada porque estamos utilizando el DOM y no tanto React por eso es no controlado
  // esta es la forma mas optima porque no usamos cosas de react
  const handleSubmit = (event)=>{
    event.preventDefault()
    
    //const fields = new FormData(event.target)
    // si tuvieramos mas inputs podriamos desestructurar convirtiendo a un object los fields
    // const fields = Object.fromEntries(new FormData(event.target))
    const {search} = Object.fromEntries(new FormData(event.target))

    //const search = fields.get('search')
    // console.log(fields);
    console.log(search);
    // console.log(event.target.search.value);

    // // aqui podriamos validar 
    // if(search===''){
    //   //hago algo
    // }
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="search">Put the movie name to search</label> */}
          <label htmlFor="search">Coloca el nombre de la película</label>
          <input type="text" className='search' name="search" id="search" placeholder='Avengers, Star Wars, Matrix ....' style={{ width: '80%' }} />
          {/* <input type="text" className='otro' name="otro" id="otro" placeholder='Otro ....' style={{ width: '80%' }} /> */}
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
