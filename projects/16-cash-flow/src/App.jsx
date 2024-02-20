import { Suspense, lazy } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen';
// import Modal from './components/modal';
// import { ModalContext } from './context/modal';
// import { Home } from './Home'

const Home = lazy(()=> {
  return new Promise((resolve)=>{
    setTimeout(() => {
      resolve(import('./Home'))
    }, 1000);
  })
})

function App() {

  // const { showModal } = useContext(ModalContext)

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <Suspense fallback={<SplashScreen/>}>
      {/* aqui usamos el provider de nuestro contexto */}
      {/* <ModalProvider> */}
        <Home/>
        {/* { showModal && <Modal/> } */}
      {/* </ModalProvider> */}
    </Suspense>
  )
}

export default App
