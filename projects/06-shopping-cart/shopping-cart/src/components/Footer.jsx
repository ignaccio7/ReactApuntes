
import './Footer.css'
import { useCart } from '../hooks/useCart'

export function Footer({ filters }) {

    const { cart } = useCart()
    console.log(cart);
    return (
        <footer>
            <h3>Soy el pie de pagina - <a href="#">@hola</a> </h3>
            <p>{JSON.stringify(filters, null, 2)}</p>
            {/* <p>{JSON.stringify(cart, null, 2)}</p> */}
        </footer>
    )

}
