import axios from 'axios';

export function getItems() {
    return function(dispatch) {
        axios.get("/api/items")
        .then(function(response) {
            dispatch({type: "GET_ITEMS", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "GET_ITEMS_REJECTED", payload: err})
        })
    }
}

export function postItem(item) {
    return function(dispatch) {
        axios.post("/api/item", item)
        .then(function(response) {
            dispatch({type:"POST_ITEM", payload: response.data})
        })
        .catch(function(err) {
            dispatch({type: "POST_ITEM_REJECTED", payload: "There was an error when posting a new item"})
        })
    }
}

export function deleteItem(id) {
    return function(dispatch) {
        axios.delete("/api/item/" + id)
        .then(function(response) {
            dispatch({type:"DELETE_ITEM", payload: id})
        })
        .catch(function(err) {
            dispatch({type: "DELETE_ITEM_REJECTED", payload: err})
        })
    }
}

export function updateItem(item) {
    return {
        type: "UPDATE_ITEM", 
        payload: item
    }
}