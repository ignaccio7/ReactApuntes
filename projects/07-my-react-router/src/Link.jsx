
import { BUTTONS, EVENTS } from "./consts"

export function navigate(href) {
    window.history.pushState({}, '', href) // esto nos permitira cambiar la url en la pagina
    // para crear un evento personalizado
    const navigationEvent = new Event(EVENTS.PUSHSTATE) // esto xq no existe un evento en js nativo que te permita escuchar cuando cambie la url pero si que hay cuando lo hacemos hacia atras
    // como creamos el evento ahora lo que nos falta es enviar el evento
    window.dispatchEvent(navigationEvent) // ahora ya podremos escuchar el evento
}

export function Link({ target, to,...props }) {
    const handleClick = (event) => { 
        const isMainEvent = event.button === BUTTONS.primary // para cuando el usuario de el boton Primary click del mouse que en nuestro caso es la izquierda pero si que para un zurdo podria configurarlo y ser la derecha por eso que sea igual a 0
        const isModifiedevent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        // si es el boton main Y si se debe mostrar en la misma pagina Y NO esta presionando una tecla que pueda ocasionar un diferente comportamiento
        if (isMainEvent && isManageableEvent && !isModifiedevent) {
            event.preventDefault()
            navigate(to) // Navegacion con SPA
        }

        window.scrollTo(0, 0)
    }

    /*
        Y en el componente lo usaremos de esta manera por ejemplo <Link to='/about'>Ir a sobre nosotros</Link>
        y te estaras preguntando pero porque el ancor reenderiza el texto al medio de la etiqueta Link sin la propiedad Children
        y eso es por las props basicamente es porque children es un elemento del objeto props por ejemplos props.children
        y en el elemento ancor que estamos reenderizando le estamos pasando todas las props
        podria funcionar asi:
        <a
          onClick={handleClick}
          href={to}
          target={target}
          {...props}
        >
            {children}
        </a>
        pero tambien de la manera como esta
    */
    return (
        <a
          onClick={handleClick}
          href={to}
          target={target}
          {...props}
        />
    )


}