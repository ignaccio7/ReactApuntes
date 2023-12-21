
// se necesita el estadoinicial que podria ser un array un objeto string o lo que sea
export const cartInitialState = []

export const cartReducer = (state, action) => {
    //esto tiene que devolver un estado porque lo actualizara segun la accion
    // lo mas tipico es usar switch

    const { type: actionType, payload: actionPayload } = action

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)

            if (productInCartIndex >= 0) {
                // una forma
                // el structuredClone lo que hace es hacer una copia profunde de array y objetos
                const newCart = structuredClone(state)
                newCart[productInCartIndex].quantity += 1
                return newCart
            }

            return [
                ...state,
                {
                    ...actionPayload, //product
                    quantity: 1
                }
            ]
        }
        
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            return state.filter(item => item.id !== id)
        }

        case 'CLEAR_CART': {
            return cartInitialState
        }

        default:
            break;
    }

    return state
}