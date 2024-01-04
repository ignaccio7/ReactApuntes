import { UserId, addNewUser, deleteUserById } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const handleCreate = ({ name, email, github }:{ name:string, email:string, github:string  }) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const handleDelete = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { handleDelete, handleCreate }
}