
import { BASE_URL_FACT } from "./constants"

export async function getRandomFact() {
    // return fetch(BASE_URL_FACT)
    //   .then(response => response.json())
    //   .then(data => {
    //     const { fact } = data
    //     //esta mal pasar asignaciones del State a funciones externas
    //     //setFact(fact)
    //     return fact
    //   })
    // aqui X nose puede llamar al useState o cualquier hook
    const response = await fetch(BASE_URL_FACT)
    const data = await response.json()
    const { fact } = data
    return fact

}
