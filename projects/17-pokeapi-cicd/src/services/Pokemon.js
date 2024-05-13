import { BASE_URL, BASE_URL_DESCRIPTION, BASE_URL_IMAGE, LIMIT_POKEMONS } from '../constants'

export default class Pokemon {
  // haciendo 2 peticiones a diferentes apis
  static async getAllPokemons () {
    try {
      const responseFirstApi = await fetch(`${BASE_URL}pokemon?limit=${LIMIT_POKEMONS}&offset=0`)
      const dataFirstApi = await responseFirstApi.json()

      const pokemons = await Promise.all(dataFirstApi.results.map(async (pok) => {
        const urlImage = pok.url.replace('pokemon', 'pokemon-form')
        const responseSecondApi = await fetch(urlImage)
        const dataSecondApi = await responseSecondApi.json()

        const urlDescription = pok.url.replace('pokemon', 'pokemon-species')
        const responseThirdApi = await fetch(urlDescription)
        const dataThirdApi = await responseThirdApi.json()
        const vecText = dataThirdApi.flavor_text_entries
        const text = vecText.find(v => {
          return v.language.name === 'es'
        })

        return {
          name: pok.name,
          url: dataSecondApi.sprites.front_default,
          description: text.flavor_text
        }
      }))

      return pokemons
    } catch (error) {
      console.log('errores')
      console.log(error)
      return []
    }
  }

  /* static async getAllPokemons () {
    try {
      const responseFirstApi = await fetch(`${BASE_URL}pokemon?limit=${LIMIT_POKEMONS}&offset=0`)
      const dataFirstApi = await responseFirstApi.json()

      const pokemons = await Promise.all(dataFirstApi.results.map(async (pok) => {
        const responseSecondApi = await this.getImagePokemon()
        const dataSecondApi = await responseSecondApi.json()
        return {
          name: pok.name,
          url: dataSecondApi.sprites.front_default
        }
      }))

      return pokemons
    } catch (error) {
      console.log('errores')
      console.log(error)
      return []
    }
  }
  */

  static async getInfoPokemon ({ name }) {
    try {
      const response = await fetch(`${BASE_URL}pokemon/${name}`)
      const data = await response.json()
      const { id, forms } = data
      const image = await this.getImagePokemon({ id })
      const description = await this.getDescriptionPokemon({ id })
      return {
        id,
        name: forms[0].name,
        image,
        description
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async getDescriptionPokemon ({ id }) {
    try {
      const response = await fetch(`${BASE_URL_DESCRIPTION}${id}`)
      const data = await response.json()
      const vecText = data.flavor_text_entries
      const text = vecText.find(v => {
        return v.language.name === 'es'
      })
      return text.flavor_text
    } catch (error) {
      console.log('error image')
      console.log(error)
      return ''
    }
  }

  static async getImagePokemon ({ id }) {
    try {
      const response = await fetch(`${BASE_URL_IMAGE}${id}`)
      const data = await response.json()
      return data.sprites.front_default
    } catch (error) {
      console.log('error image')
      console.log(error)
      return ''
    }
  }

  static async getNextPokemon ({ id }) {
    try {
      if (id >= LIMIT_POKEMONS) throw new Error('Ya no hay mas pokemones')
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${id}`)
      const data = await response.json()
      const pokemon = await this.getInfoPokemon({ name: data.results[0].name })
      return pokemon
    } catch (error) {
      console.log(error)
    }
  }

  static async getPreviousPokemon ({ id }) {
    try {
      const newId = id - 2
      if (newId < 0) throw new Error('Ya no hay mas pokemones')
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${newId}`)
      const data = await response.json()
      const pokemon = await this.getInfoPokemon({ name: data.results[0].name })
      return pokemon
    } catch (error) {
      console.log(error)
    }
  }
}
