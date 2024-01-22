import { useState } from "react"
import { Todos } from "./Todos"
import { Todo as TodoType, TodoId, FilterValue, TodoTitle } from "./types.d"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTODOS = [
  {
    id: "1",
    title: "TODO 1",
    completed: true
  },
  {
    id: "2",
    title: "TODO 2",
    completed: false
  },
  {
    id: "3",
    title: "TODO 3",
    completed: false
  },
]

function App() {

  const [todos,setTodos] = useState(mockTODOS)

  const handleRemove = ({ id }: TodoId) : void =>{
    const newTodos = todos.filter(todo => {
      return todo.id !== id
    })
    setTodos(newTodos)
  }

  //se puede tipar de esta manera tambien
  // const handleCompleted = ({ id, completed } : Partial<Todo>):void => {
  const handleCompleted = (
    { id, completed } : Pick<TodoType, 'id' | 'completed'>
  ):void => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return{
          ...todo,
          completed
        }
      }
      return todo
    })

    setTodos(newTodos)

  }


  // para los filtros
  const [ filterSelected, setFilterSelected ] = useState<FilterValue>(TODO_FILTERS.ALL)

  const handleFilterChange = (filter:FilterValue) : void => {
    setFilterSelected(filter)
  }

  const activeCount = todos.filter(todo=>!todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter(todo => {
    if(filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if(filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleRemoveAllCompleted = () =>{
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const handleAddTodo = (title : TodoTitle) => {
    const newTodo = {
      id : crypto.randomUUID(),
      title,
      completed: false
    }
    const newTodos = [
      ...todos,
      newTodo
    ]
    setTodos(newTodos)
  }
  
  return (
    <div className="todoapp">
      <h1>TODO App</h1>
      <Header
        onAddTodo={handleAddTodo}
      />
      <Todos 
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
        todos={filteredTodos} 
      />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompleted}
      />
    </div>
  )
}

export default App
