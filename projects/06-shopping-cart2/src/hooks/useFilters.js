import { useContext } from "react"
import { FiltersContext } from "../context/filters"

export function useFilters() {

    // const [filter, setFilter] = useState({
    //   minPrice: 0,
    //   category: 'all'
    // })

    const { filter, setFilter } = useContext(FiltersContext)


    const filterProducts = (products) => {
        return products.filter(product => {
            return product.price >= filter.minPrice &&
                (filter.category === 'all'
                    || product.category === filter.category)
        })
    }

    return { filterProducts, setFilter }

}