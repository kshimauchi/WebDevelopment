import {combineReducers} from 'redux'
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';

// clarifying formReducer
export default combineReducers({
    auth : authReducer,
    form: formReducer
});