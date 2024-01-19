import './App.css'
import { Route, Routes, Link, useParams, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { NavLink } from './NavLink'
import { useAuth } from './useAuth'

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

const Login = () => {
    /*const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = ()=>{
        login()
        navigate('/search')
    }

    return(
        <>
            <h2>Login</h2>
            <button onClick={handleLogin}>Logearse</button>
        </>
    )*/
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    // aqui ya tendriamos la ruta que el usuario intento ir anteriormente si esque lo hizo
    console.log(location.state); 

    const handleLogin = ()=>{
        login()
        const nextPath = location.state ? location.state.location.pathname : '/search'
        navigate(nextPath)
    }

    return(
        <>
            <h2>Login</h2>
            <button onClick={handleLogin}>Logearse</button>
        </>
    )
}
//para proteger una ruta
const ProtectedRoute = ({ children }) => {
  /*const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  return children*/
  // si quisieramos lograr que nos rediriga a la pagina que hubieramos intentado ir anteriormente que nos pedia hacer login
  const { isAuthenticated } = useAuth()
  const location = useLocation() // tiene informacion de donde esta el usuario en ese momento
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ location }} />
  }
  return children

}

function App() {

  return (
    <>
      <header>
        <h1>ReacRouter</h1>
        <nav>
          <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to="/search">Search Page</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </ul>
        </nav>
      </header>
      <Routes>
        {/* se le debe pasar el elemento y no asi el componente el componente en este caso seria Home y elemento <Home/> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={
            <ProtectedRoute>
                <SearchPage />
            </ProtectedRoute>
        } />
        <Route path='/tacos/:name' element={
            <ProtectedRoute>
                <Tacos />
            </ProtectedRoute>
        }>          
          <Route index element={<TacoIndex/>} /> {/* en este caso solo cuando estemos por ejemplo /tacos/nombredeuntaco */}
          <Route path='details' element={<TacoDetails/>}/>        
        </Route>
        <Route path='*' element={<h1>Not found 404</h1>}/>
      </Routes>
    </>
  )
}

export default App
