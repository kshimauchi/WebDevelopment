import counterReducer from './counter';
import isLoggedReducer from './isLogged';
import {combineReducers} from 'redux';

//All the reducers, counter can be any name you could just do counterReducer using es6 sugar
export const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: isLoggedReducer

});
