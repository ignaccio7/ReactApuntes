import './Cart.css'
import { useId } from "react"
import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./Icons"
import { useCart } from '../hooks/useCart'

function ProductCart({ thumbnail, title, price, quantity, addToCart }) {
    return (
        <li className="cart__product">
            <img src={thumbnail} alt="imagen" />
            <h3>{title} - {price}$</h3>
            <p>Qty {quantity} :   
                <button 
                    className='cart__quantity'
                    onClick={addToCart}
                >
                    +
                </button> 
            </p>
        </li>
    )
}

export function Cart() {

    const cartId = useId()

    const { cart, clearCart, addToCart } = useCart()


    return (
        <>
            <label htmlFor={cartId} className='btnCart'>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartId} hidden />
            <aside className='cart'>
                <h1>Carrito</h1>
                <ul className="cart__products">
                    {
                        cart.map(product => {
                            return (
                                <ProductCart
                                    key={product.id}
                                    {...product}
                                    addToCart={() => addToCart(product)}
                                />
                            )
                        })
                    }
                </ul>
                <button
                    onClick={clearCart}
                >
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}