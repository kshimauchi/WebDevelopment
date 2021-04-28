import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//We are going to memoize, an action creator
export const fetchPosts = ()=> async dispatch => {
    
    const response = await jsonPlaceholder.get('/posts');
   
        dispatch({type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
    const _fetchUser = _.memoize(async (id, dispatch)=> {
        const response = await jsonPlaceholder.get(`/users/${id}`);
        dispatch({type: 'FETCH_USER', payload: response.data});
});
/*
Refactoring : from previous but much harder to understand and follow
*/