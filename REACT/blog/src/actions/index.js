import jsonplaceholder from '../apis/jsonPlaceholder';

// Redux Thunk, has many uses but also it changes the rules of actionCreators
// Rules with Redux Thunk
// Action creator can return an action object and must have an action.type
// can also return a function(), which is called automatically 

// check history last version to review changes
export const fetchPosts = ()=> async dispatch => {
    
    const response = await jsonplaceholder.get('/posts');
        //we need to change this for thunk, we don't need to return an action
        //we call dispatch and call action object
        dispatch({type: 'FETCH_POSTS', payload: response})
};

/* Redux- Thunk from source on github
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') 
    *Note:  did you dispatch action if its a function invoke if its a object send to next middleware or reducers
    {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
*/