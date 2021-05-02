import {SIGN_IN, SIGN_OUT} from './types';

// ActionCreators
// We need two actions one for sign in, sign out
export const signIn= (userId)=>{
    return {
        type: SIGN_IN,
        payload: userId
    };
};
export const signOut=()=>{
    return {
        type: SIGN_OUT
    };
};