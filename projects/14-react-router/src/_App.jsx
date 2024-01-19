import './App.css'
import { Route, Routes, Link, useParams, Outlet } from 'react-router-dom'
import { NavLink } from './NavLink'

const Home = () => <h2>Home</h2>

const SearchPage = () => {
  const tacos = [
    'cochinita',
    'chili',
    'carnita',
    'quesadilla'
  ]
  return (
    <>
      <h2>Search Page</h2>
      <ul>
        {tacos.map(taco => {
          return (
            <li key={taco}><Link to={`/tacos/${taco}`}> {taco} </Link></li>
          )
        })}
      </ul>
    </>
  )
}

const Tacos = () => {
  const { name } = useParams()
  return(
    <>
      <h2>Taco {name} </h2>
      {/* cuando colocamos de esta manera el to es una ruta relativa y se forma de la manera /tacos/name/details */}
      <Link to='details'>Ir a detalles</Link>
      {/* El outlet es una etiqueta donde nosotros indicamos donde queremos renderizar este componente o ruta anidado que nosotros tenemos */}
      <Outlet />
    </>
  )
}

const TacoDetails = () => {
  return (
    <>
      <h3>Detalles del taco</h3>
    </>
  )
}

const TacoIndex = () => {
  return (
    <h3>Componente que solo aparece en el indice de la pagina</h3>
  )
}

function App() {

  return (
    <>
      <header>
        <h1>ReacRouter</h1>
        <nav>
          <ul>
            <li><NavLink 
             className={({ isActive })=>{
              return isActive ? 'is-active' : ''
             }}
             to="/">Home</NavLink></li>
            <li><NavLink to="/search">Search Page</NavLink></li>
          </ul>
        </nav>
      </header>
      <Routes>
        {/* se le debe pasar el elemento y no asi el componente el componente en este caso seria Home y elemento <Home/> */}
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/tacos/:name' element={<Tacos />}>          
          <Route index element={<TacoIndex/>} /> {/* en este caso solo cuando estemos por ejemplo /tacos/nombredeuntaco */}
          <Route path='details' element={<TacoDetails/>}/>        
        </Route>
        <Route path='*' element={<h1>Not found 404</h1>}/>
      </Routes>
    </>
  )
}

export default App
