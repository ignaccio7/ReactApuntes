
import { TodoId, type Todo as TodoType } from './types.d'

// type Props = TodoType
interface Props extends TodoType{
  onRemoveTodo: ({ id } : TodoId) => void
  onToggleCompleteTodo: ({ id, completed } : Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo : React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleteTodo }) => {

  const handleChangeCheckbox = (event:React.ChangeEvent<HTMLInputElement>) : void => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  return(
    <div className='view'>
      <input 
        className='toggle'
        type="checkbox"
        checked={completed} 
        // onChange={(event)=>{
        //   onToggleCompleteTodo({ id, completed: event.target.checked })
        // }}
        onChange={handleChangeCheckbox}
      />        
      <label>{title}</label>
      <button 
        className='destroy'
        onClick={()=>{
          onRemoveTodo({ id })
        }}
      />
    </div>
  )
}