
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserId = string

export interface User {
    name: string,
    email: string,
    github: string
}

export interface UserWithId extends User {
    id: UserId
}

const DEFAULT_STATE = [
    {
        id: "1",
        name: "nestor rojas",
        email: "igna@gmail.com",
        github: "ignaccio7"
    },
    {
        id: "2",
        name: "jhon mircha",
        email: "jhon@gmail.com",
        github: "jhonmircha"
    },
    {
        id: "3",
        name: "miguel duran",
        email: "midu@gmail.com",
        github: "midudev"
    },
]

// aqui usaremos una IFE funcion que se invoca a si misma
// estamos llamando a esa funcion porque nos devolvera un estado inicial en nuestra app
const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");
    // if (persistedState) {
    //   return JSON.parse(persistedState).users
    // }
    // return DEFAULT_STATE
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        // actions
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID()
            // return [
            //     ...state,
            //     {
            //         id,
            //         ...action.payload
            //     }
            // ]
            // una cosa interesante con reduxtoolkit esque no tenemnos que crear un nuevo estado para retornar
            // sino que podemos mutar el estado que ya tenemos osea el original
            // en este caso hariamos
            state.push({
                id,
                ...action.payload
            })

        },

        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id = action.payload
            return state.filter(user => user.id !== id)
        },

        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            // si esque el usuario no esta definido entonces lo vuelvo a asignar
            const isUserAlReadyDefined = state.some(user => user.id === action.payload.id)
            if (!isUserAlReadyDefined) {
                return [...state, action.payload]
            }
        }

    }
})

export default usersSlice.reducer

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions