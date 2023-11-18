import { useEffect, useState } from 'react'
import './App.css'


function App() {
  
  const [enable, setEnable] = useState(false)

  const [position, setPosition] = useState({ clientX: 0, clientY: 0 })

  // useEffect(()=>{
  //   console.log("Use effect");
  // })
  // si lo dejamos asi automaticamente se cuando se renderize el componente entonces se ejecuta el useEffect
  // como 2do parametro el useEffect recibe las dependencias que tiene que observar
  // useEffect(()=>{
  //     console.log("Use effect");
  // },[])
  // si lo dejamos asi entonces no observara dependencias y se ejecutara solo 1 vez al renderizar el componente
  // nota los useEffects no reciben parametros
  useEffect(() => {
    console.log("Use effect");    

    const MouseEvent = (e) => {
      const { clientX, clientY } = e
      setPosition({clientX,clientY})
      console.log(clientX, clientY);
    }

    if (enable) {
      window.addEventListener('mousemove', MouseEvent)
    }

    //como buena practica siempre se debe limpiar los effectos esto lo hacemos con un return
    //esto porque podemos ver que sino lo hacemos entonces el evento sigue suscrito al mouse
    //cleanup: se ejecuta cuando
    //--> cuando el componente se DESMONTA
    //--> Cuando CAMBIAN las dependencias, antes de ejecutar
    return () => { //Cleanup method
      console.log("Cleanup");
      window.removeEventListener('mousemove', MouseEvent)
    }

  }, [enable])
  // asi observara cada vez que cambie el estado de enable y podriamos añadir mas estados al vector


  //podemos tener mas de 1 useEffect
  useEffect(()=>{
    document.body.classList.toggle('no-cursor',enable)

    // return ()=>{
    //   document.body.classList.remove('no-cursor')
    // } en este caso es indiferente limpiarlo

  },[enable])

  return (
    <>
      <h2>useEffect con puntero</h2>
      <div
        style={{
          position: 'absolute',
          backgroundColor: '#09f',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.clientX}px,${position.clientY}px)`
        }}
      ></div>
      <button
        onClick={() => { setEnable(!enable) }}
      >
        {enable === true ? `Desactivar` : 'Activar'} puntero
      </button>
    </>
  )
}

export default App
