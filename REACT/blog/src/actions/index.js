import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//We are going to memoize, an action creator
export const fetchPosts = ()=> async dispatch => {
    
    const response = await jsonPlaceholder.get('/posts');
   
        dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = id => dispatch => {
   _fetchUser(id, dispatch);
};

//do not play with this
const _fetchUser = _.memoize(async (id, dispatch)=> {
    const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({type: 'FETCH_USER', payload: response.data});
});

/*
From previous, which doesn't work 
if we memoize the outer function this will still return
a ton of requests, this expected behavior every time we call the
function of inner function the first time redux thunk will continue to 
call the function with dispatch, and the network request

if we memoize the inner fuction this will also result in the 
same problem, why? redux thunk will call it one time but this is not the
case the same number of requests.

Everytime we use the fetchUser we create a new version of the 
inner function so, the action creator will continue to invoke

So the real way, to handle this case is we need to declared above
*/