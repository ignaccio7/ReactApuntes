import './App.css'
import { CreateNewUser } from './components/CreateNewUser.tsx'
import { ListOfUsers } from './components/ListOfUsers.tsx'
import { Toaster } from 'react-hot-toast'

function App() {

  // const handleNotification = ()=>{
  //   toast("hola nueva notificacion")
  //   //toast.success("hola nueva notificacion")
  // }

  return (
    <>
      <h1>Nuestro proyecto con Redux</h1>
      {/* <button onClick={handleNotification}>Prueba notificacion</button> */}
      <CreateNewUser/>
      <ListOfUsers/>
      <Toaster/>
    </>
  )
}

export default App
