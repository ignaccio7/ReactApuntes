// import { useState } from "react"

// export function Filters({onChange}) {

//     const [minPrice, setMinPrice] = useState(0)

//     /**
//      * Estos metodos estan mal xq tenemos 2 fuentes de la verdad
//      * y xq estamos pasando la funcion nativa de react a un hijo
//      * tendriamos que saber el contrato que espera el state del app
//      * y en este caso tenemos props drilling como si estuviera taladrando el prop
//      * ya que del app pasa al header y del header al filter y recien
//      * ----- min 30
//      */
//     const handlePrice=(event)=>{
//         setMinPrice(event.target.value)
//         onChange((previousState)=>{
//             return({
//                 ...previousState,
//                 minPrice:event.target.value
//             })
//         })
//     }

//     const handleCategory = (event)=>{
//         onChange(prevState=>({
//             ...prevState,
//             category: event.target.value
//         }))
//     }

//     return (
//         <section className="filters">
//             <div>
//                 <label htmlFor="price">Precio a partir de : </label>
//                 <input type="range"
//                     id="price"
//                     min='0'
//                     max='1000'
//                     value={minPrice}
//                     onChange={handlePrice}
//                 />
//                 {minPrice}
//             </div>

//             <div>
//                 <label htmlFor="category">Categoria : </label>
//                 <select onChange={handleCategory} name="category" id="category">
//                     <option value="all">Todas</option>
//                     <option value="laptops">Portatiles</option>
//                     <option value="smartphones">Celulares</option>
//                 </select>
//             </div>

//         </section>
//     )
// }

//------------------------------ USANDO NUEVO HOOK USEID Y USECONTEXT

// import { useState, useId, useContext } from "react"
// import { FiltersContext } from "../context/filters"
import { useId } from "react"
import { useFilters } from "../hooks/useFilters"

export function Filters() {

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    // const {setFilters} = useContext(FiltersContext)
    const {filters, setFilters} = useFilters()

    /**
     * Estos metodos estan mal xq tenemos 2 fuentes de la verdad
     * y xq estamos pasando la funcion nativa de react a un hijo
     * tendriamos que saber el contrato que espera el state del app
     * y en este caso tenemos props drilling como si estuviera taladrando el prop
     * ya que del app pasa al header y del header al filter y recien
     * ----- min 30
     */
    const handlePrice=(event)=>{
        setFilters((previousState)=>{
            return({
                ...previousState,
                minPrice:event.target.value
            })
        })
    }

    const handleCategory = (event)=>{
        setFilters(prevState=>({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio a partir de : </label>
                <input type="range"
                    id={minPriceFilterId}
                    min='0'
                    max='1000'
                    value={filters.minPrice}
                    onChange={handlePrice}
                />
                {filters.minPrice}
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoria : </label>
                <select onChange={handleCategory} name="category" id={categoryFilterId}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>

        </section>
    )
}
