
export function itemReducers(state = {items: []}, action) {
    switch (action.type) {
      case "GET_ITEMS":
        return {...state, items:[...action.payload] }

    case 'POST_ITEM':
      return { items: [...state.items, ...action.payload] };
  
    case 'DELETE_ITEM':
      const currentItemToDelete = [...state.items]
      
      const indexToDelete = currentItemToDelete.findIndex(
        function(item) {
          return item.name === action.payload.name
        }
      )
        
      return { items: [...currentItemToDelete.slice(0, indexToDelete), 
        ...currentItemToDelete.slice(indexToDelete + 1)] }

      case 'UPDATE_ITEM': 
        const currentItemToUpdate = [...state.items]
        
        const indexToUpdate = currentItemToUpdate.findIndex(
          function(item) {
            return item.name === action.payload[0].name
          }
        )

        const newItemToUpdate = {
          ...currentItemToUpdate[indexToUpdate], 
          name: action.payload[1].name,
          description: action.payload[1].description, 
          price: action.payload[1].price,
          images: action.payload[1].images
        }
  
        return {items: [...currentItemToUpdate.slice(0, indexToUpdate),
        newItemToUpdate, ...currentItemToUpdate.slice(indexToUpdate + 1)]}

      default: 
        break;
  }
    return state;
  }