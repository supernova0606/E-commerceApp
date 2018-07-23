import React, { Component } from 'react';
import {render} from 'react-dom';

import {applyMiddleware, createStore} from 'redux';

import reducers from './reducers/index';
import {Provider} from 'react-redux';

//actions 
import {addToCart} from './actions/cartActions';   
import {postItem, deleteItem, updateItem, getItems} from './actions/itemActions'; 

import {BrowserRouter, Route, Switch} from'react-router-dom';

import logger from 'redux-logger';
import thunk from 'redux-thunk'; 

import ItemList from './components/pages/itemList';
import Menu from './components/menu';
import Footer from './components/footer';
import itemsForm from './components/pages/itemsForm';

import routes from './routes';

const middleware = applyMiddleware(thunk, logger);
let store = createStore(reducers, middleware);

//Old way of visually tracking the state 
// store.subscribe(() => {
//   console.log('Here is the state', store.getState())
// })

const Routes = (
  <Provider store={store}>
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  </Provider>
)

class App extends Component {
  render() {
    return(
      Routes
    );
  }
}

export default App;