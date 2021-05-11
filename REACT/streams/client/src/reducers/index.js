import {combineReducers} from 'redux'
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import streamReducer from './streamReducer';

//import the new change from the streamReducer and added to the combineReducers
export default combineReducers({
    auth : authReducer,
    form: formReducer,
    streams: streamReducer
});
