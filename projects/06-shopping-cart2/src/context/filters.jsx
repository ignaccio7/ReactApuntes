
import { createContext, useState } from "react";

// 1.Crear el contexto -> este contexto con el cual vamos a consumir
export const FiltersContext = createContext()

// 2. crear el Provider para proveer el contexto
export function FiltersProvider({ children }){

    const [ filter, setFilter ] = useState({
        category:"all",
        minPrice:0
    })

    return(
        <FiltersContext.Provider value={{
            // category:"all",
            // minPrice:0
            filter,
            setFilter
        }}>
            {children}
        </FiltersContext.Provider>
    )
}
//. 3. tenemos que proveer el contexto en este caso lo hacemos en el punto de entrada de nuestra app