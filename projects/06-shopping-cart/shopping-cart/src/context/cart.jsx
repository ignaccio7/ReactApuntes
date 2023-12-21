// import { createContext, useState } from "react";

// // 1.Crear contexto
// export const CartContext = createContext()

// // 2.Crear provider para Proveer el contexto
// export function CartProvider({ children }) {
//     const [cart, setCart] = useState([])

//     const addToCart = product => {
//         //setCart([...cart,product]) seria la forma sencilla de añadir
//         // Check if the product is already in the cart
//         const productInCartIndex = cart.findIndex(item => item.id === product.id)

//         if (productInCartIndex >= 0) {
//             // una forma
//             // el structuredClone lo que hace es hacer una copia profunde de array y objetos
//             const newCart = structuredClone(cart)
//             newCart[productInCartIndex].quantity += 1
//             return setCart(newCart)
//         }

//         // product is not in cart
//         return setCart(prevState => ([
//             ...prevState,
//             {
//                 ...product,
//                 quantity: 1
//             }
//         ]))


//     }

//     const removeFromCart = product => {
//         setCart(prevState => prevState.filter(item => item.id !== product.id))
//     }

//     const clearCart = () => {
//         setCart([])
//     }

//     return (
//         <CartContext.Provider
//             value={
//                 {
//                     cart,
//                     addToCart,
//                     clearCart,
//                     removeFromCart
//                 }
//             }
//         >
//             {children}
//         </CartContext.Provider>
//     )

// }

//--> USANDO EL USEREDUCER

// import { createContext, useReducer, useState } from "react";

// // 1.Crear contexto
// export const CartContext = createContext()

// // PARA EL REDUCER 
// // se necesita el estadoinicial que podria ser un array un objeto string o lo que sea
// const initialState = []
// const reducer = (state, action) => {
//     //esto tiene que devolver un estado porque lo actualizara segun la accion
//     // lo mas tipico es usar switch

//     const { type: actionType, payload: actionPayload } = action

//     switch (actionType) {
//         case 'ADD_TO_CART': {
//             const { id } = actionPayload
//             const productInCartIndex = state.findIndex(item => item.id === id)

//             if (productInCartIndex >= 0) {
//                 // una forma
//                 // el structuredClone lo que hace es hacer una copia profunde de array y objetos
//                 const newCart = structuredClone(state)
//                 newCart[productInCartIndex].quantity += 1
//                 return newCart
//             }

//             return [
//                 ...state,
//                 {
//                     ...actionPayload, //product
//                     quantity: 1
//                 }
//             ]
//         }
        
//         case 'REMOVE_FROM_CART': {
//             const { id } = actionPayload
//             return state.filter(item => item.id !== id)
//         }

//         case 'CLEAR_CART': {
//             return initialState
//         }

//         default:
//             break;
//     }

//     return state
// }

// // 2.Crear provider para Proveer el contexto
// export function CartProvider({ children }) {
    
//     // necesitamos dos variables el estado y dispatch para poder ejecutar las funciones
//     // necesitamos dos parametros el reducer que sera el hook que usaremos y el initialState con el que iniciara
//     const [state, dispatch] = useReducer(reducer, initialState)

//     const addToCart = product => dispatch({
//         type: 'ADD_TO_CART',
//         payload: product
//     })

//     const removeFromCart = product => dispatch({
//         type: 'REMOVE_FROM_CART',
//         payload: product
//     })

//     const clearCart = () => dispatch({ type: 'CLEAR_CART' })

//     return (
//         <CartContext.Provider
//             value={
//                 {
//                     cart: state,
//                     addToCart,
//                     clearCart,
//                     removeFromCart
//                 }
//             }
//         >
//             {children}
//         </CartContext.Provider>
//     )

// }


// --> REFACTORIZANDOLO DE MEJOR MANERA

// incluso podriamos testear sin renderizarlo
// expect(
//     reducer([],{type:'ADD_TO_CART', payload:{id:1}})
// ).toEqual([{ id:1, quantity:1 }])

import { createContext, useReducer } from "react";

import { cartReducer, cartInitialState } from "../reducers/cart";

// 1.Crear contexto
export const CartContext = createContext()

function useCartReducer () {
    // necesitamos dos variables el estado y dispatch para poder ejecutar las funciones
    // necesitamos dos parametros el reducer que sera el hook que usaremos y el initialState con el que iniciara
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: product
    })

    const clearCart = () => dispatch({ type: 'CLEAR_CART' })

    return { state, addToCart, removeFromCart, clearCart }
}


// 2.Crear provider para Proveer el contexto
export function CartProvider({ children }) {
    
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CartContext.Provider
            value={
                {
                    cart: state,
                    addToCart,
                    clearCart,
                    removeFromCart
                }
            }
        >
            {children}
        </CartContext.Provider>
    )

}