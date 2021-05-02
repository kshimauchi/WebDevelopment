import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import  {Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import reducers from './reducers';
// dev tools, need to add the middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.querySelector('#root'));

