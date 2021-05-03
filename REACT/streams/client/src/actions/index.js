import {SIGN_IN, SIGN_OUT, CREATE_STREAM} from './types';
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

//(1) create stream with new id, and dispatching action...
//(2) we need to follow restful conventions 
export const createStream = formValues =>  async dispatch=>{
    const response = await streams.post('/streams', formValues)
    dispatch({type: CREATE_STREAM, payload: response.data });

};