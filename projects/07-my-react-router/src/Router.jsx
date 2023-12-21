
import { EVENTS } from "./consts"
import { useState, useEffect, Children } from "react"
import { match } from 'path-to-regexp'
import { getCurrentPath } from "./utils"

export function Router({ children, routes = [], defaultComponent: DefaultComponent = () => (<h1>404 - Not Found</h1>) }) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath()) // que sera la url

    useEffect(() => {
        const onLocationChange = () => {
            setCurrentPath(getCurrentPath())
        }

        window.addEventListener(EVENTS.PUSHSTATE, onLocationChange) // ESTE es el evento personalizado que creamos para cuando cambie la url
        window.addEventListener(EVENTS.POPSTATE, onLocationChange) // el popstate es el evento que esta cargando el navegador cuando nosotros damos click conlos botones de flechas para navegar atras o adelante o cuando hacemos un window.history.back


        return () => {
            window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
            window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
        }

    }, [])

    // aqui configuraremos para saber que es lo que tiene que reenderizar
    // const Page = routes.find(({ path }) => path === currentPath)?.Component

    let routeParams = {}

    // aqui haremos la magia del Route que lo que sera es añadir las rutas del children que vienen del Route Components
    // console.log(children); podremos ver un array o un objeto si es 1 compontente pero en si lo haremos un array que nos dara informacion acerca de la ruta
    // este Children viene de React que nos porporciona una manera de poder iterar sobre los childrens
    // esto es pára iterar sobre los children dentro de un componente
    const routerFromChildren = Children.map(children, ({ props, type })=>{
        // const { type } = children
        const { name } = type
        const isRoute = name === 'Route'

        return isRoute ? props : null
    })

    // console.log(routerFromChildren);
    const routesToUse = routes.concat(routerFromChildren).filter(Boolean)

    // aqui configuraremos para saber que es lo que tiene que reenderizar
    // const Page = routes.find(({ path }) => {
    const Page = routesToUse.find(({ path }) => {
        if (path === currentPath) return true

        // Hemos usado path-to-regex
        // para poder detectar rutas dinamicas como por ejemplo
        // en este caso una ruta de ejemplo -> /search/:query <- :query es una ruta dinamica
        const matchUrl = match(path, { decode: decodeURIComponent }) // esto nos devolvera una funcion a la cual nosotros podremos pasarle la url y saber si hay match con lo que estamos buscando
        const matched = matchUrl(currentPath)
        if (!matched) return false

        // En caso de hacer match lo que debemos hacer eso
        // Guardar los parametros de la url que eran dinamicos
        // y que hemos extraido de path-to-regex
        // por ejemplo, si la ruta es /searc/:query
        // Y la url es /search/javascript
        // matched.params.query === 'javascript
        routeParams = matched.params
        return true
    })?.Component
    // aqui para que sirve el -> ? <-
    // bueno basicamente es que si el find devuelve null entonces no sigue evaluando lo de la derecha
    // const Page = null.Component de esta forma petaria nuestra aplicacion
    // es una forma de validar null

    // return Page ? <Page /> : <DefaultComponent />
    return Page
        ? <Page routeParams={routeParams} />
        : <DefaultComponent routeParams={routeParams} />

}