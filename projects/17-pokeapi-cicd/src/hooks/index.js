import { useEffect, useRef, useState } from 'react'
import Pokemon from '../services/Pokemon.js'

export function usePokemons () {
  const [loading, setLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const isFirstLoad = useRef(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const data = await Pokemon.getAllPokemons()
        setPokemons(data)
        isFirstLoad.current = false
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getData()
  }, [])

  return { pokemons, loading, isFirstLoad }
}
