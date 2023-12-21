// Generalmente se lo usa en estados que cambien con poca frecuencia o que sean pequeños
// ejem que el usuario este logeado correctamente
// si queremos cambios quirurjicos o que son muy complejos tenemos alterativas como Redux que es antiguo o mejor recomendado Zusthand
import { createContext, useState } from "react";

// 1.Crear el contexto -> este es el que tenemos que consumir
export const FiltersContext = createContext()

// 2.Crear el Provider, para proveer el contexto -> este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }) {

    const [ filters, setFilters ] = useState({
        category:'all',
        minPrice:0
    })

    return (
        <FiltersContext.Provider
            value={{
                // category: 'all',
                // minPrice: 0
                filters,
                setFilters
            }}
        >
            {children}
        </FiltersContext.Provider>
    )
}

// 3.Ahora lo consumiremos donde lo necesitemos