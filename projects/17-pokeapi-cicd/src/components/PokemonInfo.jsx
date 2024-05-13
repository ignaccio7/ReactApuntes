import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Pokemon from '../services/Pokemon'
import { LIMIT_POKEMONS } from '../constants'

export default function PokemonInfo () {
  const { name } = useParams()
  const [pokemon, setPokemon] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    async function getData () {
      const pokemon = await Pokemon.getInfoPokemon({ name })
      setPokemon(pokemon)
    }
    getData()
  }, [name])

  async function getNextPokemon () {
    const newPokemon = await Pokemon.getNextPokemon({ id: pokemon.id })
    setPokemon(newPokemon)
    navigate(`/${newPokemon.name}`, { replace: true })
  }

  async function getPreviousPokemon () {
    const newPokemon = await Pokemon.getPreviousPokemon({ id: pokemon.id })
    setPokemon(newPokemon)
    navigate(`/${newPokemon.name}`, { replace: true })
  }

  return (
    <>
      {
        pokemon && (
          <div className='info'>
            <h2> {pokemon.id} - {pokemon.name}</h2>
            <img src={pokemon.image} alt="Imagen del pokemon" />
            <p>{pokemon.description}</p>
            <div className="buttons">
              {
                pokemon.id !== 1 && (<button onClick={getPreviousPokemon}> ⏮ </button>)
              }
              {
                pokemon.id < LIMIT_POKEMONS && (<button onClick={getNextPokemon}> ⏩ </button>)
              }
              <button style={{ display: 'block', marginInline: 'auto' }} onClick={() => {
                navigate('/')
              }}>Volver 🏠</button>
            </div>
          </div>
        )
      }
    </>
  )
}
