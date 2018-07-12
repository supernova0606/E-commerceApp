export function cartReducers(state={cart:[]}, action) {
    switch(action.type) {
        case "ADD_TO_CART":
            return {...state, cart:action.payload}
        case "DELETE_CART_ITEM":
            return {...state, cart:action.payload}
        case "UPDATE_CART":
            //TODO: resume functionality
            return {...state, cart:action.payload}
        default: 
            break;
    }
    return state
}