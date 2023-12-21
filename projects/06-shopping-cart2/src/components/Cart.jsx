import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons"
import './Cart.css'
import { useCart } from "../hooks/useCart"

export function CartItem({ id, thumbnail, title, quantity, addToCart }) {
    return (
        <div className="cart_product" key={id}>
            <img src={thumbnail} alt="producto" />
            <h3>{title}</h3>
            <p> <span>Qty : {quantity}</span> <button onClick={addToCart}> + </button> </p>
        </div>
    )
}

export function Cart() {

    const cartIdBoton = useId()

    const { cart, clearCart, addToCart } = useCart()

    return (
        <>

            <label htmlFor={cartIdBoton} className="cart_button">
                <CartIcon />
            </label>
            <input hidden type="checkbox" id={cartIdBoton} style={{ display: "none" }} />

            <aside className="cart">
                <h2>Cart</h2>
                <div className="cart_products">
                    {/* <div className="cart_product">
                        <img src="https://i.dummyjson.com/data/products/6/thumbnail.png" alt="producto" />
                        <h3>Product</h3>
                        <p> <span>Qty : </span> <button> + </button> </p>
                    </div> */}
                    {
                        cart.map(product => {
                            return (
                                // <div className="cart_product" key={product.id}>
                                //     <img src={product.thumbnail} alt="producto" />
                                //     <h3>{product.title}</h3>
                                //     <p> <span>Qty : {product.quantity}</span> <button onClick={() => addToCart(product)}> + </button> </p>
                                // </div>
                                <CartItem
                                    key={product.id}
                                    id={product.id}
                                    thumbnail={product.thumbnail}
                                    title={product.title}
                                    quantity={product.quantity}
                                    addToCart={()=>addToCart(product)}
                                />
                            )
                        })
                    }

                </div>

                <button
                    onClick={() => clearCart()}
                    className="cart_button-clear">
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}