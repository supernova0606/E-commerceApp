import axios from 'axios';

export function getCart() {
    return function(dispatch) {
        axios.get('/api/cart')
        .then(function(response) {
            dispatch({type: "GET_CART", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "GET_CART_REJECTED", msg: "error when getting the cart from session"})
        })
    }
}

export function addToCart(cart) {
    return function(dispatch) {
        axios.post("/api/cart", cart)
        .then(function(response) {
            dispatch({type: "ADD_TO_CART", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
        })
    }
}

export function updateCart(_id, unit, cart) {
    const currentItemToUpdate = cart
        
    const indexToUpdate = currentItemToUpdate.findIndex(
      function(item) {
        return item._id === _id
      }
    )

    const newItemToUpdate = {
        ...currentItemToUpdate[indexToUpdate],
        quantity: currentItemToUpdate[indexToUpdate].quantity + unit
    }

    let cartUpdate = [...currentItemToUpdate.slice(0, indexToUpdate),
    newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate + 1)]

    return function(dispatch) {
        axios.post("/api/cart", cartUpdate)
        .then(function(response) {
            dispatch({type: "UPDATE_CART", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
        })
    }
}

export function deleteCartItem(cart) {
    return {
            type: "DELETE_CART_ITEM",
            payload: cart
        }
}