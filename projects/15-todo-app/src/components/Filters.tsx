
import { FILTER_BUTTONS } from "../consts"
import { FilterValue } from "../types.d"

interface Props{
//   filterSelected: typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
  filterSelected : FilterValue
  onFilterChange : (filter : FilterValue) => void
}

export const Filters : React.FC<Props> = (
  { filterSelected, onFilterChange }
) => {
  return(
    <ul className="filters">
      {
        Object.entries(FILTER_BUTTONS).map(([key, { href, literal }])=>{
          const isSelected = key === filterSelected
          const className = isSelected ? 'selected' : ''
          return(
            <li key={key}>
                <a
                href={href}
                className={className}
                onClick={(event)=>{
                  event.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
                >   
                  {literal}
                </a>
            </li>  
          )
        })
      }
      {/* <li>
        <a
          className=""
          onClick={()=>{}}
        >   
          Todos
        </a>
      </li> */}
    </ul>
  )
}