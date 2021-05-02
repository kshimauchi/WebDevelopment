import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import  {Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

import reducers from './reducers';
// dev tools, need to add the middleware
// can use debug_sessions by using the
// \?debug_sessions=random string character
// we can use debug sessions to create different check points
// redux form: https://redux-form.com/8.3.0/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware()));

ReactDOM.render(
    <Provider store={store}>
        <App /> 
    </Provider>,
    document.querySelector('#root'));

