import { usePokemons } from '../hooks'
import PokemonCard from './PokemonCard'

export default function PokemonGrid () {
  const { pokemons, loading, isFirstLoad } = usePokemons()

  return (
    <div className='container'>
    {
      loading
        ? ('Cargando')
        : !isFirstLoad && pokemons.length === 0
            ? (<p>{'No existen pokemons de ese tipos'}</p>)
            : (
                pokemons.map((pok) => {
                  return (
                    <PokemonCard key={pok.url} name={pok.name} image={pok.url} />
                  )
                })
              )}
  </div>
  )
}
