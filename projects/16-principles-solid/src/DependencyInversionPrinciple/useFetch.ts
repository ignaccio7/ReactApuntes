import useSWR from 'swr'

interface UseFetch<T>{
  key: string,
  fetcher: ()=>Promise<T>
}

interface Response<T>{
  data: T | undefined,
  error: string | undefined,
  isValidating: boolean
}

export const useData = ({ key, fetcher } : UseFetch): Response<T> => {
  const { data, error, isValidating } = useSWR<T, string>(key,fetcher)
  return { data, error, isValidating }
}