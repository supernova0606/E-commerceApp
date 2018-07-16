import React, { Component } from 'react';
import {render} from 'react-dom';

import {applyMiddleware, createStore} from 'redux';

import reducers from './reducers/index';
import {Provider} from 'react-redux';

//actions 
import {addToCart} from './actions/cartActions';   
import {postItem, deleteItem, updateItem, getItems} from './actions/itemActions'; 

import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

import ItemList from './components/pages/itemList';
import Menu from './components/menu';
import Footer from './components/footer';

//we use the Redux logger printout of the previous and current state
const middleware = applyMiddleware(thunk, logger);
let store = createStore(reducers, middleware);

//Old way of visually tracking the state 
// store.subscribe(() => {
//   console.log('Here is the state', store.getState())
// })

//testing the various api methods on the front end 
// store.dispatch(postItem(
//   [{
//     name: 'Test Item 1',
//     description: 'An item',
//     price: 50, 
//     images: 'No Images'
//   },
//   {
//     name: 'Test Item 2',
//     description: 'Yet Another Item',
//     price: 5000, 
//     images: 'No Images'
//   }]
// ))

// store.dispatch(deleteItem(
//   {name: 'Test Item 2'}
// ))

// store.dispatch(updateItem(
//   [{
//     name: 'Test Item 1'
//   }, {
//     name: 'Brand New Item',
//     description: 'A new description',
//     price: 100,
//     images: 'No Images'
//   }]
// ))

// store.dispatch(postItem(
//   [{
//     name: 'A Cool Item',
//     description: 'An really cool itemn',
//     price: 50, 
//     images: 'No Images'
//   },
//   {
//     name: 'Another Cool Item',
//     description: 'See title',
//     price: 5000, 
//     images: 'dunno man'
//   }]
// ))

// store.dispatch(addToCart(
//     [{
//       name: 'Test Item'
//     }]
// ))
// store.dispatch(getItems)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store = {store}>
          <div>
          <Menu />
          <br />
          <br />
          <br />
          <ItemList />
          <Footer />
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;