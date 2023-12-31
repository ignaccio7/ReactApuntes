
import { useEffect, useState } from 'react'

// va ser <T> y T porque el tipo nos lo va decir el usuario
export function useDebounce<T> (value: T, delay = 500) {
    const [ debouncedValue, setDebouncedValue] = useState(value)

    useEffect(()=>{
      const timer = setTimeout(() => {
        setDebouncedValue(value)
      }, delay);    

      return () => clearTimeout(timer)

    },[value, delay])

    return debouncedValue
}

//puede ser como
// useDebounce<string>('Hello',500)
// useDebounce<number>(10,500)

/**
 * Lo que pasa es
 * 0ms -> user type - 'h'
        useEffect ... L8
 * 150ms -> user type - 'he'
        clearTime ... L13
        useEffect ... L8
* 300ms -> user type - 'hel'
        clearTime ... L13
        useEffect ... L8 
* 400ms -> user type - 'hell'
        clearTime ... L13
        useEffect ... L8       
 * 900ms L10 -> setDebouncedValue -> L17 debouncedValue -> es lo que va llegar a nuestro componente
 * 
 * 
 */