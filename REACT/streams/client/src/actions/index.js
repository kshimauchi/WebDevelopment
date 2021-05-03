import {SIGN_IN, SIGN_OUT} from './types';
import streams from '../apis/streams';

// ActionCreators
// Edit and delete a stream by user 
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
//(1) just creating a new stream
export const createStream = formValues=>  async dispatch=>{

    streams.post('/streams', formValues);

};