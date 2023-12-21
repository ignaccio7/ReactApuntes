import { useState, useId, useContext } from "react"
import { FiltersContext } from "../context/filters"

export default function FormFilters(){

    const { filter, setFilter } = useContext(FiltersContext)

    const priceFilterId = useId()
    const categoryFilterId = useId()

    const handleChange = (e)=>{
        setFilter((prevState)=>({
            ...prevState,
            minPrice:e.target.value
        }))
    }

    const filterForm=(event)=>{
        event.preventDefault()
        setFilter((prevState)=>{
            return{
                minPrice:parseInt(event.target.price.value),
                category:event.target.category.value
            }
        })
    }

    return(
        <form onSubmit={(e)=>filterForm(e)} className='filter'>
          <div className="filter_category">
            <label htmlFor={categoryFilterId}>Category:</label>
            <select id={categoryFilterId} type="select" name="category">
                <option value="all">Todos</option>t
                <option value="laptops">Laptops</option>
                <option value="smartphones">Celualres</option>
            </select>
          </div>
          <div className="filter_price">
            <label htmlFor={priceFilterId}>Price: </label>
            <input id={priceFilterId} name="price" type="range" value={filter.minPrice} onChange={handleChange}  max="1000"/> <span>{ filter.minPrice }</span>
          </div>
          <input type="submit" value="Filtrar" style={{ maxWidth:'250px' }}/>
        </form>
    )
}