import streams from '../apis/streams';

import {
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

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
//(3) Early drafts of action creators 
//(4) We want to change the userId by using some nice library maybe
export const createStream = formValues =>  async (dispatch, getState)=>{
    const{ userId } = getState().auth;
    const response = await streams.post('/streams', {...formValues,userId });
    dispatch({type: CREATE_STREAM, payload: response.data });
};
//Get a stream or streams we can use get
export const fetchStreams = () => async dispatch =>{
    
    const response = await streams.get('/streams');
    dispatch({type : FETCH_STREAMS, payload: response.data});
};
export const fetchStream = (id) => async dispatch =>{
    
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM, payload: response.data});
};
// edit uses put
export const editStream = (id, formValues)=> async dispatch=>{
    
    const response = await streams.put(`/streams/${id}`, formValues);
    dispatch({type: EDIT_STREAM, payload: response.data});
};
// delete uses a delete 
export const deleteStream = (id) =>  async dispatch=> {
   
    await streams.delete(`/streams/${id}`);
    dispatch({type: DELETE_STREAM, payload: id});
};