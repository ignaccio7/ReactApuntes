
// ESTO NO ESTA SON SINGLE RESPONSIBILITY PRINCIPLE
import { useEffect, useState } from "react";

type TodoType = {
  id : number;
  userId : number;
  title : string;
  completed : boolean
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isFetching, setIsFeching] = useState(false)

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setIsFeching(true)
        return response.json()
      })
      .then((todos:TodoType[]) =>{
        setTodos(todos)
      })
      .finally(()=>{
        setIsFeching(false)
      })
  },[])

  return(
    <>
      { isFetching && (<p>Cargando...</p>) }
      <ul>
        { todos.map(todo => {
          return(
            <li> 
              <p>
                <strong> {todo.id} : </strong>
                {todo.title}
              </p>
              ${todo.completed}
            </li>
          )
        }) }
      </ul>
    </>
  )

}

export default TodoList