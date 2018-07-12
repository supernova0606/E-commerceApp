export function cartReducers(state={cart:[]}, action) {
    switch(action.type) {
        case "ADD_TO_CART":
            return {...state, cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
        case "DELETE_CART_ITEM":
            return {...state, cart:action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
        case "UPDATE_CART":
            const currentItemToUpdate = [...state.cart]
        
            const indexToUpdate = currentItemToUpdate.findIndex(
              function(item) {
                return item.name === action._id
              }
            )
    
            const newItemToUpdate = {
                quantity: currentItemToUpdate[indexToUpdate].quantity + action.unit
            }

            let cartUpdate = [...currentItemToUpdate.slice(0, indexToUpdate),
            newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate + 1)]

            return {...state, cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).qty
            }
        default: 
            break;
    }
    return state
}

export function totals(payloadArr) {
    const totalAmount = payloadArr.map(function(cartArr) {
        return cartArr.price * cartArr.quantity;
    }).reduce(function(a, b) {
        return a + b
    }, 0);

    const totalQty = payloadArr.map(function(qty) {
        return qty.quantity;
    }).reduce(function(a, b) {
        return a + b;
    }, 0);

    return {amount: totalAmount.toFixed(2), qty: totalQty}
}