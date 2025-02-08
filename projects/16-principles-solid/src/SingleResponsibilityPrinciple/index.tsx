import { useTodos } from "./hooks/useTodos"

// ESTO SE PODRIA DECIR QUE YA ESTA SON SINGLE RESPONSIBILITY PRINCIPLE
const SingleResponsibilityPrinciple = () => {
  
  const { todos, isFetching } = useTodos()

  return(
    <>
    <h1>TodoList</h1>
      { isFetching && (<p>Cargando...</p>) }
      <ul>
        { todos.map(todo => {
          return(
            <li> 
              <p>
                <strong> {todo.id} : </strong>
                {todo.title}
              </p>
              {todo.completed === true ? 'Completado' : 'Sin completar'}
            </li>
          )
        }) }
      </ul>
    </>
  )

}

export default SingleResponsibilityPrinciple