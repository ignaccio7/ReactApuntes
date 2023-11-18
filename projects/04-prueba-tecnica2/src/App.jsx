
import './App.css'
import { Otro } from './components/Otro'

import { useCatFact } from './hooks/useCatFact'

// ahora como creamos customHooks para poder reutilizar logica en una funcion
// pero es diferente ya que aqui podremos usar los hooks de react como useState,useEffect etc ya que estas siempre se deben declarar en el cuerpo principal de la funcion
// se puede decir que un customHook es reutilizar logica de nuestros componentes en diferentes componentes
// se debe declarar con use<HookCreado>
// function useCatImage({ fact }) {
//   const [urlImage, setUrlImage] = useState('')  
//   useEffect(() => {
//     if (!fact) return

//     const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
//     fetch(`${BASE_URL_IMAGE}/${threeFirstWords}`)
//       .then(response => {
//         setUrlImage(threeFirstWords)
//       })
//   }, [fact])

//   return { urlImage }
// } // devuelve el imageUrl: 'https://...'
import { useCatImage } from './hooks/useCatImage'

// no colocar useCatFetch o useFetchCatFact xq los custom hooks no pueden ir atados a la implementacion(lo que hace por dentro el custom hook)
// es como si fuera una caja negra lo que hace dentro
// const useCatFact = () => {
//   const [fact, setFact] = useState('')

//   const refreshFact = ()=>{
//     getRandomFact().then(newFact => setFact(newFact))
//   }

//   useEffect(refreshFact, [])
//   return { fact, refreshFact }
// }

function App() {
  // const [fact, setFact] = useState('')
  const {fact,refreshFact} = useCatFact()
  // const [urlImage, setUrlImage] = useState('')
  // recordar que nigun hook puede estar dentro de un if o while siempre debe estar declarado dentro del cuerpo del componente
  // con el customHook
  const { urlImage } = useCatImage({ fact })
  console.log(urlImage);
  // useEffect(() => {
  //   //getRandomFact(setFact)
  //   // console.log("a");
  //   // getRandomFact().then(fact=>console.log(fact))
  //   // console.log("b");
  //   getRandomFact().then(newFact => setFact(newFact))
  // }, [])

  // este procedimiento lo volveremos en un custom hook
  // gemeralmente hay que preguntarse si un useEffect lo podemos usar como un customHook
  // useEffect(() => {
  //   if (!fact) return

  //   const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
  //   fetch(`${BASE_URL_IMAGE}/${threeFirstWords}`)
  //     .then(response => {
  //       setUrlImage(threeFirstWords)
  //     })
  // }, [fact])

  const handleClick = () => {
    //getRandomFact(setFact)
    // getRandomFact().then(newFact => setFact(newFact))
    refreshFact()
  }

  return (
    <main>
      <h1>App de Gatitos</h1>
      <button
        style={{ borderColor: 'black' }}
        onClick={handleClick}
      >
        Get new Fact</button>
      {fact !== '' &&
        <p>{fact}</p>
      }
      {
        urlImage !== '' &&
        <img src={urlImage} alt={`Image extracted to ${fact}`}
          style={{ maxWidth: '100%' }} />
      }
      {/* <Otro/>
      <Otro/>
      <Otro/> */}
      
    </main>
  )
}

export default App
