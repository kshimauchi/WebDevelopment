import React from 'react';
import ReactDom from 'react-dom';
import { createStore} from 'redux';
import { Provider } from 'react-redux'
import { allReducers } from './reducers/index';
import App from './App';

const mStore = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDom.render(
<Provider store={mStore}>
<App /> 
</Provider>,
document.getElementById('root'));
