import { useEffect, useState } from "react"

const BASE_URL_FACT = 'https://catfact.ninja/fact',
    BASE_URL_IMAGE = 'https://cataas.com/cat/says'

export function Card() {

    const [fact, setFact] = useState('')
    const [urlImage, setUrlImage] = useState('')

    //nose puede usar: useEffect(async()=>{  ya que el useEffect tiene que ser una funcion sincrona
    useEffect(() => {
        async function getRandomFact() {
            const response = await fetch(BASE_URL_FACT)
            const data = await response.json()
            const { fact } = data
            setFact(fact)

            const text = fact.split(' ',3)

            const image = await fetch(`${BASE_URL_IMAGE}/${text}`)            
            setUrlImage(text)
        }

        getRandomFact()

    }, [])

    return (
        <section>
            <p>{fact}</p>
            {urlImage !== '' &&
                <div className="frame">
                    <img src={`${BASE_URL_IMAGE}/${urlImage}`} alt={`Image extracted for ${fact}`} />
                </div>
            }
        </section>
    )
}

