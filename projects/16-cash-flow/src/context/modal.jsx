import { createContext, useState } from "react";

// 1. Creamos el contexto
export const ModalContext = createContext()

//2. Crear el proveedor para proveer el contexto
export function ModalProvider ({ children }){

  const [showModal,setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return(
    <ModalContext.Provider
      value={
        {
          showModal,
          toggleModal
        }
      }
    >
      {children}
    </ModalContext.Provider>
  )
}

// 3.Ahora lo consumiremos donde lo necesitemos