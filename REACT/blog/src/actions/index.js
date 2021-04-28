import jsonPlaceholder from '../apis/jsonPlaceholder';

// new method for fetchPostsAnUsers

export const fetchPostsAndUsers = ()=> async dispatch => {
    
    //we need to call fetchPosts && fetchUsers
    console.log('about to fetch posts!');
    
    // need to wait for api request to complete
    await dispatch(fetchPosts()); 
    
    //dispatchs the inner function goes to redux thunk invokes
    console.log('fetched posts!');
    
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
