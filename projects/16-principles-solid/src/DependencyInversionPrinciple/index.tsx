import { useData } from "./useFetch"

type ResponseType = {
  id: string,
  title: string
}

// const fetcher = async (): Promise<ResponseType[]> => {
//   const url = 'https://jsonplaceholder.typicode.com/posts'
//   const res = await fetch(url)
//   return res.json()
// }
// const fetcher = async (): Promise<ResponseType[]> => {
//   return [{ id: "1", title: 'Hello' }, { id: "2", title: 'World' }]
// }

const fetcher = async ():Promise <ResponseType[]> => {
  const posts = localStorage.getItem('posts')
  return posts ? JSON.parse(posts): []
}

const Todo = () => {
    // const { data } = useSWR('https://jsonplaceholder.typicode.com/todos', fetcher)
    const { data } = useData<ResposeType[]>({ key: '/todos', fetcher })

    if (!data) return <p>Loading...</p>

    return (
      <ul>
        {data.map((todo: any) => {
          return (
            <li>
              <span>{todo.title}</span>
            </li>
          )
        })}
      </ul>
    )
  }

export default Todo