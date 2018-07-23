import React from 'react';
import {render} from 'react-dom';
import Cart from './components/pages/cart';

import { Route, Switch} from 'react-router-dom';
import Menu from './components/menu';
import Footer from './components/footer';

import ItemsList from './components/pages/itemList';
import ItemsForm from './components/pages/itemsForm';

const Status = function ({ code, children }) {
    return (
        <Route render = {function({staticContext}) {
            if(staticContext)
                staticContext.Status = code 
                return children
        }}/>
    )
}

const NotFound = function() {
    return(
        <Status code = {404}> 
            <div> 
                <h2> Sorry, page not found</h2>
            </div>
        </Status>
    )
}

const routes = (
    <div> 
        <br /> 
        <br />
        <br /> 
        <br />
        <br /> 
        <br />
        <Menu />
        <Switch> 
            <Route exact = {true} path = "/" component = {ItemsList} />
            <Route path = "/admin"component = {ItemsForm} />
            <Route path = "/cart"component = {Cart} />
            <Route component = {NotFound} />
        </Switch>
        <Footer />
    </div>
);

export default routes;

