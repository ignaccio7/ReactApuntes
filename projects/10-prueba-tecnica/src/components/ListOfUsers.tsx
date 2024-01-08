import { SortBy, User } from "../types.d"

interface Props {
    deleteUser: (email:string) => void
    color: Boolean
    users: User[]
    changeSort: (valor:SortBy) => void
}

export function ListOfUsers({ color, users, deleteUser, changeSort }: Props) {    
    
    return (
        <table width='100%' >
            <thead>
                <tr>
                  <th>Foto</th>
                  <th onClick={()=>{ changeSort(SortBy.NAME) }} >Nombre</th>
                  <th onClick={()=>{ changeSort(SortBy.LAST) }} >Apellido</th>
                  <th onClick={()=>{ changeSort(SortBy.COUNTRY) }} >País</th>
                  <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                  users.map((user, index) => {
                    let backgroundColor = 'transparent'
                    if (color) {
                      backgroundColor = index % 2 === 0 ? '#0002' : '#0008'
                    }

                    return (
                      <tr key={user.email} style={{ backgroundColor }}>
                        <td>
                          <img src={ user.picture.thumbnail } alt={`Picture of ${user.name.first}`} />
                        </td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button onClick={()=>{ deleteUser(user.email) }} >
                                Eliminar
                            </button>
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
        </table>
    )
}