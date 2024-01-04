// interface user {
//   id: string
//   name: string,
//   email: string,
//   github: string
// }
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import { IconDelete, IconUpdate } from "./Icons";

// const users: Array<user> = [
//   {
//     id: "1",
//     name: "nestor rojas",
//     email: "igna@gmail.com",
//     github: "ignaccio7"
//   },
//   {
//     id: "2",
//     name: "jhon mircha",
//     email: "jhon@gmail.com",
//     github: "jhonmircha"
//   },
//   {
//     id: "3",
//     name: "miguel duran",
//     email: "midu@gmail.com",
//     github: "midudev"
//   },
// ];
// import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks/store";
import { useUsersActions } from "../hooks/useUsersActions";
// import { UserId, deleteUserById } from "../store/users/slice";


export function ListOfUsers() {

  // const users = useSelector((state) => state.users )
  const users = useAppSelector((state) => state.users)

  // const dispatch = useAppDispatch()

  // const handleDelete = (id: UserId) => {
  //   dispatch(deleteUserById(id))
  // }
  const { handleDelete } = useUsersActions()

  return (
    <Card>
      <Title className="">
        List of Users
      </Title>
      <Badge>{users.length}</Badge>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Github</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell className="flex items-center mr-2 truncate">

                <img
                  className="block w-12 h-12 rounded-full mr-2"
                  src={`https://unavatar.io/github/${item.github}`} alt="Imagen del usuario:" />
                {item.name}
              </TableCell>
              <TableCell>
                <Text>{item.email}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.github}</Text>
              </TableCell>
              <TableCell className="flex gap-2">
                <Button type="button" size="xs" variant="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  <IconDelete aria-label='Remove element' />
                </Button>
                <Button type="button" size="xs" variant="secondary">
                  <IconUpdate />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}