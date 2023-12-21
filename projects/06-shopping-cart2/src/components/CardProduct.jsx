
import { useCart } from '../hooks/useCart'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'

export function CardProduct({ id, thumbnail, title, category, price }) {

    const { cart, addToCart, removeToCart } = useCart()

    const checkProductInCart = (id) => {
        return cart.some(product => product.id === id)
    }    

    const checked = checkProductInCart(id)

    return (
        <div className="product" key={id}>
            <img src={thumbnail} alt={title} />
            <h3>{title}</h3>
            <p>{category} - {price}</p>
            <button
                onClick={() => {
                    return checked
                        ? removeToCart({ id, thumbnail, title, category, price })
                        : addToCart({ id, thumbnail, title, category, price })
                }}
                style={ checked ? { "backgroundColor":"red" } : {"backgroundColor":"#09f"} }
            >
                {
                    checked
                    ? <RemoveFromCartIcon></RemoveFromCartIcon>
                    : <AddToCartIcon></AddToCartIcon>
                }                
            </button>
        </div>
    )
}