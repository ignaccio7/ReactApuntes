
const delay = async(ms:number) => await new Promise(resolve=>setTimeout(resolve,ms))

const API_URL = 'https://randomuser.me/api?seed=hola&results=10'

export const fetchUsers = async ({ pageParam=1 }:{pageParam?:number})=>{

  await delay(500)

  return await fetch(`${API_URL}&page=${pageParam}`)
  .then(async response => {
    if (!response.ok) {
      throw new Error('Error en la peticion')
    }
    return await response.json()
  })
  .then(data => {    
    //   return data.results 

    const currentPage = Number(data.info.page)
    const nextCursor = currentPage > 3 ? undefined : currentPage + 1

    return {
        users : data.results,
        nextCursor
    }
  })
}