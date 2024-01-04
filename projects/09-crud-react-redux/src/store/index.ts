
import { Middleware, configureStore } from "@reduxjs/toolkit";

import usersReducer, { rollbackUser } from "./users/slice";
import { toast } from "react-hot-toast";

// para el middleware
// 1ro recibe la store
// luego recibe una funcion para poder ir a la siguiente
// y por ultimo recibe la accion que le ah llegado
const persistanceLocalStorageMiddleware : Middleware = (store:any) => (next:any) => (action:any) => {
    // aqui podriamos hacer acciones justo antes de actualizar el estado 
    // console.log(store.getState());
    // console.log(action);    
    next(action)
    // y tambien justo despues de actualizar el estado
    // console.log(store.getState());    
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()))
}

// -> crearemos otro middleware para simular el registro a una base de datos
const syncWithDatabase : Middleware = store => next => action=>{
    
    const { type, payload } = action
    const previousState = store.getState()
    
    // -> fase 1
    // cuando hacemos el dispatch aqui podriamos hacer como un peaje
    // console.log({ action, state: store.getState() });
    // aqui ya le decimos que ejecute la accion    
    next(action)
    // -> fase 2
    // console.log({ action, state: store.getState() });

    if (type === 'users/deleteUserById') {
      // para probar el rollback
      const userIdToRemove = payload
      const userToRemove = previousState.users.find( user => user.id === userIdToRemove )

      fetch(`https://jsonplaceholder.typicode.com/users/${payload}`,{
        method: 'DELETE'
      })
        .then(response =>{
            // para probar el rollback comentamos estas lineas
            // if (response.ok) {
            //   toast.success(`Usuario eliminado correctamente con id:${payload}`)
            // }

            throw new Error('Error al eliminar el usuario')

        })
        .catch(err=>{
            // si el usuario nose hubiera eliminado entonces hacemos el rollback
            toast.error(`Error al eliminar el usuario ${userIdToRemove}`)
            if (userToRemove) {
                store.dispatch(rollbackUser(userToRemove))
            }
            console.log(err);
            console.log('Error');            
        })
    }

}

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabase),
})

// esto lo hacemos para tipar los reducers que estemos usando
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch