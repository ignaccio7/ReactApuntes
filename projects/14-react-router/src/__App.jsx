import './App.css'
import { useRoutes } from "react-router-dom"
import { NavLink } from "./NavLink"
const routes = [
  {
    path: '/',
    element: <h1>Home</h1>
  },
  {
    path: '/search',
    element: <h1>Search</h1>
  }
    
]

export default function App(){
  const element = useRoutes(routes)
  return (
    <main>
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
      {element}
    </main>
  )
}