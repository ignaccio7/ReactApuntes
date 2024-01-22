import { useState } from 'react'
import { TodoTitle } from "../types"

interface Props {
  saveTodo: (title: TodoTitle) => void
}

export const CreateTodo : React.FC<Props> = ({ saveTodo }) => {
  
  const [ inputValue, setInputValue ] = useState('')

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveTodo(inputValue)
    setInputValue('')
  }

  return(
    <form onSubmit={handleSubmit}>
        <input 
            className="new-todo"
            type="text" 
            value={inputValue}
            onChange={(evt)=>{ setInputValue(evt.target.value) }}
            placeholder='¿Que quieres hacer?'
            autoFocus
        />
    </form>
  )
}

// esto es un polyfill que seria una funcion que basicamente es simular una funcionalidad que no soporte el navegador
/*window.crypto.randomUUID = window.crypto.randomUUID || function() {
  const crypto = window.crypto || window.msCrypto
  const rnds8 = new Uint8Array(16)
  return crypto.getRandomValues(rnds8).reduce(function(result, value){
    return result + value.toString(16).padStart(2, '0')
  },'')
}*/