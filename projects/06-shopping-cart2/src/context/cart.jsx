// import { createContext, useState } from "react";

// // 1. Crear el contexto
// export const CartContext = createContext()

// // 2. Crear el provider
// export function CartProvider ( { children } ){
//     const [cart, setCart] = useState([])

//     console.log(cart);

//     const addToCart = product =>{
//         // setCart([...cart, product])
        
//         //Check if product is already in the cart
//         const productInCartIndex = cart.findIndex(item=>item.id === product.id)

//         if (productInCartIndex >= 0) {
//             const newCart = structuredClone(cart)
//             newCart[productInCartIndex].quantity += 1
//             return setCart(newCart)
//         }

//         // producto no esta en el carrito
//         setCart(prevState=>{
//             return([
//                 ...prevState,
//                 {
//                     ...product,
//                     quantity:1
//                 }
//             ])
//         })

//     }

//     const clearCart = () =>{
//         setCart([])
//     }

//     const removeToCart = (productDelete)=>{
//         return setCart(prevState=>(prevState.filter(product=>product.id!==productDelete.id)))
//     }

//     return(
//         <CartContext.Provider
//             value={{
//                 cart,
//                 addToCart,
//                 clearCart,
//                 removeToCart
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     )

// }

// // 3. Consumir el proveedor

// // -> HACIENDO USO DEL USEREDUCER
// import { createContext, useReducer, useState } from "react";

// /* para usar el reducer necesitamos de un estado inicial en este caso de carrito
//     y el reducer que tendra 2 parametros 1 el estado que recibe y 2 la accion que ejecutara
//     en el estado
//     y siempre debera retornar el nuevo estado que la accion informe o requiera
// */
// const initialState = [] // basicamente este seria el carrito
// const reducer = (state, action)=>{
//     const { type: actionType, payload: actionPayload } = action
//     switch (actionType) {
//         case 'ADD_TO_CART':
//             const productInCartIndex = state.findIndex(product=>product.id === actionPayload.id)

//             if (productInCartIndex>= 0) {
//                 // forma con el structuredClone
//                 const newState = structuredClone(state)
//                 newState[productInCartIndex].quantity += 1
//                 return newState
//             }else{
//                 return [
//                     ...state,
//                     {
//                         ...actionPayload, //product
//                         quantity:1
//                     }
//                 ]
//             }
//             break;
//         case 'REMOVE_TO_CART':
//             return state.filter(product=>product.id!==actionPayload.id)
//             break;

//         case 'CLEAR_CART':
//             // return initialState;
//             return []
//             break;
    
//         default:
//             break;
//     }

//     return state
// }

// // 1. Crear el contesxto
// export const CartContext = createContext()

// // 2. Crear el provider
// export function CartProvider ( { children } ){
//     // const [cart, setCart] = useState([])
//     // para usar el reducer le pasamos el reducer y el estado inicial
//     // y lo que tendremos es 1er param ele stado y el 2do dispatch que se encargara de enviar las acciones al reducer
//     const [state, dispatch] = useReducer(reducer,initialState)

//     const addToCart = product => dispatch({
//         type: 'ADD_TO_CART',
//         payload: product
//     })

//     const clearCart = ()=> dispatch({
//         type:'CLEAR_CART'
//     })

//     const removeToCart = product=> dispatch({
//         type:'REMOVE_TO_CART',
//         payload:product
//     })

//     return(
//         <CartContext.Provider
//             value={{
//                 cart:state,
//                 addToCart,
//                 clearCart,
//                 removeToCart
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     )

// }

// // 3. Consumir el proveedor


//-> por ultimo podriamos separar de mejor manera el codigo

// -> HACIENDO USO DEL USEREDUCER
import { createContext, useReducer, useState } from "react";
import { initialCartState, cartReducer } from "../reducers/cart";

function useCartReducer(){
    // const [cart, setCart] = useState([])
    // para usar el reducer le pasamos el reducer y el estado inicial
    // y lo que tendremos es 1er param ele stado y el 2do dispatch que se encargara de enviar las acciones al reducer
    const [state, dispatch] = useReducer(cartReducer,initialCartState)

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    })

    const clearCart = ()=> dispatch({
        type:'CLEAR_CART'
    })

    const removeToCart = product=> dispatch({
        type:'REMOVE_TO_CART',
        payload:product
    })

    return { state, addToCart, clearCart, removeToCart }

}



// 1. Crear el contesxto
export const CartContext = createContext()

// 2. Crear el provider
export function CartProvider ( { children } ){

    const { state, addToCart, clearCart, removeToCart } = useCartReducer()
    
    return(
        <CartContext.Provider
            value={{
                cart:state,
                addToCart,
                clearCart,
                removeToCart
            }}
        >
            {children}
        </CartContext.Provider>
    )

}

// 3. Consumir el proveedor