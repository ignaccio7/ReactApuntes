
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons'

import { useCart } from '../hooks/useCart'

export function Products({ products }) {

    const { addToCart, cart, removeFromCart } = useCart()

    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <section className='products'>
            <section className="products">
                {
                    products.slice(0, 10).map(product => {

                        const isProductInCart = checkProductInCart(product)

                        return (
                            <div className="products__card"
                                key={product.id}>
                                <div className="products__frame">
                                    <img src={product.thumbnail} alt={product.title} />
                                </div>
                                <div className="products__content">
                                    <h2 className='products__title'>{product.title}</h2>
                                    <span className="products__price">
                                        {product.price}
                                    </span>
                                    <button
                                        className='products__button'
                                        onClick={() => {
                                            isProductInCart
                                            ? removeFromCart(product)
                                            : addToCart(product)
                                        }}

                                        style={{
                                            backgroundColor: isProductInCart ? 'red' : '#09f'
                                        }}
                                    >
                                        {
                                            isProductInCart
                                            ? <RemoveFromCartIcon/>
                                            : <AddToCartIcon />
                                        }
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </section>
    )

}
