
import { CardProduct } from "./CardProduct"

export function Products({ products }) {
    
    return (
        <div className="products">
            {
                products.map(product => {
                    return (
                        <CardProduct
                            key={product.id}
                            id={product.id}
                            thumbnail={product.thumbnail}
                            title={product.title}
                            category={product.category}
                            price={product.price}
                        >
                        </CardProduct>
                    )
                })
            }
        </div>
    )
}