import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions';

class PostList extends React.Component {
    
    
    componentDidCatch(){
        this.props.fetchPosts();
    }
    render(){
        return (
            <div>PostList</div>
        );
    };
};
export default connect(null, 
    //sugar fetchPosts
    {fetchPosts: fetchPosts}
    )(PostList);
/*  FLOW General data loading with Redux
(1) Component gets rendered onto the screen
(2) Components componentDidMount lifecycle method gets called 
(3) We call action creator from componentDidMount
[1-3] --Components are generally responsible for fetching data
(4) Action creator runs code to make an API REQUEST
(5) API responds with data
(6) Action creator returns and action object with the fetched data on the 'payload' property
[4-6] --Action Creators are responsible for making API requests / This is where Redux-Thunk comes in
(7) some reducer see the action, returns the data off the 'payload'
(8) Because we generate some new state object, react/react-redux cause our React app to rerendered
[7-8] --We get fetched data into a component by generating a new state
*/