import { useEffect, useState } from "react"

import { Card } from "./components/Card"

import './App.css'

const BASE_URL_FACT = 'https://catfact.ninja/fact'
const BASE_URL_IMAGE = 'https://cataas.com/cat/says'


export function App() {

    const [fact, setFact] = useState('')
    const [urlImage, setUrlImage] = useState('')

    // useEffect(() => {
    //     fetch(BASE_URL_FACT)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             const { fact } = data
    //             setFact(fact)

    //             // let factSearch = fact.split(' ').slice(0,3).join(' ')
    //             let factSearch = fact.split(' ', 3).join(' ')                
    //             fetch(`${BASE_URL_IMAGE}/${factSearch}`)
    //                 .then(response=>{
    //                     // console.log(response);
    //                     const { url } = response
    //                     setUrlImage(url)
    //                 })

    //         })
    // }, [])

    useEffect(() => {
        fetch(BASE_URL_FACT)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })
    }, [])

    useEffect(() => {
        if (fact === '') return
        let factSearch = fact.split(' ', 3).join(' ')
        fetch(`${BASE_URL_IMAGE}/${factSearch}`)
            .then(response => {
                const { url } = response
                setUrlImage(url)
            })
    }, [fact])

    return (
        <main>
            <h1>App de gatitos con Fetch</h1>
            <section>
                {
                    fact !== null && (
                        <p>{fact}</p>
                    )
                }
                {urlImage !== '' && (
                    <div className="frame">
                        <img src={urlImage} alt={`Image extracted using three words for ${fact}`} />
                    </div>
                )}
            </section>
            <h1>App de gatitos con Fetch - Async Await</h1>
            <Card></Card>
        </main>


    )
}