import { Todo } from "./Todo"
import { TodoId, type ListOfTodos, Todo as TodoType } from "./types.d"

interface Props{
 todos : ListOfTodos
 onRemoveTodo: ({ id } : TodoId) => void 
 onToggleCompleteTodo: ({ id, completed } : Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todos : React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleteTodo }) => {
  return(
    <ul className="todo-list">
      {
        todos.map(todo => {
          return(
            <li 
              key={todo.id} 
              className={`${todo.completed ? 'completed' : ''}`}
            >
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                completed={todo.completed}
                onRemoveTodo={onRemoveTodo}
                onToggleCompleteTodo={onToggleCompleteTodo}
              />
            </li>      
          )
        })
      }
    </ul>
  )
}