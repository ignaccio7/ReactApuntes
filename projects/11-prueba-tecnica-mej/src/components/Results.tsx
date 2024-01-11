import { useUsers } from "../hooks/useUsers"

export const Results = () =>{

    const { users } = useUsers()

    return (
        <h3>Total resultados : {users.length}</h3>
    )
}