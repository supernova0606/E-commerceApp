import {combineReducers} from 'redux'; 

import {itemReducers} from './itemReducers';
import {cartReducers} from './cartReducers';

export default combineReducers({
    items: itemReducers,
    cart: cartReducers
})