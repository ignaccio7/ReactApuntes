import { TodoType } from "../types/todos"

export const fetchTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
      return response.json()
    })
    .then((todos:TodoType[]) =>{
      return todos
  })
}