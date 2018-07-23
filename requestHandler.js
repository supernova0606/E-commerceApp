import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import {StaticRouter} from 'react-router-dom';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res) {
    axios.get('http://localhost:3001/items')
      .then(function(response) {

    const store = createStore(reducers, {"items":{"items":response.data}} )
    const initialState =
    JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');

    const context = {};

    console.log("How context looks like? ", context.url);

    const reactComponent = renderToString(
        <Provider store={store}>
        <StaticRouter
        location={req.url}
        context={context}>
        {routes}
        </StaticRouter>
        </Provider>
    );

    if (context.url) {
        // can use the `context.status` that
        // we added in RedirectWithStatus
        redirect(context.status, context.url)
        } else {
            res.status(200).render('index',
            {reactComponent, initialState})
        }
    }).catch(function(err){
        console.log('#Initial Server-side rendering error', err);
    }) 
}

module.exports = handleRender