import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = ()=> async (dispatch, getState) => {

    await dispatch(fetchPosts()); 
                                                // Lodash :
    _.chain(getState().posts)                   // chain allows to chain on additional function on a collection of data
        .map('userId')                          // gives us the map(arg1) whatever object we are chaining over, we want userId
        .uniq()                                 // this result, we can chain onto, unique since we want unique userIds,
        .forEach(id=> dispatch(fetchUser(id)))  // we call the function for every uniq Id
        .value();                               // we simply call value(), so we can execute
};

export const fetchPosts = ()=> async dispatch => {
    
    const response = await jsonPlaceholder.get('/posts');
   
        dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = id => async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type : 'FETCH_USER', payload: response.data });
};

