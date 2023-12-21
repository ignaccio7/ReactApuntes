/* para usar el reducer necesitamos de un estado inicial en este caso de carrito
    y el reducer que tendra 2 parametros 1 el estado que recibe y 2 la accion que ejecutara
    en el estado
    y siempre debera retornar el nuevo estado que la accion informe o requiera
*/
// export const initialCartState = [] // basicamente este seria el carrito
export const initialCartState = JSON.parse(window.localStorage.getItem('cart')) || [] // basicamente este seria el carrito

// update localstorage with state for cart
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action)=>{
    const { type: actionType, payload: actionPayload } = action
    switch (actionType) {
        case 'ADD_TO_CART':
            const productInCartIndex = state.findIndex(product=>product.id === actionPayload.id)

            if (productInCartIndex>= 0) {
                // forma con el structuredClone
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                updateLocalStorage(newState)
                return newState
            }else{
                const newState = [
                    ...state,
                    {
                        ...actionPayload, //product
                        quantity:1
                    }
                ]
                updateLocalStorage(newState)
                return newState
            }
            break;
        case 'REMOVE_TO_CART':
            const newState = state.filter(product=>product.id!==actionPayload.id)
            updateLocalStorage(newState)
            return newState
            break;

        case 'CLEAR_CART':
            // return initialState;
            updateLocalStorage([])
            return []
            break;
    
        default:
            break;
    }

    return state
}