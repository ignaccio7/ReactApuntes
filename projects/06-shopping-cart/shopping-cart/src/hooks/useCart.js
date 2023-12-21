
import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
    const cart = useContext(CartContext)

    //como buena practica se debe verificar si esta definido o no
    if (cart === undefined) {
        throw new Error('use cart must be used within a CartProvider')
    }

    return cart
}
