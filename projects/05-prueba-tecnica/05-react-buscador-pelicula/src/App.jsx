
// import { useEffect, useRef, useState } from 'react'
// import './App.css'
// import { Movies } from './components/Movies'

// import { useMovies } from './hooks/useMovies'

// const API_URL = `https://www.omdbapi.com/?apikey=4287ad07&s=avengers`

// function App() {

//   const { movies } = useMovies()
//   // otra manera de hacerlo de manera controlada entonces seria con los states
//   const [search, setSearch] = useState('')

//   // const counter = useRef(0)

//   // counter.current++ // persiste el valor
//   // console.log(counter.current)   

//   // console.log('render');
//   const [error, setError] = useState()
//   // de esta manera es un poco malo porque constantemente se esta renderizando cada vez el componente
//   // pero si que nos sirve para controlar temas de validaciones mas facil 
//   // de manera no controlada se podria pero si que tenemos que escribir mas codigo
//   //una forma de validar seria con el effect
//   const handleChange = (event) => {
//     const newSearch = event.target.value
//     if (newSearch.startsWith(' ')) return
//     setSearch(newSearch)
//     // console.log(newSearch);
//     // o validar aqui
//     /*
//     if (newSearch==='') {
//       setError('Nose puede buscar une pelicula vacia')
//       return
//     }
//     if (newSearch.match(/^\d+$/)) {
//       setError('Nose puede buscar una pelicula con un numero')
//     }
//     if (newSearch.length<3) {
//       setError('La busqueda debe tener al menos 3 caracteres')
//     }

//     setError(null)
//     */
//   }
  

//   const firstRender = useRef(true)
//   useEffect(() => {
//     if (firstRender.current) {
//       firstRender.current = search === ''
//       return
//     }

//     if (search === '') {
//       setError('Nose puede buscar une pelicula vacia')
//       return
//     }
//     if (search.match(/^\d+$/)) {
//       setError('Nose puede buscar una pelicula con un numero')
//       return
//     }
//     if (search.length < 3) {
//       setError('La busqueda debe tener al menos 3 caracteres')
//       return
//     }
//     setError(null)

//   }, [search])

//   return (
//     <div className='page'>
//       <header>
//         <h1>Buscador de Películas</h1>
//         <form>
//           {/* <label htmlFor="search">Put the movie name to search</label> */}
//           <label htmlFor="search">Coloca el nombre de la película</label>
//           <input 
//             type="text" className='search' name="search" id="search" placeholder='Avengers, Star Wars, Matrix ....'
//             onChange={handleChange} value={search} 
//             style={{ 
//               width: '80%',
//               border: '1px solid transparent',
//               borderColor: error ? 'red' : 'transparent'
//             }} />
//           {error &&
//             <p style={{ color: 'red' }}>{error}</p>
//           }
//           <button type='submit'>Buscar</button>
//         </form>
//       </header>
//       <main>
//         <h2>Listado de peliculas</h2>
//         <Movies movies={movies} />
//       </main>
//     </div>
//   )
// }

// export default App

// --> AÑADIENDO UN CUSTOM HOOK AL SEARCH

import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'

import { useMovies } from './hooks/useMovies'

//PARA EL DEBOUNCE
import debounce from "just-debounce-it"

// const API_URL = `https://www.omdbapi.com/?apikey=4287ad07&s=avengers`

function useSearch(){
  const [search, setSearch] = useState('')


  const [error, setError] = useState()
  
  // const handleChange = (event) => {
  //   const newSearch = event.target.value
  //   if (newSearch.startsWith(' ')) return
  //   setSearch(newSearch)
  // }
  
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = search === ''
      return
    }

    if (search === '') {
      setError('Nose puede buscar une pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('Nose puede buscar una pelicula con un numero')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)

  }, [search])

  return { search, setSearch , error }
  // nos ayuda a separar logica de nuestro componente principal y asi tenerlo mas limpio
}

function App() {
  // --> PARA APRENDER COMO FUNCIONA EL USEMEMO
  const [ sort, setSort ] = useState(false)
  const handleSort=()=>{
    setSort(!sort)
  }

  // otra manera de hacerlo de manera controlada entonces seria con los states
  // const [search, setSearch] = useState('')
  const {search, setSearch ,error} = useSearch()
  
  // const { movies } = useMovies()
  // const { movies, getMovies } = useMovies({search})
  const { movies, getMovies, loading, error:errorMovies } = useMovies({search,sort})


  // const counter = useRef(0)

  // counter.current++ // persiste el valor
  // console.log(counter.current)   

  // console.log('render');  

  const handleSubmit = (event)=>{
    event.preventDefault()
    // getMovies()
    getMovies({search})
  }

  useEffect(()=>{
    console.log('renderGetMovies');
  },[getMovies])

  // const handleChange = (event) => {
  //   const newSearch = event.target.value
  //   if (newSearch.startsWith(' ')) return
  //   setSearch(newSearch)
  //   getMovies({ search:newSearch })
  // }
  // --> con el debounce

  const debounceGetMovies = useCallback(debounce((search)=>{
    console.log('search',search);
    getMovies({search})
  },500),[getMovies])
  
  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debounceGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="search">Put the movie name to search</label> */}
          <label htmlFor="search">Coloca el nombre de la película</label>
          <input 
            type="text" className='search' name="search" id="search" placeholder='Avengers, Star Wars, Matrix ....'
            onChange={handleChange} value={search} 
            style={{ 
              width: '80%',
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }} />
          {error &&
            <p style={{ color: 'red' }}>{error}</p>
          }          
          <button type='submit'>Buscar</button>
          <br />
          Ordenar: <input type="checkbox" checked={sort}  onChange={handleSort} />
        </form>
      </header>
      <main>
        <h2>Listado de peliculas</h2>
        {loading ? <p>Cargando...</p> : <Movies movies={movies} />}
      </main>
    </div>
  )
}

export default App


