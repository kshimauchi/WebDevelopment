/* eslint-disable import/no-anonymous-default-export */
import {SIGN_IN, SIGN_OUT} from '../actions/types';

// Stream record and Id who created it
// Stream association since we need the user to have the 
// ability to edit the streams that they create

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state= INTIAL_STATE , action) => {
    
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null};
        default:
            return state;    
    }
};