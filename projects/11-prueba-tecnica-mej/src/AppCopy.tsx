
import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { ListOfUsers } from './components/ListOfUsers'
import { SortBy, type User } from './types.d'
import { Loader } from './components/Loader'

const API_URL = 'https://randomuser.me/api?results=10'

const fetchUsers = async (page: number)=>{
  return await fetch(`${API_URL}&page=${page}`)
  .then(async response => {
    if (!response.ok) {
      throw new Error('Error en la peticion')
    }
    return await response.json()
  })
  .then(data => {    
      return data.results 
  })
}

function App() {

  const [users, setUsers] = useState<Array<User>>([])
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const initialStateUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<String>('')

  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setLoader(true)
    setError(false)
    fetchUsers(currentPage)
      .then(data => {
        setUsers(prevUsers=>{
          const newUsers = prevUsers.concat(data)
          initialStateUsers.current = newUsers
          return newUsers
        })
      })
      .catch(e => {
        setError(true)
        console.log(e);
      })
      .finally(() => {
        setLoader(false)
      })
  }, [currentPage])

  const [colorRows, setColorRows] = useState<Boolean>(false)

  const toggleColor = () => {
    setColorRows(!colorRows)
  }

  const toggleSortByCountry = () => {
    // setSortByCountry(!sortByCountry)
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const filterUsers = useMemo(() => {
    console.log("filterCountry");

    return filterCountry !== '' && filterCountry.trim().length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  /*const sortedUsers = sortByCountry
    // ? users.sort((a,b) => {return( a.location.country > b.location.country ? 1 : -1 )}) esto no funciona porque el sort muta el array original
    ? [...users].sort((a,b)=>{ return(a.location.country.localeCompare(b.location.country)) })
    : users*/

  const deleteUser = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(initialStateUsers.current)
  }

  const handleFilter = (event: any) => {
    setFilterCountry(event.target.value)
  }

  const sortedUsers = useMemo(() => {
    console.log("FilterSort");

    // return sorting === SortBy.COUNTRY
    //   ? [...filterUsers].sort((a, b) => { return (a.location.country.localeCompare(b.location.country)) })
    //   : filterUsers

    if (sorting === SortBy.COUNTRY)
      return [...filterUsers].sort((a, b) => { return (a.location.country.localeCompare(b.location.country)) })

    if (sorting === SortBy.NAME)
      return [...filterUsers].sort((a, b) => { return (a.name.first.localeCompare(b.name.first)) })

    if (sorting === SortBy.LAST)
      return [...filterUsers].sort((a, b) => { return (a.name.last.localeCompare(b.name.last)) })

    return filterUsers

  }, [sorting, filterUsers])

  const changeSort = (valor: SortBy) => {
    setSorting(valor)
  }

  return (
    <>
      <header>
        <h1>Prueba Tecnica Random Users</h1>
        <div className='filters'>
          <button onClick={toggleColor}>Colorear Filas</button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'Dejar de ordenar' : 'Ordenar por País'}
          </button>
          <button onClick={handleReset}>
            Reiniciar Estado
          </button>
          <input type="text" placeholder='Introduce la ciudad'
            onChange={(event) => handleFilter(event)}
            style={{ padding: '.2rem', border: '1px solid #0005', borderRadius: '.2rem' }} />
        </div>
      </header>
      <hr />
      <main>
        {users.length > 0 &&
          <>
            <ListOfUsers
              color={colorRows}
              users={sortedUsers}
              deleteUser={deleteUser}
              changeSort={changeSort}
              />            
          </>
        }
        {loader && <Loader />}
        {error && 'Ocurrio un error al cargar los usuarios'}
        {(!loader && users.length === 0 && 'No se encontraron usuarios')}
        { (users.length > 0 && !loader) && <button onClick={()=>setCurrentPage(currentPage + 1)}> Cargar más </button> }
      </main>
    </>
  )
}

export default App
