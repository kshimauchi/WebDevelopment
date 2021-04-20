//steps 4 -5 wiring jsonplaceholder api
//
import jsonplaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = async ()=>{
    //Bad Approach breaking rules of redux, 
    //action creator (actions must be plain objects, middleware for async actions)
    const response = await jsonplaceholder.get('/posts');
    
    return{
        type: 'FETCH_POSTS',
        payload : response
    };
};