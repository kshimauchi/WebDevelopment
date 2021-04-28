import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// new method for fetchPostsAnUsers
// thunk has a getState attached to its second argument and if we pass in
// getState we can have access to it here
export const fetchPostsAndUsers = ()=> async (dispatch, getState) => {
    //getState exists on thunks second argument
    await dispatch(fetchPosts()); 
   
    const userIds = _.uniq(_.map(getState().posts, 'userId'))
    console.log(userIds);
                        
    userIds.forEach(id=> dispatch(fetchUser(id)));
    
    userIds.map(id => dispatch(fetchUser(id)));
};

//We are going to memoize, an action creator
export const fetchPosts = ()=> async dispatch => {
    
    const response = await jsonPlaceholder.get('/posts');
   
        dispatch({type: 'FETCH_POSTS', payload: response.data});
};
// Original, ton of requests
export const fetchUser = id => async dispatch =>{
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({type : 'FETCH_USER', payload: response.data });
};

// ** ** Memoized version one approach will be workig on a second approach ** **
// import _ from 'lodash';
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
//     const _fetchUser = _.memoize(async (id, dispatch)=> {
//         const response = await jsonPlaceholder.get(`/users/${id}`);
//         dispatch({type: 'FETCH_USER', payload: response.data});
// });
