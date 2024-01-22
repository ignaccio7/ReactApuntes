import { TODO_FILTERS } from "./consts"

type TodoTitle = string

export interface Todo {
  id:string,
  title:TodoTitle,
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type TodoIdConOmit = Omit<Todo, 'title' | 'completed'>

export type ListOfTodos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]