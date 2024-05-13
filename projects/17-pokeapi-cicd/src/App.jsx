import './App.css'
import PokemonGrid from './components/PokemonGrid'
import PokemonInfo from './components/PokemonInfo'

import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <>
      <h1>PokeAPI - CI - CD</h1>
      <Routes>
        <Route path='/' element={<PokemonGrid />} />
        <Route path=':name' element={<PokemonInfo />} />
        <Route path='*' element={<h1>Not found 404</h1>}/>
      </Routes>
    </>
  )
}

export default App
