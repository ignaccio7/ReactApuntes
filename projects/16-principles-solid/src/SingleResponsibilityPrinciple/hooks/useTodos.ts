import { useEffect, useState } from "react";
import { fetchTodos } from "../services/todos";
import { TodoType } from "../types/todos";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const [isFetching, setIsFeching] = useState(false)

  useEffect(()=>{
      fetchTodos()
      .then((data)=>{
        setTodos(data)
      })
      .finally(()=>{
        setIsFeching(false)
      })
  },[])

  return { todos, isFetching }

}