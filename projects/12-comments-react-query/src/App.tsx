/** Deberiamos crear un usuario y contraseña en JSONBin para tener una api donde podamos consumir el JSON para hacer pruebas */
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getComments, type CommentWithId, type Comment, postComment } from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App () {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'], // <-----
    getComments
  )
  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(['comments'])

      // Modo 3 -> Mostrar la actualizacion de la pagina sin guardar en la BD actualizacion positiva
      // esto lo hacemos para guardar el estado previo
      // por si tenemos que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])
      
      // -> Actualizar el cache de reat-query manualmente
      queryClient.setQueryData(['comments'], (oldData?: Comment[]): Comment[] => {
        const newCommentToAdd = structuredClone(newComment)
        // este atributo lo agregamos para que sirva para mostrarle al usuario que tiene un diferente estilo porque esta carghando la peticion antes del refetch
        // podemos ver su uso del preview en componentes Results
        newCommentToAdd.preview = true

        if (oldData == null) return [newCommentToAdd]
        return [...oldData, newCommentToAdd]
      })

      return { previousComments } // -----> este previosComments se guardar en el context para recuperarlo y hacer un rollback en caso de que fallara
    },
    onError: (error, variables, context) => {
      console.error(error)
      // aqui hacemos el rollback
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      // una vez que ya termino de hacer la peticion del post entonces podemos hacer el refetch para traerse los datos de la DB
      //Modo 2 -> Hacer otra vez un refetch de la query
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    },
    onSuccess:async (newComment)=>{
      // Modo 1 -> Actualizar el cache de reat-query manualmente
      // await queryClient.setQueryData(['comments'], (oldData?:CommentWithId[])=>{
      //   if (oldData == null) return [newComment]
      //   return [...oldData, newComment]
      // })
      //Modo 2 -> Hacer otra vez un refetch de la query
      // await queryClient.invalidateQueries({
      //   queryKey:['comments']
      // })
      
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return

    event.preventDefault()
    // ---> ???
    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message })
    }
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>

        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />

      </div>
      <div className='col-span-1 p-8 bg-black'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>

          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
